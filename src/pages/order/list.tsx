import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState } from 'react'
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
      { 
        name: '平和养生手串', 
        price: 298, 
        quantity: 1, 
        image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
        bgColor: '#F5EFE0'
      }
    ],
    totalPrice: 298,
    createTime: '2024-01-15 10:30'
  },
  {
    id: 'ORD002',
    status: 'shipped',
    statusText: '待收货',
    products: [
      { 
        name: '补气安神手串', 
        price: 358, 
        quantity: 1, 
        image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
        bgColor: '#FAF0DC'
      }
    ],
    totalPrice: 358,
    createTime: '2024-01-18 14:20'
  },
  {
    id: 'ORD003',
    status: 'pending',
    statusText: '待付款',
    products: [
      { 
        name: '温阳暖身手串', 
        price: 328, 
        quantity: 2, 
        image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
        bgColor: '#F5E6E0'
      }
    ],
    totalPrice: 656,
    createTime: '2024-01-20 09:15'
  }
]

const OrdersPage: FC = () => {
  const [activeStatus, setActiveStatus] = useState('all')

  const handleStatusClick = (statusId: string) => {
    setActiveStatus(statusId)
  }

  const handleOrderClick = (orderId: string) => {
    Taro.navigateTo({ url: `/pages/order/detail?id=${orderId}` })
  }

  const handlePayClick = () => {
    Taro.showToast({ title: '支付功能开发中', icon: 'none' })
  }

  const handleConfirmReceive = () => {
    Taro.showModal({
      title: '确认收货',
      content: '确定已收到商品吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已确认收货', icon: 'success' })
        }
      }
    })
  }

  // 根据状态筛选订单
  const filteredOrders = activeStatus === 'all' 
    ? ORDERS 
    : ORDERS.filter(order => order.status === activeStatus)

  return (
    <View className="min-h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          我的订单
        </Text>
      </View>

      {/* 订单状态标签 */}
      <View className="flex justify-around py-3 border-b border-gray-100">
        {ORDER_STATUS.map((status) => (
          <View 
            key={status.id} 
            className="flex flex-col items-center"
            onClick={() => handleStatusClick(status.id)}
          >
            <Text 
              style={{ 
                fontSize: '14px', 
                fontWeight: 400,
                color: activeStatus === status.id ? '#5D3A1A' : '#666666',
                paddingBottom: '8px',
                borderBottomWidth: activeStatus === status.id ? '2px' : '0',
                borderBottomColor: '#5D3A1A'
              }}
            >
              {status.name}
            </Text>
          </View>
        ))}
      </View>

      {/* 订单列表 */}
      <ScrollView scrollY className="px-4 py-4" style={{ height: 'calc(100vh - 160px)' }}>
        {filteredOrders.length === 0 ? (
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
          filteredOrders.map((order) => (
            <View
              key={order.id}
              className="mb-4 bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              {/* 订单头部 */}
              <View 
                className="flex flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
                onClick={() => handleOrderClick(order.id)}
              >
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  订单号: {order.id}
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
                <View 
                  key={index} 
                  className="flex flex-row items-center px-4 py-3"
                  onClick={() => handleOrderClick(order.id)}
                >
                  {/* 商品图片 */}
                  <View 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: product.bgColor }}
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        className="w-12 h-12"
                        mode="aspectFit"
                      />
                    ) : (
                      <Package size={24} color="#8B7355" />
                    )}
                  </View>
                  
                  {/* 商品信息 */}
                  <View className="flex-1 ml-3">
                    <Text 
                      className="text-black"
                      style={{ fontSize: '15px', fontWeight: 400 }}
                    >
                      {product.name}
                    </Text>
                    <View className="flex flex-row items-center justify-between mt-2">
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
              <View className="flex flex-row items-center justify-between px-4 py-3 border-t border-gray-100">
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '14px', fontWeight: 300 }}
                >
                  共{order.products.reduce((sum, p) => sum + p.quantity, 0)}件
                </Text>
                <View className="flex flex-row items-center">
                  <Text 
                    className="text-[#8B7355]"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  >
                    合计：
                  </Text>
                  <Text 
                    className="text-[#5D3A1A]"
                    style={{ fontSize: '18px', fontWeight: 500 }}
                  >
                    ¥{order.totalPrice}
                  </Text>
                </View>
              </View>

              {/* 订单操作按钮 */}
              <View className="flex flex-row justify-end px-4 py-3 border-t border-gray-100">
                {order.status === 'pending' && (
                  <View
                    className="px-5 py-2 rounded-full"
                    style={{ backgroundColor: '#EBE3D5' }}
                    onClick={() => handlePayClick()}
                  >
                    <Text 
                      className="text-[#5D3A1A]"
                      style={{ fontSize: '14px', fontWeight: 400 }}
                    >
                      立即付款
                    </Text>
                  </View>
                )}
                {order.status === 'shipped' && (
                  <View
                    className="px-5 py-2 rounded-full border border-[#5D3A1A]"
                    onClick={() => handleConfirmReceive()}
                  >
                    <Text 
                      className="text-[#5D3A1A]"
                      style={{ fontSize: '14px', fontWeight: 400 }}
                    >
                      确认收货
                    </Text>
                  </View>
                )}
                {order.status === 'completed' && (
                  <View
                    className="px-5 py-2 rounded-full border border-gray-300"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <Text 
                      className="text-[#666666]"
                      style={{ fontSize: '14px', fontWeight: 400 }}
                    >
                      再次购买
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
        
        {/* 底部留白 */}
        <View className="h-8" />
      </ScrollView>
    </View>
  )
}

export default OrdersPage
