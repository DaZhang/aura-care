import { Injectable } from '@nestjs/common';

// 管理员数据
const ADMINS = [
  { id: 'admin1', username: 'admin', password: 'admin123', role: 'super_admin', name: '超级管理员' },
  { id: 'admin2', username: 'operator', password: 'operator123', role: 'operator', name: '运营人员' },
];

// 商品数据（从product模块复制，实际应共享）
const PRODUCTS: Record<string, any> = {
  peaceful: { id: 'peaceful', name: '平和养生手串', price: 298, stock: 100, status: 'active', sales: 1280 },
  qixu: { id: 'qixu', name: '补气安神手串', price: 358, stock: 50, status: 'active', sales: 856 },
  yangxu: { id: 'yangxu', name: '温阳暖身手串', price: 328, stock: 80, status: 'active', sales: 723 },
  yinxu: { id: 'yinxu', name: '滋阴润燥手串', price: 368, stock: 60, status: 'active', sales: 654 },
};

// 订单数据
const ORDERS: any[] = [];

@Injectable()
export class AdminService {
  // 管理员登录
  async login(username: string, password: string) {
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    
    if (!admin) {
      return { code: 401, data: null, message: '用户名或密码错误' };
    }

    const token = `admin_token_${admin.id}_${Date.now()}`;
    
    return {
      code: 200,
      data: {
        token,
        adminInfo: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
          name: admin.name,
        },
      },
      message: '登录成功',
    };
  }

  // 获取仪表盘数据
  async getDashboard() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return {
      code: 200,
      data: {
        // 今日数据
        todayOrders: Math.floor(Math.random() * 100) + 50,
        todaySales: Math.floor(Math.random() * 10000) + 5000,
        todayUsers: Math.floor(Math.random() * 500) + 100,
        todayPageViews: Math.floor(Math.random() * 5000) + 1000,
        
        // 订单状态分布
        orderStatus: {
          pending: 12,
          paid: 45,
          shipped: 23,
          completed: 156,
          cancelled: 5,
        },
        
        // 商品销售排行
        topProducts: Object.values(PRODUCTS)
          .sort((a: any, b: any) => b.sales - a.sales)
          .slice(0, 5)
          .map((p: any) => ({ name: p.name, sales: p.sales })),
        
        // 近7天销售趋势
        salesTrend: Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            sales: Math.floor(Math.random() * 5000) + 2000,
            orders: Math.floor(Math.random() * 100) + 20,
          };
        }),
      },
      message: 'success',
    };
  }

  // 商品管理：获取列表
  async getProducts(page: number = 1, pageSize: number = 10, status?: string) {
    let products = Object.values(PRODUCTS);
    
    if (status) {
      products = products.filter((p: any) => p.status === status);
    }

    const start = (page - 1) * pageSize;
    const list = products.slice(start, start + pageSize);

    return {
      code: 200,
      data: {
        list,
        total: products.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 商品管理：更新商品
  async updateProduct(productId: string, data: any) {
    if (!PRODUCTS[productId]) {
      return { code: 404, data: null, message: '商品不存在' };
    }

    Object.assign(PRODUCTS[productId], data, { updateTime: new Date().toISOString() });
    
    return { code: 200, data: PRODUCTS[productId], message: '更新成功' };
  }

  // 商品管理：上下架
  async toggleProductStatus(productId: string, status: 'active' | 'inactive') {
    if (!PRODUCTS[productId]) {
      return { code: 404, data: null, message: '商品不存在' };
    }

    PRODUCTS[productId].status = status;
    
    return { code: 200, data: null, message: status === 'active' ? '上架成功' : '下架成功' };
  }

  // 订单管理：获取列表
  async getOrders(page: number = 1, pageSize: number = 10, status?: string) {
    let orders = [...ORDERS];
    
    if (status) {
      orders = orders.filter(o => o.status === status);
    }

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

  // 订单管理：发货
  async shipOrder(orderId: string, logisticsInfo: any) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    if (order.status !== 'paid') {
      return { code: 400, data: null, message: '订单状态不允许发货' };
    }

    order.status = 'shipped';
    order.logistics = logisticsInfo;
    order.shipTime = new Date().toISOString();

    return { code: 200, data: order, message: '发货成功' };
  }

  // 订单管理：退款
  async refundOrder(orderId: string, reason: string) {
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      return { code: 404, data: null, message: '订单不存在' };
    }

    order.status = 'refunded';
    order.refundReason = reason;
    order.refundTime = new Date().toISOString();

    return { code: 200, data: order, message: '退款成功' };
  }

  // 获取管理员列表
  async getAdmins() {
    return {
      code: 200,
      data: ADMINS.map(a => ({
        id: a.id,
        username: a.username,
        role: a.role,
        name: a.name,
      })),
      message: 'success',
    };
  }

  // 系统配置
  async getConfig() {
    return {
      code: 200,
      data: {
        siteName: '东方养生·华烨尚医',
        siteDescription: '基于中医九种体质辨证的个性化养生手串电商',
        customerServicePhone: '400-123-4567',
        customerServiceTime: '09:00-18:00',
        freeShippingAmount: 200,
        pointsRatio: 1, // 1元=1积分
        inviteReward: 50, // 邀请奖励积分
      },
      message: 'success',
    };
  }

  // 更新系统配置
  async updateConfig(config: any) {
    console.log('[AdminService] updateConfig:', config);
    return { code: 200, data: config, message: '更新成功' };
  }
}
