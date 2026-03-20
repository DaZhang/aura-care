import { Injectable } from '@nestjs/common';

// 消息类型
const MESSAGE_TYPES = {
  ORDER: { id: 'order', name: '订单消息', icon: '📦' },
  SYSTEM: { id: 'system', name: '系统通知', icon: '🔔' },
  PROMOTION: { id: 'promotion', name: '活动优惠', icon: '🎁' },
  SERVICE: { id: 'service', name: '客服消息', icon: '💬' },
};

// 消息模板
const MESSAGE_TEMPLATES = {
  ORDER_PAID: { type: 'order', title: '支付成功', content: '您的订单{orderId}已支付成功，我们将尽快为您发货' },
  ORDER_SHIPPED: { type: 'order', title: '商品已发货', content: '您的订单{orderId}已发货，快递单号：{trackingNo}' },
  ORDER_DELIVERED: { type: 'order', title: '商品已签收', content: '您的订单{orderId}已签收，感谢您的购买' },
  COUPON_RECEIVED: { type: 'promotion', title: '优惠券到账', content: '您已成功领取{couponName}' },
  POINTS_EARNED: { type: 'system', title: '积分到账', content: '恭喜您获得{points}积分' },
  MEMBER_UPGRADE: { type: 'system', title: '会员升级', content: '恭喜您升级为{levelName}' },
};

// 用户消息存储
const USER_MESSAGES: Record<string, any[]> = {};

@Injectable()
export class MessageService {
  // 发送消息
  async sendMessage(userId: string, message: any) {
    if (!USER_MESSAGES[userId]) {
      USER_MESSAGES[userId] = [];
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      userId,
      type: message.type,
      title: message.title,
      content: message.content,
      data: message.data || {},
      read: false,
      createTime: new Date().toISOString(),
    };

    USER_MESSAGES[userId].unshift(newMessage);

    return {
      code: 200,
      data: newMessage,
      message: '发送成功',
    };
  }

  // 发送模板消息
  async sendTemplateMessage(userId: string, templateKey: string, params: Record<string, string>, data?: any) {
    const template = MESSAGE_TEMPLATES[templateKey];
    if (!template) {
      return { code: 404, data: null, message: '模板不存在' };
    }

    let content = template.content;
    Object.entries(params).forEach(([key, value]) => {
      content = content.replace(`{${key}}`, value);
    });

    return this.sendMessage(userId, {
      type: template.type,
      title: template.title,
      content,
      data,
    });
  }

  // 获取用户消息列表
  async getUserMessages(userId: string, type?: string, page: number = 1, pageSize: number = 20) {
    let messages = USER_MESSAGES[userId] || [];
    
    if (type) {
      messages = messages.filter(m => m.type === type);
    }

    const start = (page - 1) * pageSize;
    const list = messages.slice(start, start + pageSize);
    const unreadCount = messages.filter(m => !m.read).length;

    return {
      code: 200,
      data: {
        list,
        total: messages.length,
        unreadCount,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 获取消息详情
  async getMessageDetail(userId: string, messageId: string) {
    const messages = USER_MESSAGES[userId] || [];
    const message = messages.find(m => m.id === messageId);
    
    if (!message) {
      return { code: 404, data: null, message: '消息不存在' };
    }

    // 标记已读
    message.read = true;

    return {
      code: 200,
      data: message,
      message: 'success',
    };
  }

  // 标记消息已读
  async markAsRead(userId: string, messageIds?: string[]) {
    const messages = USER_MESSAGES[userId] || [];
    
    if (messageIds && messageIds.length > 0) {
      messages.forEach(m => {
        if (messageIds.includes(m.id)) {
          m.read = true;
        }
      });
    } else {
      // 全部标记已读
      messages.forEach(m => {
        m.read = true;
      });
    }

    return { code: 200, data: null, message: 'success' };
  }

  // 删除消息
  async deleteMessage(userId: string, messageIds: string[]) {
    if (!USER_MESSAGES[userId]) {
      return { code: 200, data: null, message: 'success' };
    }

    USER_MESSAGES[userId] = USER_MESSAGES[userId].filter(m => !messageIds.includes(m.id));

    return { code: 200, data: null, message: '删除成功' };
  }

  // 获取未读数量
  async getUnreadCount(userId: string) {
    const messages = USER_MESSAGES[userId] || [];
    const count = messages.filter(m => !m.read).length;
    const countByType = {};
    
    Object.keys(MESSAGE_TYPES).forEach(key => {
      const type = MESSAGE_TYPES[key].id;
      countByType[type] = messages.filter(m => !m.read && m.type === type).length;
    });

    return {
      code: 200,
      data: { total: count, byType: countByType },
      message: 'success',
    };
  }

  // 获取消息类型
  async getMessageTypes() {
    return {
      code: 200,
      data: Object.values(MESSAGE_TYPES),
      message: 'success',
    };
  }

  // 清空消息
  async clearMessages(userId: string, type?: string) {
    if (!USER_MESSAGES[userId]) {
      return { code: 200, data: null, message: 'success' };
    }

    if (type) {
      USER_MESSAGES[userId] = USER_MESSAGES[userId].filter(m => m.type !== type);
    } else {
      USER_MESSAGES[userId] = [];
    }

    return { code: 200, data: null, message: '清空成功' };
  }
}
