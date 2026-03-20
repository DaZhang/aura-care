import { Controller, Get, Post, Body, Headers, Param, Query } from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // 获取可领取的优惠券
  @Get('available')
  async getAvailableCoupons(@Headers('x-user-id') userId: string) {
    console.log('[CouponController] getAvailableCoupons - userId:', userId);
    return this.couponService.getAvailableCoupons(userId);
  }

  // 领取优惠券
  @Post('receive')
  async receiveCoupon(
    @Headers('x-user-id') userId: string,
    @Body('couponId') couponId: string,
  ) {
    console.log('[CouponController] receiveCoupon - userId:', userId, 'couponId:', couponId);
    return this.couponService.receiveCoupon(userId, couponId);
  }

  // 获取用户优惠券
  @Get('my')
  async getUserCoupons(
    @Headers('x-user-id') userId: string,
    @Query('status') status?: string,
  ) {
    console.log('[CouponController] getUserCoupons - userId:', userId, 'status:', status);
    return this.couponService.getUserCoupons(userId, status);
  }

  // 获取可用优惠券（结算页）
  @Get('usable')
  async getUsableCoupons(
    @Headers('x-user-id') userId: string,
    @Query('orderAmount') orderAmount: string,
  ) {
    console.log('[CouponController] getUsableCoupons - userId:', userId, 'orderAmount:', orderAmount);
    return this.couponService.getUsableCoupons(userId, Number(orderAmount));
  }

  // 使用优惠券
  @Post('use')
  async useCoupon(
    @Headers('x-user-id') userId: string,
    @Body() body: { userCouponId: string; orderAmount: number },
  ) {
    console.log('[CouponController] useCoupon - userId:', userId);
    return this.couponService.useCoupon(userId, body.userCouponId, body.orderAmount);
  }

  // 核销优惠券
  @Post('confirm')
  async confirmUseCoupon(
    @Headers('x-user-id') userId: string,
    @Body('userCouponId') userCouponId: string,
  ) {
    console.log('[CouponController] confirmUseCoupon - userId:', userId);
    return this.couponService.confirmUseCoupon(userId, userCouponId);
  }

  // 管理后台：获取所有优惠券
  @Get('admin/list')
  async getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  // 管理后台：创建优惠券
  @Post('admin/create')
  async createCoupon(@Body() coupon: any) {
    console.log('[CouponController] createCoupon');
    return this.couponService.createCoupon(coupon);
  }

  // 统计
  @Get('admin/stats')
  async getCouponStats() {
    return this.couponService.getCouponStats();
  }
}
