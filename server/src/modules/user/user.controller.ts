import { Controller, Get, Post, Body, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 微信登录
  @Post('login/wechat')
  async wechatLogin(@Body('code') code: string) {
    console.log('[UserController] wechatLogin - code:', code);
    return this.userService.wechatLogin(code);
  }

  // 获取用户信息
  @Get('info')
  async getUserInfo(@Headers('x-user-id') userId: string) {
    console.log('[UserController] getUserInfo - userId:', userId);
    return this.userService.getUserInfo(userId);
  }

  // 更新用户信息
  @Post('update')
  async updateUserInfo(
    @Headers('x-user-id') userId: string,
    @Body() userInfo: any,
  ) {
    console.log('[UserController] updateUserInfo - userId:', userId);
    return this.userService.updateUserInfo(userId, userInfo);
  }

  // 获取会员等级信息
  @Get('member/level')
  async getMemberLevel(@Headers('x-user-id') userId: string) {
    console.log('[UserController] getMemberLevel - userId:', userId);
    return this.userService.getMemberLevel(userId);
  }

  // 获取积分信息
  @Get('points')
  async getPoints(@Headers('x-user-id') userId: string) {
    console.log('[UserController] getPoints - userId:', userId);
    return this.userService.getPoints(userId);
  }

  // 签到
  @Post('points/signin')
  async signIn(@Headers('x-user-id') userId: string) {
    console.log('[UserController] signIn - userId:', userId);
    return this.userService.signIn(userId);
  }

  // 添加积分
  @Post('points/add')
  async addPoints(
    @Headers('x-user-id') userId: string,
    @Body() body: { points: number; reason: string },
  ) {
    console.log('[UserController] addPoints - userId:', userId, 'points:', body.points);
    return this.userService.addPoints(userId, body.points, body.reason);
  }

  // 消费获得积分
  @Post('points/consume')
  async consumeEarnPoints(
    @Headers('x-user-id') userId: string,
    @Body() body: { amount: number; orderId: string },
  ) {
    console.log('[UserController] consumeEarnPoints - userId:', userId, 'amount:', body.amount);
    return this.userService.consumeEarnPoints(userId, body.amount, body.orderId);
  }

  // 评价获得积分
  @Post('points/review')
  async reviewEarnPoints(
    @Headers('x-user-id') userId: string,
    @Body() body: { orderId: string; hasImage: boolean },
  ) {
    console.log('[UserController] reviewEarnPoints - userId:', userId, 'hasImage:', body.hasImage);
    return this.userService.reviewEarnPoints(userId, body.orderId, body.hasImage);
  }

  // 邀请获得积分
  @Post('points/invite')
  async inviteEarnPoints(
    @Headers('x-user-id') userId: string,
    @Body() body: { invitedOpenid: string },
  ) {
    console.log('[UserController] inviteEarnPoints - userId:', userId, 'invitedOpenid:', body.invitedOpenid);
    return this.userService.inviteEarnPoints(userId, body.invitedOpenid);
  }

  // 获取所有用户（管理后台）
  @Get('admin/list')
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    return this.userService.getAllUsers(Number(page), Number(pageSize));
  }

  // 用户统计
  @Get('admin/stats')
  async getUserStats() {
    return this.userService.getUserStats();
  }
}
