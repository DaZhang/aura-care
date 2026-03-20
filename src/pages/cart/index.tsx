import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, ShoppingCart } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  constitution: string
  specs?: string
  selected: boolean
}

const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const res = await Network.request({ url: '/api/cart' })
      console.log('购物车数据:', res.data)
      setCartItems(res.data.data?.items || [])
    } catch (error) {
      console.error('加载购物车失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    
    try {
      await Network.request({
        url: '/api/cart/update',
        method: 'POST',
        data: { itemId, quantity }
      })
      
      setCartItems(items => 
        items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    } catch (error) {
      Taro.showToast({ title: '更新失败', icon: 'none' })
    }
  }

  const handleRemove = async (itemIds: string[]) => {
    if (itemIds.length === 0) return
    
    try {
      await Network.request({
        url: '/api/cart/remove',
        method: 'DELETE',
        data: { itemIds }
      })
      
      setCartItems(items => items.filter(item => !itemIds.includes(item.id)))
      Taro.showToast({ title: '删除成功', icon: 'success' })
    } catch (error) {
      Taro.showToast({ title: '删除失败', icon: 'none' })
    }
  }

  const handleSelect = async (itemId: string, selected: boolean) => {
    try {
      await Network.request({
        url: '/api/cart/select',
        method: 'POST',
        data: { itemId, selected }
      })
      
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, selected } : item
        )
      )
    } catch (error) {
      console.error('更新选中状态失败:', error)
    }
  }

  const handleSelectAll = async (selected: boolean) => {
    try {
      await Network.request({
        url: '/api/cart/select-all',
        method: 'POST',
        data: { selected }
      })
      
      setCartItems(items => items.map(item => ({ ...item, selected })))
    } catch (error) {
      console.error('全选失败:', error)
    }
  }

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected)
    if (selectedItems.length === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' })
      return
    }
    
    Taro.navigateTo({ url: '/pages/order/confirm?from=cart' })
  }

  // 计算选中商品总价
  const selectedItems = cartItems.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.selected)

  if (loading) {
    return (
      <View className="flex items-center justify-center h-screen bg-[#F7F4ED]">
        <Text className="text-[#6B5D52]">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED] pb-20">
      {/* 头部 */}
      <View className="bg-white px-4 py-3 flex items-center justify-between border-b border-[#E5DDD3]">
        <Text className="text-lg font-bold text-[#2C1810]">购物车</Text>
        {cartItems.length > 0 && (
          <View onClick={() => setIsEdit(!isEdit)}>
            <Text className="text-sm text-[#5D3A1A]">{isEdit ? '完成' : '编辑'}</Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* 空状态 */
        <View className="flex flex-col items-center justify-center pt-32">
          <ShoppingCart size={64} color="#D4C9B8" />
          <Text className="text-[#6B5D52] mt-4 mb-2">购物车是空的</Text>
          <Text className="text-sm text-[#8B7355] mb-6">去挑选您心仪的养生手串吧</Text>
          <View
            className="px-6 py-2 bg-[#5D3A1A] rounded-full"
            onClick={() => Taro.switchTab({ url: '/pages/index/index' })}
          >
            <Text className="text-white text-sm">去逛逛</Text>
          </View>
        </View>
      ) : (
        /* 商品列表 */
        <ScrollView scrollY className="px-4 py-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="bg-white rounded-xl mb-3 overflow-hidden">
              <CardContent className="p-3 flex items-center">
                {/* 选择框 */}
                <View 
                  className="mr-3"
                  onClick={() => handleSelect(item.id, !item.selected)}
                >
                  <View 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.selected ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-[#D4C9B8]'
                    }`}
                  >
                    {item.selected && <Text className="text-white text-xs">✓</Text>}
                  </View>
                </View>

                {/* 商品图片 */}
                <Image
                  src={item.image}
                  className="w-20 h-20 rounded-lg"
                  mode="aspectFill"
                />

                {/* 商品信息 */}
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-medium text-[#2C1810] line-clamp-2">{item.name}</Text>
                  <Text className="text-xs text-[#6B5D52] mt-1">{item.constitution}</Text>
                  {item.specs && (
                    <Text className="text-xs text-[#8B7355]">{item.specs}</Text>
                  )}
                  
                  <View className="flex items-center justify-between mt-2">
                    <Text className="text-base font-bold text-[#8B2500]">¥{item.price}</Text>
                    
                    {/* 数量控制 */}
                    <View className="flex items-center bg-[#F7F4ED] rounded-full">
                      <View
                        className="w-7 h-7 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} color={item.quantity <= 1 ? '#D4C9B8' : '#5D3A1A'} />
                      </View>
                      <Text className="w-8 text-center text-sm text-[#2C1810]">{item.quantity}</Text>
                      <View
                        className="w-7 h-7 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} color="#5D3A1A" />
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}

          {/* 推荐商品 */}
          <View className="mt-6">
            <Text className="text-base font-bold text-[#2C1810] mb-3">为你推荐</Text>
            <View className="flex gap-3">
              {[1, 2].map(i => (
                <View key={i} className="flex-1 bg-white rounded-xl p-3">
                  <Image
                    src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=200&h=200&fit=crop"
                    className="w-full h-24 rounded-lg"
                    mode="aspectFill"
                  />
                  <Text className="text-xs text-[#2C1810] mt-2 line-clamp-1">平和养生手串</Text>
                  <Text className="text-sm font-bold text-[#8B2500] mt-1">¥298</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DDD3] px-4 py-3 flex items-center">
          {/* 全选 */}
          <View 
            className="flex items-center mr-4"
            onClick={() => handleSelectAll(!isAllSelected)}
          >
            <View 
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                isAllSelected ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-[#D4C9B8]'
              }`}
            >
              {isAllSelected && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-sm text-[#2C1810]">全选</Text>
          </View>

          {/* 总价 */}
          <View className="flex-1">
            <Text className="text-sm text-[#6B5D52]">
              合计：<Text className="text-lg font-bold text-[#8B2500]">¥{totalPrice.toFixed(2)}</Text>
            </Text>
          </View>

          {/* 操作按钮 */}
          {isEdit ? (
            <View
              className="px-6 py-2 border border-[#8B2500] rounded-full"
              onClick={() => handleRemove(selectedItems.map(i => i.id))}
            >
              <Text className="text-sm text-[#8B2500]">删除({selectedItems.length})</Text>
            </View>
          ) : (
            <View
              className={`px-6 py-2 rounded-full ${totalCount > 0 ? 'bg-[#5D3A1A]' : 'bg-[#D4C9B8]'}`}
              onClick={handleCheckout}
            >
              <Text className="text-sm text-white">结算({totalCount})</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default CartPage
