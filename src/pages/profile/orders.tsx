import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Clock, CircleCheck, Truck } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 图片资源
const IMAGES = {
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
}

// 订单状态
const ORDER_STATUS = {
  pending: { label: '待付款', color: '#8B2500', icon: Clock },
  paid: { label: '已付款', color: '#CC7722', icon: CircleCheck },
  shipped: { label: '已发货', color: '#5D4E37', icon: Truck },
  completed: { label: '已完成', color: '#2E8B57', icon: CircleCheck },
}

// 订单数据类型 - 适配后端格式
interface OrderProduct {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  customOptions?: string
  constitution?: string
}

interface OrderItem {
  id: string
  userId: string
  products: OrderProduct[]
  status: 'pending' | 'paid' | 'shipped' | 'completed'
  priceInfo: {
    totalAmount: number
    shippingFee: number
    discountAmount: number
  }
  address: {
    name: string
    phone: string
    province: string
    city: string
    district: string
    detail: string
  }
  createTime: string
  updateTime: string
  logistics?: {
    trackNo: string
    company: string
  }
}

// 模拟订单数据
const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ORD001',
    userId: 'user001',
    products: [{
      id: 'peaceful',
      name: '平和养生手串',
      image: IMAGES.braceletPeaceful,
      price: 298,
      quantity: 1,
      customOptions: '檀香木 | 10mm | 单圈'
    }],
    status: 'pending',
    priceInfo: { totalAmount: 310, shippingFee: 12, discountAmount: 0 },
    address: { name: '张三', phone: '13800138000', province: '北京市', city: '北京市', district: '朝阳区', detail: '雍和大厦F-7' },
    createTime: '2024-01-18 14:30',
    updateTime: '2024-01-18 14:30'
  },
  {
    id: 'ORD002',
    userId: 'user001',
    products: [{
      id: 'qixu',
      name: '补气安神手串',
      image: IMAGES.braceletQixu,
      price: 458,
      quantity: 1,
      customOptions: '黄花梨 | 12mm | 单圈'
    }],
    status: 'paid',
    priceInfo: { totalAmount: 458, shippingFee: 0, discountAmount: 0 },
    address: { name: '张三', phone: '13800138000', province: '北京市', city: '北京市', district: '朝阳区', detail: '雍和大厦F-7' },
    createTime: '2024-01-17 09:20',
    updateTime: '2024-01-17 10:00'
  },
  {
    id: 'ORD003',
    userId: 'user001',
    products: [{
      id: 'peaceful',
      name: '平和养生手串',
      image: IMAGES.braceletPeaceful,
      price: 298,
      quantity: 1,
      customOptions: '檀香木 | 10mm | 单圈'
    }],
    status: 'shipped',
    priceInfo: { totalAmount: 310, shippingFee: 12, discountAmount: 0 },
    address: { name: '张三', phone: '13800138000', province: '北京市', city: '北京市', district: '朝阳区', detail: '雍和大厦F-7' },
    createTime: '2024-01-15 14:30',
    updateTime: '2024-01-15 14:30',
    logistics: { trackNo: 'SF1234567890', company: '顺丰快递' }
  },
  {
    id: 'ORD004',
    userId: 'user001',
    products: [{
      id: 'qixu',
      name: '补气安神手串',
      image: IMAGES.braceletQixu,
      price: 458,
      quantity: 1,
      customOptions: '黄花梨 | 12mm | 单圈'
    }],
    status: 'completed',
    priceInfo: { totalAmount: 458, shippingFee: 0, discountAmount: 0 },
    address: { name: '张三', phone: '13800138000', province: '北京市', city: '北京市', district: '朝阳区', detail: '雍和大厦F-7' },
    createTime: '2024-01-10 09:20',
    updateTime: '2024-01-10 09:20',
    logistics: { trackNo: 'YT9876543210', company: '圆通快递' }
  },
]

