import { View, Text, Image, ScrollView, Input, Textarea } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { MapPin, User, Phone, ChevronRight, Plus } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 图片资源
const IMAGES = {
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
  braceletYangxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
  braceletYinxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
}

// 商品信息
const PRODUCT_INFO: Record<string, { name: string; image: string; price: number }> = {
  peaceful: { name: '平和养生手串', image: IMAGES.braceletPeaceful, price: 298 },
  qixu: { name: '补气安神手串', image: IMAGES.braceletQixu, price: 358 },
  yangxu: { name: '温阳暖身手串', image: IMAGES.braceletYangxu, price: 328 },
  yinxu: { name: '滋阴润燥手串', image: IMAGES.braceletYinxu, price: 368 },
}

// 商品项类型
interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  constitution?: string
  selected?: boolean
  bgColor?: string
  isCustom?: boolean
  customOptions?: string
}

// 配送方式
const DELIVERY_OPTIONS = [
  { id: 'express', name: '顺丰快递', price: 12, desc: '预计2-3天送达' },
  { id: 'standard', name: '普通快递', price: 8, desc: '预计3-5天送达' },
  { id: 'free', name: '免费配送', price: 0, desc: '满299元免运费', disabled: false },
]

const OrderConfirmPage: FC = () => {
  const router = useRouter()
  // 支持多商品
  const [products, setProducts] = useState<CartItem[]>([])
  const [customization, setCustomization] = useState<any>(null)
  
  // 收货地址
  const [address, setAddress] = useState({
    id: '',
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
  })
  
  // 配送方式
  const [deliveryId, setDeliveryId] = useState('express')
  
  // 备注
  const [remark, setRemark] = useState('')
  
  // 优惠（预留）
  const discount = 0

  // 页面显示时检查选中的地址
  Taro.useDidShow(() => {
    const selectedAddressStr = Taro.getStorageSync('selectedAddress')
    if (selectedAddressStr) {
      try {
        const selectedAddress = JSON.parse(selectedAddressStr)
        setAddress(selectedAddress)
        // 清除选中地址缓存
        Taro.removeStorageSync('selectedAddress')
      } catch (e) {
        console.error('解析选中地址失败:', e)
      }
    } else {
      // 如果没有选中地址，尝试加载默认地址
      loadDefaultAddress()
    }
  })

  const loadDefaultAddress = () => {
    const savedAddresses = Taro.getStorageSync('addresses')
    if (savedAddresses) {
      try {
        const addresses = JSON.parse(savedAddresses)
        const defaultAddr = addresses.find(a => a.isDefault)
        if (defaultAddr) {
          setAddress(defaultAddr)
        }
      } catch (e) {
        console.error('加载默认地址失败:', e)
      }
    }
  }

  useEffect(() => {
    const params = router.params
    console.log('[OrderConfirmPage] params:', params)
    
    // 如果是从购物车跳转，从本地存储读取商品数据
    if (params.from === 'cart') {
      const checkoutItemsStr = Taro.getStorageSync('checkoutItems')
      console.log('[OrderConfirmPage] checkoutItems:', checkoutItemsStr)
      if (checkoutItemsStr) {
        try {
          const checkoutItems = JSON.parse(checkoutItemsStr)
          if (checkoutItems && checkoutItems.length > 0) {
            // 直接使用所有选中的商品
            setProducts(checkoutItems)
          }
        } catch (e) {
          console.error('[OrderConfirmPage] 解析checkoutItems失败:', e)
        }
      }
    } else {
      // 从商品详情或定制页跳转，从URL参数读取
      if (params.productId) {
        const productInfo = PRODUCT_INFO[params.productId] || {
          name: '养生手串',
          image: IMAGES.braceletPeaceful,
          price: 298
        }
        const quantity = params.quantity ? parseInt(params.quantity) : 1
        setProducts([{
          id: params.productId,
          productId: params.productId,
          name: productInfo.name,
          image: productInfo.image,
          price: productInfo.price,
          quantity: quantity
        }])
      }
      
      if (params.customization) {
        try {
          setCustomization(JSON.parse(decodeURIComponent(params.customization)))
        } catch (e) {
          console.error('解析定制信息失败:', e)
        }
      }
    }
  }, [router.params])

  // 计算商品总价
  const productsTotalPrice = products.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  // 检查是否免运费
  useEffect(() => {
    if (productsTotalPrice >= 299) {
      setDeliveryId('free')
    }
  }, [productsTotalPrice])

  // 计算运费
  const deliveryFee = DELIVERY_OPTIONS.find(d => d.id === deliveryId)?.price || 0
  
  // 计算总价
  const totalPrice = productsTotalPrice + deliveryFee - discount

  // 计算总数量
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0)

  // 从收货地址管理获取
  const handleSelectAddress = () => {
    Taro.navigateTo({ url: '/pages/address/list?select=true' })
  }

  // 提交订单
  const handleSubmit = async () => {
    // 验证收货地址
    if (!address.name || !address.phone || !address.detail) {
      Taro.showToast({ title: '请填写完整的收货地址', icon: 'none' })
      return
    }
    
    // 验证手机号
    if (!/^1[3-9]\d{9}$/.test(address.phone)) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }

    // 验证商品
    if (products.length === 0) {
      Taro.showToast({ title: '没有选择商品', icon: 'none' })
      return
    }

    const orderData = {
      userId: 'user001',
      products: products.map(p => ({
        id: p.productId || p.id,
        name: p.name,
        image: p.image,
        price: p.price,
        quantity: p.quantity,
        customOptions: p.customOptions,
        constitution: p.constitution
      })),
      customization: customization,
      address: address,
      delivery: {
        method: deliveryId,
        fee: deliveryFee,
      },
      totalPrice: totalPrice,
      remark: remark,
    }
    
    console.log('[OrderConfirmPage] 提交订单:', orderData)
    
    try {
      Taro.showLoading({ title: '提交中...' })
      const res = await Network.request({
        url: '/api/order/create',
        method: 'POST',
        data: orderData
      })
      console.log('[OrderConfirmPage] createOrder response:', res.data)
      Taro.hideLoading()
      
      if (res.data?.code === 200) {
        const orderId = res.data.data?.orderId
        
        // 将订单保存到本地存储
        const newOrder = {
          id: orderId,
          userId: 'user001',
          products: products.map(p => ({
            id: p.productId || p.id,
            name: p.name,
            image: p.image,
            price: p.price,
            quantity: p.quantity,
            customOptions: p.customOptions,
            constitution: p.constitution
          })),
          status: 'pending' as const,
          priceInfo: {
            totalAmount: totalPrice,
            shippingFee: deliveryFee,
            discountAmount: discount
          },
          address: address,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString()
        }
        
        // 保存到本地存储
        try {
          const existingOrdersStr = Taro.getStorageSync('orders')
          const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : []
          existingOrders.unshift(newOrder)
          Taro.setStorageSync('orders', JSON.stringify(existingOrders))
          console.log('[OrderConfirmPage] 订单已保存到本地:', newOrder)
        } catch (e) {
          console.error('[OrderConfirmPage] 保存订单到本地失败:', e)
        }
        
        Taro.showModal({
          title: '订单创建成功',
          content: `订单号: ${orderId}\n总价: ¥${totalPrice}\n\n是否立即支付？`,
          confirmText: '立即支付',
          cancelText: '稍后支付',
          success: async (modalRes) => {
            if (modalRes.confirm) {
              try {
                Taro.showLoading({ title: '支付中...' })
                const payRes = await Network.request({
                  url: '/api/order/pay',
                  method: 'POST',
                  data: { orderId }
                })
                Taro.hideLoading()
                console.log('[OrderConfirmPage] payOrder response:', payRes.data)
                
                if (payRes.data?.code === 200) {
                  // 更新本地订单状态为已支付
                  try {
                    const ordersStr = Taro.getStorageSync('orders')
                    const orders = ordersStr ? JSON.parse(ordersStr) : []
                    const orderIndex = orders.findIndex((o: any) => o.id === orderId)
                    if (orderIndex !== -1) {
                      orders[orderIndex].status = 'paid'
                      orders[orderIndex].updateTime = new Date().toISOString()
                      Taro.setStorageSync('orders', JSON.stringify(orders))
                      console.log('[OrderConfirmPage] 订单状态已更新为已支付')
                    }
                  } catch (e) {
                    console.error('[OrderConfirmPage] 更新订单状态失败:', e)
                  }
                  
                  Taro.showToast({ title: '支付成功', icon: 'success' })
                  setTimeout(() => {
                    Taro.redirectTo({ url: '/pages/profile/orders?status=paid' })
                  }, 1500)
                } else {
                  Taro.showToast({ title: payRes.data?.message || '支付失败', icon: 'none' })
                }
              } catch (payError) {
                Taro.hideLoading()
                console.error('[OrderConfirmPage] payOrder error:', payError)
                Taro.showToast({ title: '支付失败，请重试', icon: 'none' })
              }
            } else {
              Taro.redirectTo({ url: '/pages/profile/orders?status=pending' })
            }
          }
        })
      } else {
        Taro.showToast({ title: res.data?.message || '订单创建失败', icon: 'none' })
      }
    } catch (error) {
      Taro.hideLoading()
      console.error('[OrderConfirmPage] createOrder error:', error)
      Taro.showToast({ title: '提交失败，请重试', icon: 'none' })
    }
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED] pb-24">
      <ScrollView scrollY className="h-[calc(100vh-80px)]">
        {/* 收货地址 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden">
          {address.name ? (
            <View className="p-4" onClick={handleSelectAddress}>
              <View className="flex items-start">
                <MapPin size={20} color="#5D3A1A" className="mt-1" />
                <View className="flex-1 ml-3">
                  <View className="flex items-center mb-1">
                    <Text className="text-base font-medium text-[#2C1810]">{address.name}</Text>
                    <Text className="text-sm text-[#6B5D52] ml-3">{address.phone}</Text>
                  </View>
                  <Text className="text-sm text-[#6B5D52]">
                    {address.province}{address.city}{address.district}{address.detail}
                  </Text>
                </View>
                <ChevronRight size={20} color="#8B7355" />
              </View>
            </View>
          ) : (
            <View className="p-4 flex items-center justify-center" onClick={handleSelectAddress}>
              <Plus size={20} color="#8B2500" />
              <Text className="text-[#8B2500] ml-2">添加收货地址</Text>
            </View>
          )}
        </View>

        {/* 地址表单 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4">
          <Text className="text-base font-bold text-[#2C1810] mb-4">收货信息</Text>
          
          {/* 收货人 */}
          <View className="flex items-center mb-4 pb-4 border-b border-[#E5DDD3]">
            <User size={18} color="#6B5D52" />
            <View className="flex-1 ml-3 bg-[#F7F4ED] rounded-xl px-4 py-3">
              <Input
                className="w-full bg-transparent text-sm"
                placeholder="请输入收货人姓名"
                value={address.name}
                onInput={(e) => setAddress({ ...address, name: e.detail.value })}
              />
            </View>
          </View>
          
          {/* 手机号 */}
          <View className="flex items-center mb-4 pb-4 border-b border-[#E5DDD3]">
            <Phone size={18} color="#6B5D52" />
            <View className="flex-1 ml-3 bg-[#F7F4ED] rounded-xl px-4 py-3">
              <Input
                className="w-full bg-transparent text-sm"
                placeholder="请输入手机号"
                type="number"
                maxlength={11}
                value={address.phone}
                onInput={(e) => setAddress({ ...address, phone: e.detail.value })}
              />
            </View>
          </View>
          
          {/* 所在地区 */}
          <View className="flex items-center mb-4 pb-4 border-b border-[#E5DDD3]">
            <MapPin size={18} color="#6B5D52" />
            <View className="flex-1 ml-3 flex gap-2">
              <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-sm"
                  placeholder="省"
                  value={address.province}
                  onInput={(e) => setAddress({ ...address, province: e.detail.value })}
                />
              </View>
              <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-sm"
                  placeholder="市"
                  value={address.city}
                  onInput={(e) => setAddress({ ...address, city: e.detail.value })}
                />
              </View>
              <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-sm"
                  placeholder="区"
                  value={address.district}
                  onInput={(e) => setAddress({ ...address, district: e.detail.value })}
                />
              </View>
            </View>
          </View>
          
          {/* 详细地址 */}
          <View className="bg-[#F7F4ED] rounded-xl p-4">
            <Textarea
              style={{ width: '100%', minHeight: '60px', backgroundColor: 'transparent', fontSize: '14px' }}
              placeholder="请输入详细地址（街道、楼栋、门牌号等）"
              value={address.detail}
              onInput={(e) => setAddress({ ...address, detail: e.detail.value })}
              maxlength={100}
            />
          </View>
        </View>

        {/* 商品信息 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4">
          {/* 多商品列表 */}
          {products.map((item, index) => (
            <View 
              key={item.id || index} 
              className={`flex items-center ${index > 0 ? 'mt-4 pt-4 border-t border-[#E5DDD3]' : ''}`}
            >
              <Image 
                src={item.image} 
                className="w-20 h-20 rounded-xl" 
                mode="aspectFill" 
              />
              <View className="flex-1 ml-4">
                <Text className="text-base font-medium text-[#2C1810] mb-1">{item.name}</Text>
                {item.customOptions && (
                  <Text className="text-xs text-[#6B5D52] mb-1" numberOfLines={1}>
                    {item.customOptions}
                  </Text>
                )}
                {item.constitution && (
                  <Text className="text-xs text-[#8B7355] mb-1">{item.constitution}</Text>
                )}
                <View className="flex items-baseline justify-between mt-1">
                  <Text className="text-lg font-bold text-[#8B2500]">¥{item.price}</Text>
                  <Text className="text-sm text-[#6B5D52]">x{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
          
          {/* 商品汇总 */}
          <View className="flex items-center justify-between pt-4 mt-4 border-t border-[#E5DDD3]">
            <Text className="text-sm text-[#6B5D52]">共{totalQuantity}件商品</Text>
            <View className="flex items-baseline">
              <Text className="text-sm text-[#6B5D52] mr-2">商品合计:</Text>
              <Text className="text-lg font-bold text-[#8B2500]">¥{productsTotalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* 配送方式 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4">
          <Text className="text-base font-bold text-[#2C1810] mb-4">配送方式</Text>
          {DELIVERY_OPTIONS.map((option) => {
            const isSelected = deliveryId === option.id
            const isDisabled = option.id === 'free' && productsTotalPrice < 299
            
            return (
              <View
                key={option.id}
                className={`flex items-center justify-between p-3 mb-2 rounded-xl border-2 ${
                  isSelected ? 'border-[#5D3A1A]' : 'border-[#E5DDD3]'
                } ${isDisabled ? 'opacity-50' : ''}`}
                onClick={() => !isDisabled && setDeliveryId(option.id)}
              >
                <View className="flex items-center">
                  <View
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      isSelected ? 'border-[#5D3A1A]' : 'border-[#D4C4B0]'
                    }`}
                  >
                    {isSelected && (
                      <View className="w-3 h-3 rounded-full bg-[#5D3A1A]" />
                    )}
                  </View>
                  <View>
                    <Text className="text-sm font-medium text-[#2C1810]">{option.name}</Text>
                    <Text className="text-xs text-[#6B5D52]">{option.desc}</Text>
                  </View>
                </View>
                <Text className="text-sm font-medium text-[#8B2500]">
                  {option.price === 0 ? '免费' : `¥${option.price}`}
                </Text>
              </View>
            )
          })}
        </View>

        {/* 备注 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4">
          <Text className="text-base font-bold text-[#2C1810] mb-3">订单备注</Text>
          <View className="bg-[#F7F4ED] rounded-xl p-4">
            <Textarea
              style={{ width: '100%', minHeight: '60px', backgroundColor: 'transparent', fontSize: '14px' }}
              placeholder="如有特殊需求请在此备注（选填）"
              value={remark}
              onInput={(e) => setRemark(e.detail.value)}
              maxlength={200}
            />
          </View>
        </View>

        {/* 价格明细 */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 mb-4">
          <Text className="text-base font-bold text-[#2C1810] mb-3">价格明细</Text>
          <View className="space-y-2">
            <View className="flex justify-between">
              <Text className="text-sm text-[#6B5D52]">商品金额</Text>
              <Text className="text-sm text-[#2C1810]">¥{productsTotalPrice.toFixed(2)}</Text>
            </View>
            <View className="flex justify-between">
              <Text className="text-sm text-[#6B5D52]">运费</Text>
              <Text className="text-sm text-[#2C1810]">{deliveryFee === 0 ? '免费' : `¥${deliveryFee}`}</Text>
            </View>
            {discount > 0 && (
              <View className="flex justify-between">
                <Text className="text-sm text-[#8B2500]">优惠</Text>
                <Text className="text-sm text-[#8B2500]">-¥{discount}</Text>
              </View>
            )}
            <View className="flex justify-between pt-2 border-t border-[#E5DDD3]">
              <Text className="text-sm font-medium text-[#2C1810]">合计</Text>
              <Text className="text-lg font-bold text-[#8B2500]">¥{totalPrice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部提交栏 */}
      <View 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DDD3] p-4 flex items-center justify-between"
        style={{ paddingBottom: '20px' }}
      >
        <View>
          <Text className="text-xs text-[#6B5D52]">实付款</Text>
          <Text className="text-2xl font-bold text-[#8B2500]">¥{totalPrice}</Text>
        </View>
        <View
          className="bg-[#C9B78F] rounded-full px-8 py-3"
          onClick={handleSubmit}
        >
          <Text className="text-[#5D3A1A] text-base font-medium">提交订单</Text>
        </View>
      </View>
    </View>
  )
}

export default OrderConfirmPage
