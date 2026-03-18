import { Injectable } from '@nestjs/common';

// 订单状态
const ORDER_STATUS = {
  pending: { label: '待付款', color: '#E54B4B' },
  paid: { label: '已付款', color: '#F59E0B' },
  shipped: { label: '已发货', color: '#8B5CF6' },
  completed: { label: '已完成', color: '#10B981' },
};

// 模拟订单存储
const orders: Map<string, any> = new Map();

// 模拟用户订单
const mockUserOrders = [
  {
    id: 'ORD001',
    userId: 'user001',
    product: {
      id: 'peaceful',
      name: '平和养生手串',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=200&h=200&fit=crop',
      material: '紫檀木',
      engraving: '平安喜乐',
    },
    customization: {
      coreSpice: 'tanxiang',
      auxiliarySpice: 'xunyicao',
      coreRatio: 70,
      material: 'zitan',
      length: 'medium',
      engraving: '平安喜乐',
    },
    status: 'shipped',
    price: 298,
    quantity: 1,
    totalPrice: 298,
    createdAt: '2024-01-15 14:30',
    trackNo: 'SF1234567890',
  },
  {
    id: 'ORD002',
    userId: 'user001',
    product: {
      id: 'qixu',
      name: '补气安神手串',
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=200&fit=crop',
      material: '黄花梨',
      engraving: '',
    },
    customization: {
      coreSpice: 'huangqi',
      auxiliarySpice: 'meigui',
      coreRatio: 80,
      material: 'huanghuali',
      length: 'large',
      engraving: '',
    },
    status: 'completed',
    price: 458,
    quantity: 1,
    totalPrice: 458,
    createdAt: '2024-01-10 09:20',
    trackNo: 'YT9876543210',
  },
];

// 初始化模拟数据
mockUserOrders.forEach(order => {
  orders.set(order.id, order);
});

@Injectable()
export class OrderService {
  createOrder(orderData: any) {
    const orderId = `ORD${Date.now()}`;
    const order = {
      id: orderId,
      userId: orderData.userId || 'user001',
      product: orderData.product,
      customization: orderData.customization,
      status: 'pending',
      price: orderData.price,
      quantity: orderData.quantity || 1,
      totalPrice: orderData.totalPrice,
      createdAt: new Date().toISOString(),
      trackNo: '',
    };
    
    orders.set(orderId, order);
    
    return {
      code: 200,
      data: {
        orderId,
        status: 'pending',
        totalPrice: order.totalPrice,
      },
      message: '订单创建成功',
    };
  }

  getOrderList(userId: string, status?: string) {
    let userOrders = Array.from(orders.values()).filter(
      (order: any) => order.userId === userId
    );
    
    if (status && status !== 'all') {
      userOrders = userOrders.filter((order: any) => order.status === status);
    }
    
    return {
      code: 200,
      data: userOrders,
      message: 'success',
    };
  }

  getOrderDetail(id: string) {
    const order = orders.get(id);
    if (!order) {
      return {
        code: 404,
        data: null,
        message: '订单不存在',
      };
    }
    return {
      code: 200,
      data: order,
      message: 'success',
    };
  }

  updateOrderStatus(orderId: string, status: string) {
    const order = orders.get(orderId);
    if (!order) {
      return {
        code: 404,
        data: null,
        message: '订单不存在',
      };
    }
    
    order.status = status;
    orders.set(orderId, order);
    
    return {
      code: 200,
      data: { orderId, status },
      message: '订单状态更新成功',
    };
  }
}
