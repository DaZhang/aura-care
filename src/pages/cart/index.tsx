import { View, Text, ScrollView, Image } from '@tarojs/components'
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
      setUserPoints(1280)
    }
  }

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemove = async (itemIds: string[]) => {
    if (itemIds.length === 0) return
    setCartItems(items => items.filter(item => !itemIds.includes(item.id)))
    Taro.showToast({ title: '删除成功', icon: 'success' })
  }

  const handleSelect = async (itemId: string, selected: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, selected } : item
      )
    )
  }

  const handleSelectAll = async (selected: boolean) => {
    setCartItems(items => items.map(item => ({ ...item, selected })))
  }

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected)
    if (selectedItems.length === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' })
      return
    }
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
          className="text-[#333333]"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          加载中...
        </Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-white pb-20">
      {/* 顶部标题栏 - 元古风格 */}
      <View className="bg-[#B8A692] h-12 flex items-center justify-center sticky top-0 z-50">
        <Text 
          className="text-white"
          style={{ fontSize: '18px', fontWeight: 400 }}
        >
          购物车
        </Text>
        {cartItems.length > 0 && (
          <View 
            className="absolute right-6"
            onClick={() => setIsEdit(!isEdit)}
          >
            <Text 
              className="text-white"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              {isEdit ? '完成' : '编辑'}
            </Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* 空状态 - 元古风格 */
        <View className="flex flex-col items-center justify-center pt-32">
          <ShoppingCart size={80} color="#D4D4D4" />
          
          {/* 标题 - 20px 字重400 */}
          <Text 
            className="text-black mt-8"
            style={{ fontSize: '20px', fontWeight: 400 }}
          >
            购物车还是空的
          </Text>
          
          {/* 副标题 - 14px 字重300 */}
          <Text 
            className="text-[#333333] mt-3"
            style={{ fontSize: '14px', fontWeight: 300 }}
          >
            快去挑选心仪的养生手串吧
          </Text>
          
          {/* 按钮 */}
          <View
            className="border border-[#B8A692] rounded-full px-8 py-2 mt-8"
            onClick={() => Taro.switchTab({ url: '/pages/customize/index' })}
          >
            <Text 
              className="text-[#B8A692]"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              去逛逛
            </Text>
          </View>
        </View>
      ) : (
        /* 商品列表 */
        <ScrollView scrollY className="px-6 py-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="bg-white rounded-xl mb-3 overflow-hidden">
              <CardContent className="p-3 flex items-center">
                <View 
                  className="mr-3"
                  onClick={() => handleSelect(item.id, !item.selected)}
                >
                  <View 
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      item.selected ? 'border-[#B8A692] bg-[#B8A692]' : 'border-gray-300'
                    }`}
                  >
                    {item.selected && <Text className="text-white text-xs">✓</Text>}
                  </View>
                </View>

                <Image
                  src={item.image}
                  className="w-16 h-16 rounded-lg"
                  mode="aspectFill"
                />

                <View className="flex-1 ml-3">
                  {/* 商品标题 - 16px 字重400 */}
                  <Text 
                    className="text-black"
                    style={{ fontSize: '16px', fontWeight: 400 }}
                  >
                    {item.name}
                  </Text>
                  
                  {/* 体质 - 14px 字重300 */}
                  <Text 
                    className="text-[#333333] mt-1"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  >
                    {item.constitution}
                  </Text>
                  
                  <View className="flex items-center justify-between mt-2">
                    {/* 价格 - 18px 字重400 */}
                    <Text 
                      className="text-[#B8A692]"
                      style={{ fontSize: '18px', fontWeight: 400 }}
                    >
                      ¥{item.price}
                    </Text>
                    
                    {/* 数量控制 */}
                    <View className="flex items-center bg-gray-50 rounded-full">
                      <View
                        className="w-6 h-6 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} color={item.quantity <= 1 ? '#D4D4D4' : '#999'} />
                      </View>
                      <Text 
                        className="w-6 text-center text-black"
                        style={{ fontSize: '14px', fontWeight: 400 }}
                      >
                        {item.quantity}
                      </Text>
                      <View
                        className="w-6 h-6 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} color="#999" />
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </ScrollView>
      )}

      {/* 我的积分 */}
      <View 
        className="fixed left-6 bottom-24 bg-white rounded-full px-4 py-2 flex items-center shadow-sm"
        onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}
      >
        <Gift size={14} color="#B8A692" />
        <Text 
          className="text-[#333333] ml-2"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          积分: {userPoints}
        </Text>
      </View>

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center">
          <View 
            className="flex items-center mr-4"
            onClick={() => handleSelectAll(!isAllSelected)}
          >
            <View 
              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                isAllSelected ? 'border-[#B8A692] bg-[#B8A692]' : 'border-gray-300'
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
              className="text-[#333333]"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              合计：
              <Text 
                className="text-[#B8A692]"
                style={{ fontSize: '18px', fontWeight: 400 }}
              >
                ¥{totalPrice.toFixed(2)}
              </Text>
            </Text>
          </View>

          {isEdit ? (
            <View
              className="px-5 py-2 border border-gray-300 rounded-full"
              onClick={() => handleRemove(selectedItems.map(i => i.id))}
            >
              <Text 
                className="text-[#333333]"
                style={{ fontSize: '14px', fontWeight: 400 }}
              >
                删除({selectedItems.length})
              </Text>
            </View>
          ) : (
            <View
              className={`px-5 py-2 rounded-full ${totalCount > 0 ? 'bg-[#B8A692]' : 'bg-gray-300'}`}
              onClick={handleCheckout}
            >
              <Text 
                className="text-white"
                style={{ fontSize: '14px', fontWeight: 400 }}
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
