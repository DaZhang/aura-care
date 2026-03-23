import { View, Text, ScrollView } from '@tarojs/components'
import { Package } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 订单状态
const ORDER_STATUS = [
  { id: 'all', name: '全部' },
  { id: 'pending', name: '待付款' },
  { id: 'paid', name: '待发货' },
  { id: 'shipped', name: '待收货' },
  { id: 'completed', name: '已完成' }
]

// 模拟订单数据
const ORDERS = [
  {
    id: 'ORD001',
    status: 'completed',
    statusText: '已完成',
    products: [
      { name: '平和养生手串', price: 298, quantity: 1, image: '' }
    ],
    totalPrice: 298,
    createTime: '2024-01-15 10:30'
  },
  {
    id: 'ORD002',
    status: 'shipped',
    statusText: '待收货',
    products: [
      { name: '补气安神手串', price: 358, quantity: 1, image: '' }
    ],
    totalPrice: 358,
    createTime: '2024-01-18 14:20'
  }
]

const OrdersPage: FC = () => {
  const handleOrderClick = (_orderId: string) => {
    Taro.showToast({ title: '订单详情开发中', icon: 'none' })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 订单状态标签 */}
      <View className="flex justify-around py-4 border-b border-gray-100">
        {ORDER_STATUS.map((status) => (
          <View key={status.id} className="flex flex-col items-center">
            <Text 
              className="text-black"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              {status.name}
            </Text>
          </View>
        ))}
      </View>

      {/* 订单列表 */}
      <View className="px-6 py-4">
        {ORDERS.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-20">
            <Package size={48} color="#D4D4D4" />
            <Text 
              className="text-[#8B7355] mt-4"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              暂无订单
            </Text>
          </View>
        ) : (
          ORDERS.map((order) => (
            <View
              key={order.id}
              className="mb-4 p-4 rounded-2xl border border-gray-100"
              onClick={() => handleOrderClick(order.id)}
            >
              {/* 订单头部 */}
              <View className="flex items-center justify-between mb-3">
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  {order.createTime}
                </Text>
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '14px', fontWeight: 400 }}
                >
                  {order.statusText}
                </Text>
              </View>

              {/* 商品列表 */}
              {order.products.map((product, index) => (
                <View key={index} className="flex items-center py-3 border-t border-gray-100">
                  <View className="flex-1">
                    <Text 
                      className="text-black"
                      style={{ fontSize: '15px', fontWeight: 400 }}
                    >
                      {product.name}
                    </Text>
                    <View className="flex items-center justify-between mt-2">
                      <Text 
                        className="text-[#8B7355]"
                        style={{ fontSize: '12px', fontWeight: 300 }}
                      >
                        x{product.quantity}
                      </Text>
                      <Text 
                        className="text-[#5D3A1A]"
                        style={{ fontSize: '16px', fontWeight: 400 }}
                      >
                        ¥{product.price}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* 订单总价 */}
              <View className="flex items-center justify-end pt-3 border-t border-gray-100">
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '14px', fontWeight: 300 }}
                >
                  共{order.products.reduce((sum, p) => sum + p.quantity, 0)}件，合计：
                </Text>
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '18px', fontWeight: 400 }}
                >
                  ¥{order.totalPrice}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default OrdersPage
