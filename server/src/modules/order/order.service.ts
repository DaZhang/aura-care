import { Injectable } from '@nestjs/common';

// 订单状态
const ORDER_STATUS = {
  pending: { label: '待付款', color: '#E54B4B', order: 1 },
  paid: { label: '待发货', color: '#F59E0B', order: 2 },
  shipped: { label: '已发货', color: '#8B5CF6', order: 3 },
  completed: { label: '已完成', color: '#10B981', order: 4 },
  cancelled: { label: '已取消', color: '#6B7280', order: 5 },
  refunded: { label: '已退款', color: '#EF4444', order: 6 },
};

// 订单存储
const ORDERS: any[] = [];

// 订单号生成
let orderCounter = 1000;

@Injectable()
export class OrderService {
  // 创建订单
  async createOrder(orderData: any) {
    const orderId = `ORD${Date.now()}${++orderCounter}`;
    
    const order = {
      id: orderId,
      userId: orderData.userId || 'guest',
      
      // 商品信息
      products: orderData.products || [],
      
      // 定制信息
      customization: orderData.customization || null,
      
      // 价格信息
      priceInfo: {
        productAmount: orderData.productAmount || 0,
        shippingFee: orderData.shippingFee || 0,
        discountAmount: orderData.discountAmount || 0,
        couponId: orderData.couponId || null,
        couponName: orderData.couponName || null,
        pointsUsed: orderData.pointsUsed || 0,
        pointsDiscount: orderData.pointsDiscount || 0,
        totalAmount: orderData.totalAmount || 0,
      },
      
      // 收货信息
      address: orderData.address || null,
      
      // 配送信息
      delivery: {
        type: orderData.deliveryType || 'express', // express: 快递, pickup: 自提
        storeId: orderData.storeId || null,
      },
      
      // 状态信息
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          time: new Date().toISOString(),
          remark: '订单创建',
        },
      ],
      
      // 支付信息
      payment: {
        method: null,
        transactionId: null,
        paidAt: null,
      },
      
      // 物流信息
      logistics: null,
      
      // 备注
      remark: orderData.remark || '',
      
      // 时间
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分钟后过期
    };

    ORDERS.unshift(order);

    return {
      code: 200,
      data: {
        orderId: order.id,
        status: order.status,
        totalAmount: order.priceInfo.totalAmount,
        expireTime: order.expireTime,
      },
      message: '订单创建成功',
    };
  }

  // 获取订单列表
  async getOrderList(userId: string, status?: string, page: number = 1, pageSize: number = 10) {
    let orders = ORDERS.filter(o => o.userId === userId);
    
    if (status && status !== 'all') {
      orders = orders.filter(o => o.status === status);
    }

    // 按时间排序
    orders.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());

    const start = (page - 1) * pageSize;
    const list = orders.slice(start, start + pageSize);

    return {
      code: 200,
      data: {
        list,
        total: orders.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 获取订单详情
  async getOrderDetail(orderId: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    return {
      code: 200,
      data: order,
      message: 'success',
    };
  }

  // 更新订单状态
  async updateOrderStatus(orderId: string, status: string, remark?: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    order.status = status;
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status,
      time: new Date().toISOString(),
      remark: remark || '',
    });

    return {
      code: 200,
      data: { orderId, status },
      message: '订单状态更新成功',
    };
  }

  // 支付订单（微信支付模拟）
  async payOrder(orderId: string, payMethod: string = 'wechat') {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (order.status !== 'pending') {
      return { code: 400, data: null, message: '订单状态不允许支付' };
    }

    // 模拟微信支付
    const paymentResult = {
      transactionId: `WX${Date.now()}`,
      prepayId: `wx_prepay_${orderId}`,
      codeUrl: `weixin://wxpay/bizpayurl?pr=${orderId}`,
    };

    // 模拟支付成功
    order.status = 'paid';
    order.payment = {
      method: payMethod,
      transactionId: paymentResult.transactionId,
      paidAt: new Date().toISOString(),
    };
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status: 'paid',
      time: new Date().toISOString(),
      remark: '支付成功',
    });

    return {
      code: 200,
      data: {
        orderId,
        status: 'paid',
        transactionId: paymentResult.transactionId,
        paidAt: order.payment.paidAt,
      },
      message: '支付成功',
    };
  }

  // 取消订单
  async cancelOrder(orderId: string, reason: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (!['pending', 'paid'].includes(order.status)) {
      return { code: 400, data: null, message: '订单状态不允许取消' };
    }

    order.status = 'cancelled';
    order.cancelReason = reason;
    order.cancelTime = new Date().toISOString();
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status: 'cancelled',
      time: new Date().toISOString(),
      remark: reason,
    });

    return { code: 200, data: null, message: '订单已取消' };
  }

  // 申请退款
  async refundOrder(orderId: string, reason: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (!['paid', 'shipped'].includes(order.status)) {
      return { code: 400, data: null, message: '订单状态不允许退款' };
    }

    order.status = 'refunded';
    order.refundReason = reason;
    order.refundTime = new Date().toISOString();
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status: 'refunded',
      time: new Date().toISOString(),
      remark: reason,
    });

    return { code: 200, data: null, message: '退款申请已提交' };
  }

  // 确认收货
  async confirmReceive(orderId: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (order.status !== 'shipped') {
      return { code: 400, data: null, message: '订单状态不允许确认收货' };
    }

    order.status = 'completed';
    order.completeTime = new Date().toISOString();
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status: 'completed',
      time: new Date().toISOString(),
      remark: '用户确认收货',
    });

    return { code: 200, data: null, message: '确认收货成功' };
  }

  // 发货
  async shipOrder(orderId: string, logisticsInfo: any) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (order.status !== 'paid') {
      return { code: 400, data: null, message: '订单状态不允许发货' };
    }

    order.status = 'shipped';
    order.logistics = {
      companyCode: logisticsInfo.companyCode,
      companyName: logisticsInfo.companyName,
      trackingNo: logisticsInfo.trackingNo,
      shipTime: new Date().toISOString(),
    };
    order.updateTime = new Date().toISOString();
    order.statusHistory.push({
      status: 'shipped',
      time: new Date().toISOString(),
      remark: `已发货，快递单号：${logisticsInfo.trackingNo}`,
    });

    return { code: 200, data: order.logistics, message: '发货成功' };
  }

  // 获取订单状态定义
  async getOrderStatusList() {
    return {
      code: 200,
      data: ORDER_STATUS,
      message: 'success',
    };
  }

  // 订单统计
  async getOrderStats(userId?: string) {
    let orders = ORDERS;
    if (userId) {
      orders = orders.filter(o => o.userId === userId);
    }

    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      paid: orders.filter(o => o.status === 'paid').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    return {
      code: 200,
      data: stats,
      message: 'success',
    };
  }
}
