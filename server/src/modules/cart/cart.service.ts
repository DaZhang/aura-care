import { Injectable } from '@nestjs/common';

// 购物车数据存储
const CARTS: Record<string, any[]> = {};

@Injectable()
export class CartService {
  // 获取购物车
  async getCart(userId: string) {
    const cart = CARTS[userId] || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return {
      code: 200,
      data: {
        items: cart,
        total,
        count: cart.reduce((sum, item) => sum + item.quantity, 0),
      },
      message: 'success',
    };
  }

  // 添加商品到购物车
  async addToCart(userId: string, item: any) {
    if (!CARTS[userId]) {
      CARTS[userId] = [];
    }

    const cart = CARTS[userId];
    const existIndex = cart.findIndex(i => i.productId === item.productId);

    if (existIndex > -1) {
      // 已存在，增加数量
      cart[existIndex].quantity += item.quantity || 1;
    } else {
      // 不存在，添加新商品
      cart.push({
        id: `cart_${Date.now()}`,
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1,
        constitution: item.constitution,
        specs: item.specs,
        selected: true,
        createTime: new Date().toISOString(),
      });
    }

    return {
      code: 200,
      data: { count: cart.length },
      message: '添加成功',
    };
  }

  // 更新购物车商品数量
  async updateQuantity(userId: string, itemId: string, quantity: number) {
    const cart = CARTS[userId];
    if (!cart) {
      return { code: 404, data: null, message: '购物车为空' };
    }

    const item = cart.find(i => i.id === itemId);
    if (!item) {
      return { code: 404, data: null, message: '商品不存在' };
    }

    if (quantity <= 0) {
      // 删除商品
      const index = cart.findIndex(i => i.id === itemId);
      cart.splice(index, 1);
    } else {
      item.quantity = quantity;
    }

    return {
      code: 200,
      data: { quantity: item?.quantity || 0 },
      message: '更新成功',
    };
  }

  // 删除购物车商品
  async removeFromCart(userId: string, itemIds: string[]) {
    const cart = CARTS[userId];
    if (!cart) {
      return { code: 200, data: null, message: '购物车为空' };
    }

    CARTS[userId] = cart.filter(i => !itemIds.includes(i.id));

    return {
      code: 200,
      data: { count: CARTS[userId].length },
      message: '删除成功',
    };
  }

  // 选择/取消选择商品
  async toggleSelect(userId: string, itemId: string, selected: boolean) {
    const cart = CARTS[userId];
    if (!cart) {
      return { code: 404, data: null, message: '购物车为空' };
    }

    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.selected = selected;
    }

    return { code: 200, data: null, message: 'success' };
  }

  // 全选/取消全选
  async toggleSelectAll(userId: string, selected: boolean) {
    const cart = CARTS[userId];
    if (!cart) {
      return { code: 200, data: null, message: '购物车为空' };
    }

    cart.forEach(item => {
      item.selected = selected;
    });

    return { code: 200, data: null, message: 'success' };
  }

  // 清空购物车
  async clearCart(userId: string) {
    CARTS[userId] = [];
    return { code: 200, data: null, message: '清空成功' };
  }

  // 获取选中商品
  async getSelectedItems(userId: string) {
    const cart = CARTS[userId] || [];
    const selectedItems = cart.filter(i => i.selected);
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      code: 200,
      data: {
        items: selectedItems,
        total,
        count: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
      },
      message: 'success',
    };
  }
}
