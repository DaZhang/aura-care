import { View, Text, ScrollView } from '@tarojs/components'
import { Ticket } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 模拟优惠券数据
const COUPONS = [
  {
    id: '1',
    title: '新人专享券',
    discount: 50,
    minAmount: 200,
    validDate: '2024.03.31',
    status: 'valid',
    bgColor: '#F5EFE0'
  },
  {
    id: '2',
    title: '养生手串专享',
    discount: 30,
    minAmount: 100,
    validDate: '2024.02.28',
    status: 'valid',
    bgColor: '#E8F0E8'
  },
  {
    id: '3',
    title: '满减优惠券',
    discount: 20,
    minAmount: 150,
    validDate: '2024.01.31',
    status: 'expired',
    bgColor: '#F5F5F5'
  }
]

const CouponListPage: FC = () => {
  const handleUseCoupon = (_couponId: string) => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 优惠券统计 */}
      <View className="px-6 py-6" style={{ backgroundColor: '#C9B78F' }}>
        <Text 
          className="text-white opacity-80"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          可用优惠券
        </Text>
        <Text 
          className="text-white mt-1"
          style={{ fontSize: '32px', fontWeight: 400 }}
        >
          {COUPONS.filter(c => c.status === 'valid').length} 张
        </Text>
      </View>

      {/* 优惠券列表 */}
      <View className="px-6 py-4">
        {COUPONS.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-20">
            <Ticket size={48} color="#D4D4D4" />
            <Text 
              className="text-[#8B7355] mt-4"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              暂无优惠券
            </Text>
          </View>
        ) : (
          COUPONS.map((coupon) => (
            <View
              key={coupon.id}
              className="mb-4 p-4 rounded-2xl flex items-center"
              style={{ backgroundColor: coupon.bgColor }}
            >
              {/* 优惠金额 */}
              <View className="flex flex-col items-center justify-center w-24">
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '32px', fontWeight: 400 }}
                >
                  ¥{coupon.discount}
                </Text>
                <Text 
                  className="text-[#8B7355]"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  满{coupon.minAmount}可用
                </Text>
              </View>

              {/* 分割线 */}
              <View className="w-px h-16 bg-gray-200 mx-4" />

              {/* 优惠券信息 */}
              <View className="flex-1">
                <Text 
                  className="text-black"
                  style={{ fontSize: '16px', fontWeight: 400 }}
                >
                  {coupon.title}
                </Text>
                <Text 
                  className="text-[#8B7355] mt-2"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  有效期至 {coupon.validDate}
                </Text>
              </View>

              {/* 使用按钮 */}
              {coupon.status === 'valid' && (
                <View
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: '#C9B78F' }}
                  onClick={() => handleUseCoupon(coupon.id)}
                >
                  <Text 
                    className="text-[#5D3A1A]"
                    style={{ fontSize: '12px', fontWeight: 400 }}
                  >
                    去使用
                  </Text>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default CouponListPage
