import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 创建订单
  @Post('create')
  async createOrder(@Body() body: any) {
    console.log('[OrderController] createOrder - body:', JSON.stringify(body));
    return this.orderService.createOrder(body);
  }

  // 获取订单列表
  @Get('list')
  async getOrderList(@Query('userId') userId: string, @Query('status') status?: string) {
    console.log('[OrderController] getOrderList - userId:', userId, 'status:', status);
    return this.orderService.getOrderList(userId, status);
  }

  // 获取订单详情
  @Get('detail/:id')
  async getOrderDetail(@Param('id') id: string) {
    console.log('[OrderController] getOrderDetail - id:', id);
    return this.orderService.getOrderDetail(id);
  }

  // 更新订单状态
  @Post('update-status')
  async updateOrderStatus(@Body() body: { orderId: string; status: string }) {
    console.log('[OrderController] updateOrderStatus - orderId:', body.orderId, 'status:', body.status);
    return this.orderService.updateOrderStatus(body.orderId, body.status);
  }
}
