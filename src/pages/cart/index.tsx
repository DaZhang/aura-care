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
  isCustom?: boolean // 是否为定制款
  customOptions?: string // 定制选项描述
}

// 默认商品信息映射
const PRODUCT_INFO: Record<string, { name: string; image: string; price: number; constitution: string; bgColor: string }> = {
  'peaceful': { 
    name: '平和养生手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    price: 298,
    constitution: '平和质',
    bgColor: '#F5EFE0'
  },
  'qixu': { 
    name: '益气养元手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
    price: 328,
    constitution: '气虚质',
    bgColor: '#FAF0DC'
  },
  'yangxu': { 
    name: '温阳暖身手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
    price: 338,
    constitution: '阳虚质',
    bgColor: '#F5E6E0'
  },
  'yinxu': { 
    name: '滋阴润燥手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
    price: 348,
    constitution: '阴虚质',
    bgColor: '#E8EEF2'
  },
  'tanshi': { 
    name: '祛湿健脾手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
    price: 318,
    constitution: '痰湿质',
    bgColor: '#EEF2E8'
  },
  'shire': { 
    name: '清热祛湿手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
    price: 328,
    constitution: '湿热质',
    bgColor: '#FBF5E6'
  },
  'xueyu': { 
    name: '活血化瘀手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
    price: 358,
    constitution: '血瘀质',
    bgColor: '#F5E6E6'
  },
  'qiyu': { 
    name: '疏肝解郁手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
    price: 348,
    constitution: '气郁质',
    bgColor: '#E8F0E8'
  },
  'tebing': { 
    name: '固表护卫手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    price: 368,
    constitution: '特禀质',
    bgColor: '#F5EEF5'
  },
  'custom': { 
    name: '定制手串', 
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    price: 398,
    constitution: '专属定制',
    bgColor: '#F5EFE0'
  },
}

// 补全商品信息
const enrichCartItem = (item: CartItem): CartItem => {
  const defaultInfo = PRODUCT_INFO[item.productId] || PRODUCT_INFO['peaceful']
  return {
    ...item,
    name: item.name || defaultInfo.name,
    image: item.image?.startsWith('http') ? item.image : defaultInfo.image,
    price: typeof item.price === 'number' ? item.price : defaultInfo.price,
    constitution: item.constitution || defaultInfo.constitution,
    bgColor: item.bgColor || defaultInfo.bgColor,
    selected: item.selected !== undefined ? item.selected : true
  }
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
          // 使用 enrichCartItem 补全所有必要字段
          const enrichedItems = cartData.map((item: CartItem) => enrichCartItem(item))
          setCartItems(enrichedItems)
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

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
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
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, selected } : item
    )
    setCartItems(updatedItems)
  }

  const handleSelectAll = (selected: boolean) => {
    const updatedItems = cartItems.map(item => ({ ...item, selected }))
    setCartItems(updatedItems)
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

  // 计算选中商品的总价（精确到分）
  const selectedItems = cartItems.filter(item => item.selected)
  const totalAmount = selectedItems.reduce((sum, item) => {
    const itemTotal = Math.round(item.price * 100) * item.quantity
    return sum + itemTotal
  }, 0)
  const totalPrice = (totalAmount / 100).toFixed(2)
  const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.selected)

  // 可用积分抵扣金额（100积分=1元，最多抵扣订单金额的30%）
  const maxPointsDiscount = Math.floor(totalAmount * 0.3) / 100
  const pointsDiscount = Math.min(userPoints / 100, maxPointsDiscount).toFixed(2)
  const finalPrice = (totalAmount / 100 - parseFloat(pointsDiscount)).toFixed(2)

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
            style={{ backgroundColor: '#EBE3D5' }}
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
        <ScrollView scrollY className="px-4 py-4" style={{ height: 'calc(100vh - 220px)' }}>
          {cartItems.map((item) => (
            <View 
              key={item.id} 
              className="bg-white rounded-2xl mb-4 p-4 flex flex-row items-center shadow-sm"
              style={{ borderWidth: 1, borderColor: '#F5F5F5' }}
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
                <Image
                  src={item.image}
                  className="w-16 h-16"
                  mode="aspectFit"
                  onError={() => {
                    console.log('图片加载失败:', item.image)
                  }}
                />
              </View>

              {/* 商品信息 */}
              <View className="flex-1 ml-3">
                <View className="flex flex-row items-center">
                  <Text 
                    className="text-black flex-1"
                    style={{ fontSize: '15px', fontWeight: 400, letterSpacing: '1px' }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  {item.isCustom && (
                    <View 
                      className="px-2 py-1 rounded ml-2"
                      style={{ backgroundColor: '#EBE3D5' }}
                    >
                      <Text 
                        className="text-white"
                        style={{ fontSize: '10px', fontWeight: 400 }}
                      >
                        定制款
                      </Text>
                    </View>
                  )}
                </View>
                
                {/* 定制选项描述 */}
                {item.isCustom && item.customOptions && (
                  <Text 
                    className="text-[#A63D2B] mt-1"
                    style={{ fontSize: '11px', fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    {item.customOptions}
                  </Text>
                )}
                
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
                    ¥{item.price.toFixed(2)}
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
                
                {/* 小计 */}
                <Text 
                  className="text-[#999999] mt-1"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  小计：¥{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          
          {/* 底部留白 */}
          <View className="h-4" />
        </ScrollView>
      )}

      {/* 我的积分和优惠信息 */}
      {cartItems.length > 0 && selectedItems.length > 0 && (
        <View className="mx-4 mb-2 p-3 rounded-xl" style={{ backgroundColor: '#F5EFE0' }}>
          <View 
            className="flex flex-row items-center justify-between"
            onClick={() => Taro.navigateTo({ url: '/pages/points/index' })}
          >
            <View className="flex flex-row items-center">
              <Gift size={14} color="#5D3A1A" />
              <Text 
                className="text-[#5D3A1A] ml-2"
                style={{ fontSize: '12px', fontWeight: 400 }}
              >
                可用积分: {userPoints}
              </Text>
            </View>
            <Text 
              className="text-[#A63D2B]"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              -¥{pointsDiscount}
            </Text>
          </View>
        </View>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3"
          style={{ paddingBottom: '60px' }}
        >
          <View className="flex flex-row items-center">
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
              <View className="flex flex-row items-baseline">
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  合计：
                </Text>
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '20px', fontWeight: 500 }}
                >
                  ¥{totalPrice}
                </Text>
              </View>
              {parseFloat(pointsDiscount) > 0 && selectedItems.length > 0 && (
                <Text 
                  className="text-[#A63D2B]"
                  style={{ fontSize: '11px', fontWeight: 300 }}
                >
                  积分抵扣后 ¥{finalPrice}
                </Text>
              )}
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
                style={{ backgroundColor: totalCount > 0 ? '#EBE3D5' : '#D4D4D4' }}
                onClick={handleCheckout}
              >
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}
                >
                  结算({totalCount})
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default CartPage
