import { Injectable } from '@nestjs/common';

// 优惠券数据
const COUPONS: Record<string, any> = {
  newuser: {
    id: 'newuser',
    name: '新人专享券',
    type: 'discount', // discount: 满减, percent: 折扣
    value: 50,
    minAmount: 100,
    startTime: '2024-01-01',
    endTime: '2025-12-31',
    description: '新用户首单立减50元',
    scope: 'all', // all: 全场, category: 分类, product: 指定商品
    limit: 1,
    received: 0,
    used: 0,
    status: 'active',
  },
  sale50: {
    id: 'sale50',
    name: '满300减50',
    type: 'discount',
    value: 50,
    minAmount: 300,
    startTime: '2024-01-01',
    endTime: '2025-12-31',
    description: '全场满300减50',
    scope: 'all',
    limit: 1000,
    received: 0,
    used: 0,
    status: 'active',
  },
  sale100: {
    id: 'sale100',
    name: '满500减100',
    type: 'discount',
    value: 100,
    minAmount: 500,
    startTime: '2024-01-01',
    endTime: '2025-12-31',
    description: '全场满500减100',
    scope: 'all',
    limit: 500,
    received: 0,
    used: 0,
    status: 'active',
  },
  percent90: {
    id: 'percent90',
    name: '9折优惠券',
    type: 'percent',
    value: 90, // 90%
    minAmount: 200,
    startTime: '2024-01-01',
    endTime: '2025-12-31',
    description: '全场满200享9折',
    scope: 'all',
    limit: 200,
    received: 0,
    used: 0,
    status: 'active',
  },
};

// 用户优惠券
const USER_COUPONS: Record<string, any[]> = {};

@Injectable()
export class CouponService {
  // 获取可领取的优惠券
  async getAvailableCoupons(userId: string) {
    const userCoupons = USER_COUPONS[userId] || [];
    const receivedIds = userCoupons.map(uc => uc.couponId);
    
    const availableCoupons = Object.values(COUPONS).filter((c: any) => {
      return c.status === 'active' && 
             c.received < c.limit &&
             !receivedIds.includes(c.id);
    });

    return {
      code: 200,
      data: availableCoupons,
      message: 'success',
    };
  }

  // 领取优惠券
  async receiveCoupon(userId: string, couponId: string) {
    const coupon = COUPONS[couponId];
    if (!coupon) {
      return { code: 404, data: null, message: '优惠券不存在' };
    }

    if (coupon.received >= coupon.limit) {
      return { code: 400, data: null, message: '优惠券已领完' };
    }

    if (!USER_COUPONS[userId]) {
      USER_COUPONS[userId] = [];
    }

    // 检查是否已领取
    const received = USER_COUPONS[userId].find(uc => uc.couponId === couponId);
    if (received) {
      return { code: 400, data: null, message: '已领取过该优惠券' };
    }

    // 领取
    const userCoupon = {
      id: `uc_${Date.now()}`,
      couponId,
      name: coupon.name,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      startTime: coupon.startTime,
      endTime: coupon.endTime,
      status: 'unused', // unused, used, expired
      receiveTime: new Date().toISOString(),
      useTime: null,
    };

    USER_COUPONS[userId].push(userCoupon);
    coupon.received++;

    return {
      code: 200,
      data: userCoupon,
      message: '领取成功',
    };
  }

  // 获取用户优惠券
  async getUserCoupons(userId: string, status?: string) {
    let coupons = USER_COUPONS[userId] || [];
    
    // 更新过期状态
    const now = new Date().toISOString().split('T')[0];
    coupons.forEach(c => {
      if (c.status === 'unused' && c.endTime < now) {
        c.status = 'expired';
      }
    });

    if (status) {
      coupons = coupons.filter(c => c.status === status);
    }

    return {
      code: 200,
      data: coupons,
      message: 'success',
    };
  }

  // 使用优惠券
  async useCoupon(userId: string, userCouponId: string, orderAmount: number) {
    const userCoupons = USER_COUPONS[userId];
    if (!userCoupons) {
      return { code: 404, data: null, message: '用户暂无优惠券' };
    }

    const userCoupon = userCoupons.find(uc => uc.id === userCouponId);
    if (!userCoupon) {
      return { code: 404, data: null, message: '优惠券不存在' };
    }

    if (userCoupon.status !== 'unused') {
      return { code: 400, data: null, message: '优惠券不可用' };
    }

    if (orderAmount < userCoupon.minAmount) {
      return { code: 400, data: null, message: `订单金额需满${userCoupon.minAmount}元` };
    }

    // 计算优惠金额
    let discountAmount = 0;
    if (userCoupon.type === 'discount') {
      discountAmount = userCoupon.value;
    } else if (userCoupon.type === 'percent') {
      discountAmount = orderAmount * (100 - userCoupon.value) / 100;
    }

    return {
      code: 200,
      data: {
        userCoupon,
        discountAmount,
        finalAmount: orderAmount - discountAmount,
      },
      message: 'success',
    };
  }

  // 核销优惠券
  async confirmUseCoupon(userId: string, userCouponId: string) {
    const userCoupons = USER_COUPONS[userId];
    if (!userCoupons) {
      return { code: 404, data: null, message: '用户暂无优惠券' };
    }

    const userCoupon = userCoupons.find(uc => uc.id === userCouponId);
    if (!userCoupon) {
      return { code: 404, data: null, message: '优惠券不存在' };
    }

    userCoupon.status = 'used';
    userCoupon.useTime = new Date().toISOString();
    
    const coupon = COUPONS[userCoupon.couponId];
    if (coupon) {
      coupon.used++;
    }

    return { code: 200, data: null, message: '核销成功' };
  }

  // 获取可用优惠券（结算页用）
  async getUsableCoupons(userId: string, orderAmount: number) {
    let coupons = USER_COUPONS[userId] || [];
    
    const now = new Date().toISOString().split('T')[0];
    const usableCoupons = coupons.filter(c => {
      return c.status === 'unused' && 
             c.startTime <= now && 
             c.endTime >= now &&
             orderAmount >= c.minAmount;
    });

    // 计算每个优惠券的优惠金额
    const result = usableCoupons.map(c => {
      let discountAmount = 0;
      if (c.type === 'discount') {
        discountAmount = c.value;
      } else if (c.type === 'percent') {
        discountAmount = orderAmount * (100 - c.value) / 100;
      }
      return { ...c, discountAmount };
    });

    // 按优惠金额排序
    result.sort((a, b) => b.discountAmount - a.discountAmount);

    return {
      code: 200,
      data: result,
      message: 'success',
    };
  }

  // 管理后台：获取所有优惠券
  async getAllCoupons() {
    return {
      code: 200,
      data: Object.values(COUPONS),
      message: 'success',
    };
  }

  // 管理后台：创建优惠券
  async createCoupon(coupon: any) {
    const id = `coupon_${Date.now()}`;
    COUPONS[id] = {
      ...coupon,
      id,
      received: 0,
      used: 0,
      status: 'active',
    };
    return { code: 200, data: COUPONS[id], message: '创建成功' };
  }

  // 统计
  async getCouponStats() {
    const coupons = Object.values(COUPONS);
    return {
      code: 200,
      data: {
        total: coupons.length,
        active: coupons.filter((c: any) => c.status === 'active').length,
        totalReceived: coupons.reduce((sum: number, c: any) => sum + c.received, 0),
        totalUsed: coupons.reduce((sum: number, c: any) => sum + c.used, 0),
      },
      message: 'success',
    };
  }
}
