import { Injectable } from '@nestjs/common';

// 漏斗步骤接口
export interface FunnelStep {
  step: number;
  name: string;
  users: number;
  conversionRate?: string;
}

// 事件数据存储
const EVENTS: any[] = [];

// 页面访问数据
const PAGE_VIEWS: Record<string, number> = {};

// 事件统计
const EVENT_STATS: Record<string, number> = {};

// 用户行为数据
const USER_ACTIONS: Record<string, any[]> = {};

@Injectable()
export class AnalyticsService {
  // 记录事件
  async trackEvent(data: {
    userId?: string;
    eventType: string;
    eventName: string;
    page?: string;
    element?: string;
    data?: any;
    timestamp?: string;
    device?: any;
  }) {
    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId: data.userId || 'anonymous',
      eventType: data.eventType,
      eventName: data.eventName,
      page: data.page || '',
      element: data.element || '',
      data: data.data || {},
      timestamp: data.timestamp || new Date().toISOString(),
      device: data.device || {},
      createTime: new Date().toISOString(),
    };

    EVENTS.unshift(event);

    // 更新统计
    const eventKey = `${data.eventType}_${data.eventName}`;
    EVENT_STATS[eventKey] = (EVENT_STATS[eventKey] || 0) + 1;

    // 用户行为记录
    if (data.userId) {
      if (!USER_ACTIONS[data.userId]) {
        USER_ACTIONS[data.userId] = [];
      }
      USER_ACTIONS[data.userId].unshift(event);
      // 只保留最近1000条
      if (USER_ACTIONS[data.userId].length > 1000) {
        USER_ACTIONS[data.userId] = USER_ACTIONS[data.userId].slice(0, 1000);
      }
    }

    return { code: 200, data: { eventId: event.id }, message: 'success' };
  }

  // 批量记录事件
  async trackEvents(events: any[]) {
    for (const event of events) {
      await this.trackEvent(event);
    }
    return { code: 200, data: { count: events.length }, message: 'success' };
  }

  // 记录页面访问
  async trackPageView(userId: string, page: string, duration?: number) {
    const key = `${userId}_${page}`;
    PAGE_VIEWS[key] = (PAGE_VIEWS[key] || 0) + 1;

    await this.trackEvent({
      userId,
      eventType: 'page_view',
      eventName: page,
      page,
      data: { duration },
    });

    return { code: 200, data: null, message: 'success' };
  }

  // 获取事件列表
  async getEvents(
    eventType?: string,
    userId?: string,
    page: number = 1,
    pageSize: number = 50,
  ) {
    let events = [...EVENTS];

    if (eventType) {
      events = events.filter(e => e.eventType === eventType);
    }
    if (userId) {
      events = events.filter(e => e.userId === userId);
    }

    const start = (page - 1) * pageSize;
    const list = events.slice(start, start + pageSize);

    return {
      code: 200,
      data: {
        list,
        total: events.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 获取事件统计
  async getEventStats(startDate?: string, endDate?: string) {
    const stats = Object.entries(EVENT_STATS).map(([key, count]) => ({
      event: key,
      count,
    }));

    stats.sort((a, b) => b.count - a.count);

    // 按事件类型分组
    const byType = {};
    stats.forEach(s => {
      const type = s.event.split('_')[0];
      byType[type] = (byType[type] || 0) + s.count;
    });

    return {
      code: 200,
      data: {
        total: EVENTS.length,
        stats: stats.slice(0, 20),
        byType,
      },
      message: 'success',
    };
  }

  // 获取页面访问统计
  async getPageViewStats() {
    const pageStats: Record<string, { views: number; uniqueVisitors: Set<string> }> = {};

    EVENTS.filter(e => e.eventType === 'page_view').forEach(e => {
      if (!pageStats[e.page]) {
        pageStats[e.page] = { views: 0, uniqueVisitors: new Set() };
      }
      pageStats[e.page].views++;
      pageStats[e.page].uniqueVisitors.add(e.userId);
    });

    const result = Object.entries(pageStats).map(([page, data]) => ({
      page,
      views: data.views,
      uniqueVisitors: data.uniqueVisitors.size,
    }));

    result.sort((a, b) => b.views - a.views);

    return {
      code: 200,
      data: result.slice(0, 20),
      message: 'success',
    };
  }

  // 获取用户行为轨迹
  async getUserActions(userId: string, limit: number = 50) {
    const actions = USER_ACTIONS[userId] || [];
    
    return {
      code: 200,
      data: actions.slice(0, limit),
      message: 'success',
    };
  }

  // 获取概览统计
  async getOverview() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const todayEvents = EVENTS.filter(e => e.createTime.split('T')[0] === today);
    
    // 活跃用户
    const activeUsers = new Set(todayEvents.map(e => e.userId).filter(id => id !== 'anonymous'));
    
    // 事件类型分布
    const eventTypeDistribution: Record<string, number> = {};
    todayEvents.forEach(e => {
      eventTypeDistribution[e.eventType] = (eventTypeDistribution[e.eventType] || 0) + 1;
    });

    return {
      code: 200,
      data: {
        totalEvents: EVENTS.length,
        todayEvents: todayEvents.length,
        activeUsers: activeUsers.size,
        eventTypeDistribution,
      },
      message: 'success',
    };
  }

  // 漏斗分析
  async getFunnelAnalysis(steps: string[]) {
    const funnel: FunnelStep[] = steps.map((step, index) => {
      const stepEvents = EVENTS.filter(e => 
        e.eventType === 'page_view' && e.page === step
      );
      const uniqueUsers = new Set(stepEvents.map(e => e.userId));
      
      return {
        step: index + 1,
        name: step,
        users: uniqueUsers.size,
      };
    });

    // 计算转化率
    for (let i = 1; i < funnel.length; i++) {
      const prevUsers = funnel[i - 1].users;
      const currUsers = funnel[i].users;
      funnel[i].conversionRate = prevUsers > 0 
        ? ((currUsers / prevUsers) * 100).toFixed(2) + '%'
        : '0%';
    }

    return {
      code: 200,
      data: funnel,
      message: 'success',
    };
  }
}
