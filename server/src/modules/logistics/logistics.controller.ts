import { Controller, Get, Post, Body, Param, Query, Headers } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  // 创建物流信息
  @Post('create')
  async createLogistics(
    @Body('orderId') orderId: string,
    @Body() info: any,
  ) {
    console.log('[LogisticsController] createLogistics - orderId:', orderId);
    return this.logisticsService.createLogistics(orderId, info);
  }

  // 获取物流信息
  @Get('order/:orderId')
  async getLogistics(@Param('orderId') orderId: string) {
    console.log('[LogisticsController] getLogistics - orderId:', orderId);
    return this.logisticsService.getLogistics(orderId);
  }

  // 更新物流状态
  @Post('update-status')
  async updateLogisticsStatus(
    @Body() body: { orderId: string; status: string; trace?: any },
  ) {
    console.log('[LogisticsController] updateLogisticsStatus - orderId:', body.orderId);
    return this.logisticsService.updateLogisticsStatus(body.orderId, body.status, body.trace);
  }

  // 模拟物流更新
  @Post('simulate')
  async simulateLogisticsUpdate(@Body('orderId') orderId: string) {
    console.log('[LogisticsController] simulateLogisticsUpdate - orderId:', orderId);
    return this.logisticsService.simulateLogisticsUpdate(orderId);
  }

  // 获取物流公司列表
  @Get('companies')
  async getLogisticsCompanies() {
    return this.logisticsService.getLogisticsCompanies();
  }

  // 识别物流公司
  @Get('recognize')
  async recognizeCompany(@Query('trackingNo') trackingNo: string) {
    console.log('[LogisticsController] recognizeCompany - trackingNo:', trackingNo);
    return this.logisticsService.recognizeCompany(trackingNo);
  }
}
