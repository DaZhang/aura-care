import { Controller, Get, Post, Body, Query, Headers } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 记录事件
  @Post('track')
  async trackEvent(@Body() data: any, @Headers('x-user-id') userId?: string) {
    console.log('[AnalyticsController] trackEvent - eventType:', data.eventType, 'eventName:', data.eventName);
    if (userId && !data.userId) {
      data.userId = userId;
    }
    return this.analyticsService.trackEvent(data);
  }

  // 批量记录事件
  @Post('track-batch')
  async trackEvents(@Body('events') events: any[]) {
    console.log('[AnalyticsController] trackEvents - count:', events.length);
    return this.analyticsService.trackEvents(events);
  }

  // 记录页面访问
  @Post('page-view')
  async trackPageView(
    @Headers('x-user-id') userId: string,
    @Body() body: { page: string; duration?: number },
  ) {
    console.log('[AnalyticsController] trackPageView - userId:', userId, 'page:', body.page);
    return this.analyticsService.trackPageView(userId, body.page, body.duration);
  }

  // 获取事件列表
  @Get('events')
  async getEvents(
    @Query('eventType') eventType?: string,
    @Query('userId') userId?: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '50',
  ) {
    return this.analyticsService.getEvents(eventType, userId, Number(page), Number(pageSize));
  }

  // 获取事件统计
  @Get('stats')
  async getEventStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getEventStats(startDate, endDate);
  }

  // 获取页面访问统计
  @Get('page-views')
  async getPageViewStats() {
    return this.analyticsService.getPageViewStats();
  }

  // 获取用户行为轨迹
  @Get('user-actions/:userId')
  async getUserActions(
    @Query('userId') userId: string,
    @Query('limit') limit: string = '50',
  ) {
    return this.analyticsService.getUserActions(userId, Number(limit));
  }

  // 获取概览统计
  @Get('overview')
  async getOverview() {
    return this.analyticsService.getOverview();
  }

  // 漏斗分析
  @Post('funnel')
  async getFunnelAnalysis(@Body('steps') steps: string[]) {
    console.log('[AnalyticsController] getFunnelAnalysis - steps:', steps);
    return this.analyticsService.getFunnelAnalysis(steps);
  }
}
