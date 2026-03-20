import { Controller, Get, Post, Delete, Body, Headers, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // 发送消息
  @Post('send')
  async sendMessage(
    @Body('userId') userId: string,
    @Body() message: any,
  ) {
    console.log('[MessageController] sendMessage - userId:', userId);
    return this.messageService.sendMessage(userId, message);
  }

  // 发送模板消息
  @Post('send-template')
  async sendTemplateMessage(
    @Body() body: { userId: string; templateKey: string; params: Record<string, string>; data?: any },
  ) {
    console.log('[MessageController] sendTemplateMessage - userId:', body.userId);
    return this.messageService.sendTemplateMessage(body.userId, body.templateKey, body.params, body.data);
  }

  // 获取用户消息列表
  @Get('list')
  async getUserMessages(
    @Headers('x-user-id') userId: string,
    @Query('type') type?: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
  ) {
    console.log('[MessageController] getUserMessages - userId:', userId);
    return this.messageService.getUserMessages(userId, type, Number(page), Number(pageSize));
  }

  // 获取消息详情
  @Get('detail/:messageId')
  async getMessageDetail(
    @Headers('x-user-id') userId: string,
    @Param('messageId') messageId: string,
  ) {
    console.log('[MessageController] getMessageDetail - messageId:', messageId);
    return this.messageService.getMessageDetail(userId, messageId);
  }

  // 标记已读
  @Post('read')
  async markAsRead(
    @Headers('x-user-id') userId: string,
    @Body('messageIds') messageIds?: string[],
  ) {
    console.log('[MessageController] markAsRead - userId:', userId);
    return this.messageService.markAsRead(userId, messageIds);
  }

  // 删除消息
  @Delete('delete')
  async deleteMessage(
    @Headers('x-user-id') userId: string,
    @Body('messageIds') messageIds: string[],
  ) {
    console.log('[MessageController] deleteMessage - userId:', userId);
    return this.messageService.deleteMessage(userId, messageIds);
  }

  // 获取未读数量
  @Get('unread-count')
  async getUnreadCount(@Headers('x-user-id') userId: string) {
    console.log('[MessageController] getUnreadCount - userId:', userId);
    return this.messageService.getUnreadCount(userId);
  }

  // 获取消息类型
  @Get('types')
  async getMessageTypes() {
    return this.messageService.getMessageTypes();
  }

  // 清空消息
  @Delete('clear')
  async clearMessages(
    @Headers('x-user-id') userId: string,
    @Body('type') type?: string,
  ) {
    console.log('[MessageController] clearMessages - userId:', userId);
    return this.messageService.clearMessages(userId, type);
  }
}
