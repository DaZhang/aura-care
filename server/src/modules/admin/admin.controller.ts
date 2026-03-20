import { Controller, Get, Post, Body, Param, Query, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // 管理员登录
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('[AdminController] login - username:', body.username);
    return this.adminService.login(body.username, body.password);
  }

  // 获取仪表盘数据
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboard();
  }

  // 商品管理：获取列表
  @Get('products')
  async getProducts(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('status') status?: string,
  ) {
    return this.adminService.getProducts(Number(page), Number(pageSize), status);
  }

  // 商品管理：更新商品
  @Post('products/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() data: any,
  ) {
    console.log('[AdminController] updateProduct - productId:', productId);
    return this.adminService.updateProduct(productId, data);
  }

  // 商品管理：上下架
  @Post('products/:productId/toggle-status')
  async toggleProductStatus(
    @Param('productId') productId: string,
    @Body('status') status: 'active' | 'inactive',
  ) {
    console.log('[AdminController] toggleProductStatus - productId:', productId);
    return this.adminService.toggleProductStatus(productId, status);
  }

  // 订单管理：获取列表
  @Get('orders')
  async getOrders(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('status') status?: string,
  ) {
    return this.adminService.getOrders(Number(page), Number(pageSize), status);
  }

  // 订单管理：发货
  @Post('orders/:orderId/ship')
  async shipOrder(
    @Param('orderId') orderId: string,
    @Body() logisticsInfo: any,
  ) {
    console.log('[AdminController] shipOrder - orderId:', orderId);
    return this.adminService.shipOrder(orderId, logisticsInfo);
  }

  // 订单管理：退款
  @Post('orders/:orderId/refund')
  async refundOrder(
    @Param('orderId') orderId: string,
    @Body('reason') reason: string,
  ) {
    console.log('[AdminController] refundOrder - orderId:', orderId);
    return this.adminService.refundOrder(orderId, reason);
  }

  // 获取管理员列表
  @Get('admins')
  async getAdmins() {
    return this.adminService.getAdmins();
  }

  // 获取系统配置
  @Get('config')
  async getConfig() {
    return this.adminService.getConfig();
  }

  // 更新系统配置
  @Post('config')
  async updateConfig(@Body() config: any) {
    console.log('[AdminController] updateConfig');
    return this.adminService.updateConfig(config);
  }
}
