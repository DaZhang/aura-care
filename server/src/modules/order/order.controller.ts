import { Controller, Get, Post, Body, Param, Query, Headers } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 创建订单
  @Post('create')
  async createOrder(@Body() body: any, @Headers('x-user-id') userId?: string) {
    console.log('[OrderController] createOrder - userId:', userId);
    if (userId) {
      body.userId = userId;
    }
    return this.orderService.createOrder(body);
  }

  // 获取订单列表
  @Get('list')
  async getOrderList(
    @Headers('x-user-id') userId: string,
    @Query('status') status?: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    console.log('[OrderController] getOrderList - userId:', userId, 'status:', status);
    return this.orderService.getOrderList(userId, status, Number(page), Number(pageSize));
  }

  // 获取订单详情
  @Get('detail/:id')
  async getOrderDetail(@Param('id') id: string) {
    console.log('[OrderController] getOrderDetail - id:', id);
    return this.orderService.getOrderDetail(id);
  }

  // 更新订单状态
  @Post('update-status')
  async updateOrderStatus(@Body() body: { orderId: string; status: string; remark?: string }) {
    console.log('[OrderController] updateOrderStatus - orderId:', body.orderId, 'status:', body.status);
    return this.orderService.updateOrderStatus(body.orderId, body.status, body.remark);
  }

  // 支付订单
  @Post('pay')
  async payOrder(
    @Body() body: { orderId: string; payMethod?: string },
  ) {
    console.log('[OrderController] payOrder - orderId:', body.orderId);
    return this.orderService.payOrder(body.orderId, body.payMethod);
  }

  // 取消订单
  @Post('cancel')
  async cancelOrder(
    @Headers('x-user-id') userId: string,
    @Body() body: { orderId: string; reason: string },
  ) {
    console.log('[OrderController] cancelOrder - orderId:', body.orderId);
    return this.orderService.cancelOrder(body.orderId, body.reason);
  }

  // 申请退款
  @Post('refund')
  async refundOrder(
    @Headers('x-user-id') userId: string,
    @Body() body: { orderId: string; reason: string },
  ) {
    console.log('[OrderController] refundOrder - orderId:', body.orderId);
    return this.orderService.refundOrder(body.orderId, body.reason);
  }

  // 确认收货
  @Post('confirm-receive')
  async confirmReceive(
    @Headers('x-user-id') userId: string,
    @Body('orderId') orderId: string,
  ) {
    console.log('[OrderController] confirmReceive - orderId:', orderId);
    return this.orderService.confirmReceive(orderId);
  }

  // 发货（管理后台）
  @Post('ship')
  async shipOrder(
    @Body() body: { orderId: string; logisticsInfo: any },
  ) {
    console.log('[OrderController] shipOrder - orderId:', body.orderId);
    return this.orderService.shipOrder(body.orderId, body.logisticsInfo);
  }

  // 获取订单状态列表
  @Get('status/list')
  async getOrderStatusList() {
    return this.orderService.getOrderStatusList();
  }

  // 订单统计
  @Get('stats')
  async getOrderStats(@Headers('x-user-id') userId?: string) {
    return this.orderService.getOrderStats(userId);
  }
}
