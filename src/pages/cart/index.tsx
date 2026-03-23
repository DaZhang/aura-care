import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, ShoppingCart, Gift } from 'lucide-react-taro'
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
  const [userPoints, setUserPoints] = useState(0)

  useEffect(() => {
    loadCart()
    loadUserPoints()
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

  const loadUserPoints = async () => {
    try {
      const res = await Network.request({ url: '/api/user/points' })
      if (res.data?.code === 200) {
        setUserPoints(res.data.data || 0)
      }
    } catch (error) {
      console.error('获取积分失败:', error)
      setUserPoints(1280)
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
      <View className="flex items-center justify-center h-screen bg-[#FDF9F3]">
        <Text className="text-gray-500">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-[#FDF9F3] pb-20">
      {/* 顶部标题栏 - 浅卡其色 */}
      <View className="bg-[#CBBE9C] h-12 flex items-center justify-center sticky top-0 z-50">
        <Text className="text-base font-medium text-white">购物车</Text>
        {cartItems.length > 0 && (
          <View 
            className="absolute right-4"
            onClick={() => setIsEdit(!isEdit)}
          >
            <Text className="text-sm text-white">{isEdit ? '完成' : '编辑'}</Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* 空状态 - 元古风格 */
        <View className="flex flex-col items-center justify-center pt-32">
          {/* 极简插画 */}
          <View className="opacity-40">
            <ShoppingCart size={80} color="#D4D4D4" />
          </View>
          
          <Text className="text-xl text-gray-500 mt-8 mb-3">购物车还是空的</Text>
          <Text className="text-sm text-gray-400 mb-8">快去挑选心仪的养生手串吧</Text>
          
          {/* 线框按钮 - 浅卡其色 */}
          <View
            className="border border-[#CBBE9C] rounded-full px-10 py-3"
            onClick={() => Taro.switchTab({ url: '/pages/customize/index' })}
          >
            <Text className="text-[#CBBE9C] text-base">去逛逛</Text>
          </View>
        </View>
      ) : (
        /* 商品列表 */
        <ScrollView scrollY className="px-5 py-4">
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
                      item.selected ? 'border-[#CBBE9C] bg-[#CBBE9C]' : 'border-gray-300'
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
                  <Text className="text-sm font-medium text-[#1A1A1A] line-clamp-2">{item.name}</Text>
                  <Text className="text-xs text-gray-500 mt-1">{item.constitution}</Text>
                  {item.specs && (
                    <Text className="text-xs text-gray-400">{item.specs}</Text>
                  )}
                  
                  <View className="flex items-center justify-between mt-2">
                    <Text className="text-base font-bold text-[#D4A84B]">¥{item.price}</Text>
                    
                    {/* 数量控制 */}
                    <View className="flex items-center bg-gray-50 rounded-full">
                      <View
                        className="w-7 h-7 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} color={item.quantity <= 1 ? '#D4D4D4' : '#666'} />
                      </View>
                      <Text className="w-8 text-center text-sm text-[#1A1A1A]">{item.quantity}</Text>
                      <View
                        className="w-7 h-7 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} color="#666" />
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </ScrollView>
      )}

      {/* 我的积分 - 左下角悬浮 */}
      <View 
        className="fixed left-4 bottom-24 bg-white rounded-full px-4 py-2 flex items-center shadow-sm"
        onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}
      >
        <Gift size={16} color="#CBBE9C" />
        <Text className="text-sm text-gray-600 ml-2">积分: {userPoints}</Text>
      </View>

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center">
          {/* 全选 */}
          <View 
            className="flex items-center mr-4"
            onClick={() => handleSelectAll(!isAllSelected)}
          >
            <View 
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                isAllSelected ? 'border-[#CBBE9C] bg-[#CBBE9C]' : 'border-gray-300'
              }`}
            >
              {isAllSelected && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-sm text-[#1A1A1A]">全选</Text>
          </View>

          {/* 总价 */}
          <View className="flex-1">
            <Text className="text-sm text-gray-600">
              合计：<Text className="text-lg font-bold text-[#D4A84B]">¥{totalPrice.toFixed(2)}</Text>
            </Text>
          </View>

          {/* 操作按钮 */}
          {isEdit ? (
            <View
              className="px-6 py-2 border border-gray-300 rounded-full"
              onClick={() => handleRemove(selectedItems.map(i => i.id))}
            >
              <Text className="text-sm text-gray-600">删除({selectedItems.length})</Text>
            </View>
          ) : (
            <View
              className={`px-6 py-2 rounded-full ${totalCount > 0 ? 'bg-[#CBBE9C]' : 'bg-gray-300'}`}
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
