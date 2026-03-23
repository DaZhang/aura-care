import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
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
  selected: boolean
  bgColor: string
}

const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [userPoints, setUserPoints] = useState(1280)

  useEffect(() => {
    loadCart()
    loadUserPoints()
  }, [])

  // 页面显示时重新加载
  Taro.useDidShow(() => {
    loadCart()
  })

  const loadCart = async () => {
    try {
      // 先尝试从本地存储读取
      const localCart = Taro.getStorageSync('cart')
      console.log('本地购物车数据:', localCart)
      if (localCart) {
        const cartData = JSON.parse(localCart)
        if (cartData.length > 0) {
          setCartItems(cartData.map((item: CartItem) => ({ ...item, selected: true })))
          setLoading(false)
          return
        }
      }

      // 再尝试从API读取
      const res = await Network.request({ url: '/api/cart' })
      console.log('API购物车数据:', res.data)
      if (res.data?.code === 200 && res.data.data?.items?.length > 0) {
        setCartItems(res.data.data.items)
      } else {
        setCartItems([])
      }
    } catch (error) {
      console.error('加载购物车失败:', error)
      setCartItems([])
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
      // 使用默认值
    }
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    setCartItems(updatedItems)
    // 同步到本地存储
    Taro.setStorageSync('cart', JSON.stringify(updatedItems))
  }

  const handleRemove = (itemIds: string[]) => {
    if (itemIds.length === 0) return
    const updatedItems = cartItems.filter(item => !itemIds.includes(item.id))
    setCartItems(updatedItems)
    // 同步到本地存储
    Taro.setStorageSync('cart', JSON.stringify(updatedItems))
    Taro.showToast({ title: '删除成功', icon: 'success' })
  }

  const handleSelect = (itemId: string, selected: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected } : item
      )
    )
  }

  const handleSelectAll = (selected: boolean) => {
    setCartItems(items => items.map(item => ({ ...item, selected })))
  }

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected)
    if (selectedItems.length === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' })
      return
    }
    // 保存选中的商品到本地存储
    Taro.setStorageSync('checkoutItems', JSON.stringify(selectedItems))
    Taro.navigateTo({ url: '/pages/order/confirm?from=cart' })
  }

  const selectedItems = cartItems.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.selected)

  if (loading) {
    return (
      <View className="flex items-center justify-center h-screen bg-white">
        <Text 
          className="text-[#8B7355]"
          style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
        >
          加载中...
        </Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-white">
      {/* 顶部标题栏 */}
      <View className="h-12 flex items-center justify-center bg-white border-b border-gray-100">
        <Text 
          className="text-black"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '4px' }}
        >
          购物车
        </Text>
        {cartItems.length > 0 && (
          <View 
            className="absolute right-6"
            onClick={() => setIsEdit(!isEdit)}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              {isEdit ? '完成' : '编辑'}
            </Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* 空状态 */
        <View className="flex flex-col items-center justify-center pt-32">
          <View className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFE0' }}>
            <ShoppingCart size={40} color="#5D3A1A" />
          </View>
          
          <Text 
            className="text-black mt-8"
            style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '4px' }}
          >
            购物车还是空的
          </Text>
          
          <Text 
            className="text-[#8B7355] mt-3"
            style={{ fontSize: '14px', fontWeight: 300 }}
          >
            快去挑选心仪的养生手串吧
          </Text>
          
          <View
            className="mt-8 px-8 py-3 rounded-full"
            style={{ backgroundColor: '#5D3A1A' }}
            onClick={() => Taro.switchTab({ url: '/pages/customize/index' })}
          >
            <Text 
              className="text-white"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '2px' }}
            >
              去逛逛
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView scrollY className="px-4 py-4" style={{ height: 'calc(100vh - 180px)' }}>
          {cartItems.map((item) => (
            <View 
              key={item.id} 
              className="bg-white rounded-2xl mb-4 p-4 flex flex-row items-center shadow-sm"
            >
              {/* 选择框 */}
              <View 
                className="mr-3"
                onClick={() => handleSelect(item.id, !item.selected)}
              >
                <View 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    item.selected ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-gray-300'
                  }`}
                >
                  {item.selected && <Text className="text-white text-xs">✓</Text>}
                </View>
              </View>

              {/* 商品图片 */}
              <View 
                className="w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: item.bgColor || '#F5EFE0' }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    className="w-16 h-16"
                    mode="aspectFit"
                  />
                ) : (
                  <ShoppingCart size={32} color="#8B7355" />
                )}
              </View>

              {/* 商品信息 */}
              <View className="flex-1 ml-3">
                <Text 
                  className="text-black"
                  style={{ fontSize: '15px', fontWeight: 400, letterSpacing: '1px' }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                
                <Text 
                  className="text-[#8B7355] mt-1"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  {item.constitution}
                </Text>
                
                <View className="flex flex-row items-center justify-between mt-2">
                  <Text 
                    className="text-[#5D3A1A]"
                    style={{ fontSize: '18px', fontWeight: 500 }}
                  >
                    ¥{item.price}
                  </Text>
                  
                  {/* 数量控制 */}
                  <View className="flex flex-row items-center rounded-full" style={{ backgroundColor: '#F5EFE0' }}>
                    <View
                      className="w-7 h-7 flex items-center justify-center"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus size={12} color={item.quantity <= 1 ? '#D4D4D4' : '#5D3A1A'} />
                    </View>
                    <Text 
                      className="w-8 text-center text-black"
                      style={{ fontSize: '14px', fontWeight: 400 }}
                    >
                      {item.quantity}
                    </Text>
                    <View
                      className="w-7 h-7 flex items-center justify-center"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus size={12} color="#5D3A1A" />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
          
          {/* 底部留白 */}
          <View className="h-4" />
        </ScrollView>
      )}

      {/* 我的积分 */}
      {cartItems.length > 0 && (
        <View 
          className="mx-4 mb-2 px-4 py-2 rounded-full flex flex-row items-center self-start"
          style={{ backgroundColor: '#F5EFE0' }}
          onClick={() => Taro.navigateTo({ url: '/pages/points/index' })}
        >
          <Gift size={14} color="#5D3A1A" />
          <Text 
            className="text-[#5D3A1A] ml-2"
            style={{ fontSize: '12px', fontWeight: 400 }}
          >
            积分: {userPoints}
          </Text>
        </View>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex flex-row items-center"
          style={{ paddingBottom: '60px' }}
        >
          <View 
            className="flex flex-row items-center mr-4"
            onClick={() => handleSelectAll(!isAllSelected)}
          >
            <View 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 ${
                isAllSelected ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-gray-300'
              }`}
            >
              {isAllSelected && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text 
              className="text-black"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              全选
            </Text>
          </View>

          <View className="flex-1">
            <Text 
              className="text-[#8B7355]"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              合计：
              <Text 
                className="text-[#5D3A1A]"
                style={{ fontSize: '20px', fontWeight: 500 }}
              >
                ¥{totalPrice.toFixed(0)}
              </Text>
            </Text>
          </View>

          {isEdit ? (
            <View
              className="px-6 py-2 border border-[#5D3A1A] rounded-full"
              onClick={() => handleRemove(selectedItems.map(i => i.id))}
            >
              <Text 
                className="text-[#5D3A1A]"
                style={{ fontSize: '14px', fontWeight: 400 }}
              >
                删除({selectedItems.length})
              </Text>
            </View>
          ) : (
            <View
              className="px-6 py-2 rounded-full"
              style={{ backgroundColor: totalCount > 0 ? '#5D3A1A' : '#D4D4D4' }}
              onClick={handleCheckout}
            >
              <Text 
                className="text-white"
                style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}
              >
                结算({totalCount})
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default CartPage
