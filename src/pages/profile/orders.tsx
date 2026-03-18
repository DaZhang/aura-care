import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Clock, CircleCheck, Truck } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 图片资源
const IMAGES = {
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
}

// 订单状态
const ORDER_STATUS = {
  pending: { label: '待付款', color: '#E54B4B', icon: Clock },
  paid: { label: '已付款', color: '#F59E0B', icon: CircleCheck },
  shipped: { label: '已发货', color: '#8B5CF6', icon: Truck },
  completed: { label: '已完成', color: '#10B981', icon: CircleCheck },
}

// 模拟订单数据
const MOCK_ORDERS = [
  {
    id: 'ORD001',
    product: {
      name: '平和养生手串',
      image: IMAGES.braceletPeaceful,
      material: '紫檀木',
      engraving: '平安喜乐',
    },
    status: 'shipped' as keyof typeof ORDER_STATUS,
    price: 298,
    quantity: 1,
    createdAt: '2024-01-15 14:30',
    trackNo: 'SF1234567890',
  },
  {
    id: 'ORD002',
    product: {
      name: '补气安神手串',
      image: IMAGES.braceletQixu,
      material: '黄花梨',
      engraving: '',
    },
    status: 'completed' as keyof typeof ORDER_STATUS,
    price: 458,
    quantity: 1,
    createdAt: '2024-01-10 09:20',
    trackNo: 'YT9876543210',
  },
]

const OrdersPage: FC = () => {
  const [orders] = useState(MOCK_ORDERS)

  const handleOrderDetail = (orderId: string) => {
    Taro.showToast({ title: `查看订单 ${orderId}`, icon: 'none' })
  }

  const handlePay = () => {
    Taro.showToast({ title: '支付功能开发中', icon: 'none' })
  }

  const handleTrack = (trackNo: string) => {
    Taro.showToast({ title: `物流单号: ${trackNo}`, icon: 'none' })
  }

  const handleReorder = () => {
    Taro.navigateTo({ url: '/pages/customize/index' })
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5]">
      {/* 状态筛选 */}
      <View className="bg-white flex border-b border-gray-100">
        {['全部', '待付款', '待发货', '待收货', '已完成'].map((tab, index) => (
          <View
            key={tab}
            className={`flex-1 py-4 text-center ${index === 0 ? 'border-b-2 border-[#1D3A4C]' : ''}`}
          >
            <Text className={index === 0 ? 'text-[#1D3A4C] font-medium' : 'text-gray-600'}>
              {tab}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className="h-[calc(100vh-100px)] p-4">
        {orders.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-20">
            <Package size={64} color="#E0E0E0" />
            <Text className="mt-4 text-gray-500">暂无订单</Text>
          </View>
        ) : (
          <View className="space-y-4">
            {orders.map((order) => {
              const status = ORDER_STATUS[order.status]
              return (
                <Card
                  key={order.id}
                  className="bg-white rounded-2xl overflow-hidden"
                  onClick={() => handleOrderDetail(order.id)}
                >
                  <CardContent className="p-0">
                    {/* 订单头部 */}
                    <View className="flex items-center justify-between p-4 border-b border-gray-100">
                      <Text className="text-sm text-gray-500">{order.id}</Text>
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
                        src={order.product.image}
                        className="w-24 h-24 rounded-xl"
                        mode="aspectFill"
                      />
                      <View className="flex-1 ml-4">
                        <Text className="text-base font-medium text-gray-900 mb-2">
                          {order.product.name}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          材质: {order.product.material}
                        </Text>
                        {order.product.engraving && (
                          <Text className="text-sm text-gray-500">
                            刻字: {order.product.engraving}
                          </Text>
                        )}
                        <View className="flex items-baseline mt-2">
                          <Text className="text-lg font-bold text-[#E54B4B]">¥{order.price}</Text>
                          <Text className="text-sm text-gray-400 ml-2">x{order.quantity}</Text>
                        </View>
                      </View>
                    </View>

                    {/* 操作按钮 */}
                    <View className="flex items-center justify-end p-4 border-t border-gray-100">
                      {order.status === 'pending' && (
                        <Button
                          className="bg-[#E54B4B] text-white rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePay()
                          }}
                        >
                          立即支付
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          className="border border-[#1D3A4C] text-[#1D3A4C] rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTrack(order.trackNo)
                          }}
                        >
                          查看物流
                        </Button>
                      )}
                      {order.status === 'completed' && (
                        <Button
                          className="border border-gray-300 text-gray-600 rounded-full px-6 py-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReorder()
                          }}
                        >
                          再次购买
                        </Button>
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
