import { Controller, Get, Post, Delete, Body, Headers, Param, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // 获取购物车
  @Get()
  async getCart(@Headers('x-user-id') userId: string) {
    console.log('[CartController] getCart - userId:', userId);
    return this.cartService.getCart(userId);
  }

  // 添加商品到购物车
  @Post('add')
  async addToCart(
    @Headers('x-user-id') userId: string,
    @Body() item: any,
  ) {
    console.log('[CartController] addToCart - userId:', userId, 'item:', item.productId);
    return this.cartService.addToCart(userId, item);
  }

  // 更新商品数量
  @Post('update')
  async updateQuantity(
    @Headers('x-user-id') userId: string,
    @Body() body: { itemId: string; quantity: number },
  ) {
    console.log('[CartController] updateQuantity - userId:', userId, 'itemId:', body.itemId);
    return this.cartService.updateQuantity(userId, body.itemId, body.quantity);
  }

  // 删除商品
  @Delete('remove')
  async removeFromCart(
    @Headers('x-user-id') userId: string,
    @Body() body: { itemIds: string[] },
  ) {
    console.log('[CartController] removeFromCart - userId:', userId, 'itemIds:', body.itemIds);
    return this.cartService.removeFromCart(userId, body.itemIds);
  }

  // 选择/取消选择商品
  @Post('select')
  async toggleSelect(
    @Headers('x-user-id') userId: string,
    @Body() body: { itemId: string; selected: boolean },
  ) {
    console.log('[CartController] toggleSelect - userId:', userId);
    return this.cartService.toggleSelect(userId, body.itemId, body.selected);
  }

  // 全选/取消全选
  @Post('select-all')
  async toggleSelectAll(
    @Headers('x-user-id') userId: string,
    @Body() body: { selected: boolean },
  ) {
    console.log('[CartController] toggleSelectAll - userId:', userId);
    return this.cartService.toggleSelectAll(userId, body.selected);
  }

  // 清空购物车
  @Delete('clear')
  async clearCart(@Headers('x-user-id') userId: string) {
    console.log('[CartController] clearCart - userId:', userId);
    return this.cartService.clearCart(userId);
  }

  // 获取选中商品（用于结算）
  @Get('selected')
  async getSelectedItems(@Headers('x-user-id') userId: string) {
    console.log('[CartController] getSelectedItems - userId:', userId);
    return this.cartService.getSelectedItems(userId);
  }
}