const OrdersPage: FC = () => {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS)
  const [currentTab, setCurrentTab] = useState(0)
  const [loading, setLoading] = useState(false)

  const tabs = ['全部', '待付款', '待发货', '待收货', '已完成']
  const statusMap: Record<number, string | undefined> = {
    1: 'pending',
    2: 'paid',
    3: 'shipped',
    4: 'completed',
  }

  useEffect(() => {
    // 从路由参数获取初始状态
    const status = router.params.status
    if (status === 'pending') {
      setCurrentTab(1)
    } else if (status === 'shipped') {
      setCurrentTab(3)
    } else if (status === 'completed') {
      setCurrentTab(4)
    }
  }, [router.params])

  // 获取订单列表
  const fetchOrders = async (status?: string) => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/order/list',
        method: 'GET',
        data: { userId: 'user001', status: status || 'all' }
      })
      console.log('[OrdersPage] fetchOrders response:', res.data)
      if (res.data?.code === 200) {
        // 兼容两种数据格式：{ data: [...] } 和 { data: { list: [...] } }
        const orderList = Array.isArray(res.data.data) 
          ? res.data.data 
          : (res.data.data?.list || [])
        console.log('[OrdersPage] orderList:', orderList)
        if (orderList.length > 0) {
          setOrders(orderList)
        } else {
          // 如果API返回空，使用模拟数据
          console.log('[OrdersPage] 使用模拟数据')
          setOrders(MOCK_ORDERS)
        }
      } else {
        // API失败时使用模拟数据
        setOrders(MOCK_ORDERS)
      }
    } catch (error) {
      console.error('[OrdersPage] fetchOrders error:', error)
      // 出错时使用模拟数据
      setOrders(MOCK_ORDERS)
    } finally {
      setLoading(false)
    }
  }

  const handleTabClick = (index: number) => {
    setCurrentTab(index)
    fetchOrders(statusMap[index])
  }

  const handleOrderDetail = (orderId: string) => {
    Taro.showModal({
      title: '订单详情',
      content: `订单号: ${orderId}\n\n订单详情页面开发中...`,
      showCancel: false
    })
  }

  // 支付功能
  const handlePay = async (orderId: string) => {
    Taro.showModal({
      title: '确认支付',
      content: '确定要支付该订单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            Taro.showLoading({ title: '支付中...' })
            const payRes = await Network.request({
              url: '/api/order/pay',
              method: 'POST',
              data: { orderId }
            })
            console.log('[OrdersPage] payOrder response:', payRes.data)
            Taro.hideLoading()
            
            if (payRes.data?.code === 200) {
              Taro.showToast({ title: '支付成功', icon: 'success' })
              // 刷新订单列表
              fetchOrders(statusMap[currentTab])
            } else {
              Taro.showToast({ title: payRes.data?.message || '支付失败', icon: 'none' })
            }
          } catch (error) {
            Taro.hideLoading()
            console.error('[OrdersPage] payOrder error:', error)
            Taro.showToast({ title: '支付失败，请重试', icon: 'none' })
          }
        }
      }
    })
  }

  // 查看物流
  const handleTrack = (trackNo: string) => {
    Taro.showModal({
      title: '物流信息',
      content: `物流单号: ${trackNo}\n\n物流详情页面开发中...`,
      showCancel: false
    })
  }

  // 再次购买
  const handleReorder = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  // 过滤订单
  const filteredOrders = currentTab === 0 
    ? orders 
    : orders.filter(o => o.status === statusMap[currentTab] && statusMap[currentTab] !== undefined)

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 状态筛选 */}
      <View className="bg-white flex border-b border-[#E5DDD3]">
        {tabs.map((tab, index) => (
          <View
            key={tab}
            className={`flex-1 py-4 text-center ${index === currentTab ? 'border-b-2 border-[#5D3A1A]' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <Text className={index === currentTab ? 'text-[#5D3A1A] font-medium' : 'text-[#6B5D52]'}>
              {tab}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className="h-[calc(100vh-100px)] p-4">
        {loading ? (
          <View className="flex flex-col items-center justify-center py-20">
            <Text className="text-[#6B5D52]">加载中...</Text>
          </View>
        ) : filteredOrders.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-20">
            <Package size={64} color="#D4C4B0" />
            <Text className="mt-4 text-[#6B5D52]">暂无订单</Text>
          </View>
        ) : (
          <View className="space-y-4">
            {filteredOrders.map((order) => {
              const status = ORDER_STATUS[order.status]
              return (
                <Card
                  key={order.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E5DDD3]"
                  onClick={() => handleOrderDetail(order.id)}
                >
                  <CardContent className="p-0">
                    {/* 订单头部 */}
                    <View className="flex items-center justify-between p-4 border-b border-[#E5DDD3]">
                      <Text className="text-sm text-[#6B5D52]">{order.id}</Text>
                      <View className="flex items-center">
                        <status.icon size={14} color={status.color} />
                        <Text className="ml-1 text-sm font-medium" style={{ color: status.color }}>
                          {status.label}
                        </Text>
                      </View>
                    </View>

                    {/* 商品信息 */}
                    <View className="flex p-4">
                      <Image
                        src={order.products[0]?.image || IMAGES.braceletPeaceful}
                        className="w-24 h-24 rounded-xl"
                        mode="aspectFill"
                      />
                      <View className="flex-1 ml-4">
                        <Text className="text-base font-medium text-[#2C1810] mb-2">
                          {order.products[0]?.name || '养生手串'}
                        </Text>
                        <Text className="text-sm text-[#6B5D52]">
                          {order.products[0]?.customOptions || '精选材质'}
                        </Text>
                        <View className="flex items-baseline mt-2">
                          <Text className="text-lg font-bold text-[#8B2500]">¥{order.priceInfo?.totalAmount || 0}</Text>
                          <Text className="text-sm text-[#8B7355] ml-2">x{order.products[0]?.quantity || 1}</Text>
                        </View>
                      </View>
                    </View>

                    {/* 操作按钮 */}
                    <View className="flex items-center justify-end p-4 border-t border-[#E5DDD3] gap-3">
                      {order.status === 'pending' && (
                        <View
                          className="bg-[#8B2500] rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePay(order.id)
                          }}
                        >
                          <Text className="text-white text-sm font-medium">立即支付</Text>
                        </View>
                      )}
                      {order.status === 'shipped' && order.logistics && (
                        <View
                          className="border border-[#5D3A1A] rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTrack(order.logistics?.trackNo || '')
                          }}
                        >
                          <Text className="text-[#5D3A1A] text-sm font-medium">查看物流</Text>
                        </View>
                      )}
                      {order.status === 'completed' && (
                        <View
                          className="border border-[#D4C4B0] rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReorder()
                          }}
                        >
                          <Text className="text-[#6B5D52] text-sm font-medium">再次购买</Text>
                        </View>
                      )}
                    </View>
                  </CardContent>
                </Card>
              )
            })}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default OrdersPage
