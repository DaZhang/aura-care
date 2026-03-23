import { View, Text, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Ticket, Clock } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 优惠券状态标签
const TABS = [
  { id: 'available', name: '可用' },
  { id: 'used', name: '已使用' },
  { id: 'expired', name: '已过期' },
]

interface Coupon {
  id: string
  couponId: string
  name: string
  type: string // discount: 满减, percent: 折扣
  value: number
  minAmount: number
  startTime: string
  endTime: string
  status: string // unused, used, expired
  discountAmount?: number
}

const CouponPage: FC = () => {
  const [activeTab, setActiveTab] = useState('available')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      // 获取用户优惠券
      const res = await Network.request({
        url: '/api/coupon/my',
        data: { status: activeTab === 'available' ? 'unused' : activeTab }
      })
      console.log('优惠券数据:', res.data)
      setCoupons(res.data.data || [])

      // 如果是可用标签，还要获取可领取的优惠券
      if (activeTab === 'available') {
        const availRes = await Network.request({ url: '/api/coupon/available' })
        setAvailableCoupons(availRes.data.data || [])
      }
    } catch (error) {
      console.error('加载优惠券失败:', error)
      // 使用模拟数据
      setCoupons([
        {
          id: 'uc1',
          couponId: 'newuser',
          name: '新人专享券',
          type: 'discount',
          value: 50,
          minAmount: 100,
          startTime: '2024-01-01',
          endTime: '2025-12-31',
          status: 'unused',
        },
        {
          id: 'uc2',
          couponId: 'sale50',
          name: '满300减50',
          type: 'discount',
          value: 50,
          minAmount: 300,
          startTime: '2024-01-01',
          endTime: '2025-12-31',
          status: 'unused',
        },
      ])
    }
  }

  const handleReceiveCoupon = async (couponId: string) => {
    try {
      await Network.request({
        url: '/api/coupon/receive',
        method: 'POST',
        data: { couponId }
      })
      
      Taro.showToast({ title: '领取成功', icon: 'success' })
      loadData()
    } catch (error: any) {
      Taro.showToast({ 
        title: error.data?.message || '领取失败', 
        icon: 'none' 
      })
    }
  }

  const handleUseCoupon = (_coupon: Coupon) => {
    // 跳转到商品页面使用优惠券
    Taro.switchTab({ url: '/pages/index/index' })
  }

  const formatDate = (date: string) => {
    return date.replace(/-/g, '.')
  }

  const getCouponBg = (type: string, status: string) => {
    if (status !== 'unused') {
      return 'bg-gray-100'
    }
    return type === 'percent' ? 'bg-gradient-to-r from-[#B8860B] to-[#D4A84B]' : 'bg-gradient-to-r from-[#8B2500] to-[#A63D2B]'
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 顶部标签栏 */}
      <View className="bg-white px-4 py-3 flex border-b border-[#E5DDD3]">
        {TABS.map(tab => (
          <View
            key={tab.id}
            className={`flex-1 text-center py-2 ${activeTab === tab.id ? 'border-b-2 border-[#5D3A1A]' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Text className={activeTab === tab.id ? 'text-[#5D3A1A] font-medium' : 'text-[#6B5D52]'}>
              {tab.name}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className="px-4 py-4">
        {/* 可领取的优惠券 */}
        {activeTab === 'available' && availableCoupons.length > 0 && (
          <View className="mb-6">
            <Text className="text-base font-bold text-[#2C1810] mb-3">可领取</Text>
            {availableCoupons.map((coupon: any) => (
              <Card key={coupon.id} className="bg-white rounded-xl mb-3 overflow-hidden">
                <View className="flex">
                  {/* 左侧金额 */}
                  <View className={`w-24 flex flex-col items-center justify-center py-4 ${getCouponBg(coupon.type, 'unused')}`}>
                    <Text className="text-white text-xs">{coupon.type === 'percent' ? '折扣' : '满减'}</Text>
                    <View className="flex items-baseline">
                      <Text className="text-white text-xs">¥</Text>
                      <Text className="text-white text-2xl font-bold">{coupon.value}</Text>
                    </View>
                    <Text className="text-white text-xs opacity-80">满{coupon.minAmount}可用</Text>
                  </View>
                  
                  {/* 右侧信息 */}
                  <View className="flex-1 p-3 flex flex-col justify-between">
                    <View>
                      <Text className="text-sm font-medium text-[#2C1810]">{coupon.name}</Text>
                      <Text className="text-xs text-[#6B5D52] mt-1">{coupon.description}</Text>
                    </View>
                    <View className="flex items-center justify-between">
                      <Text className="text-xs text-[#8B7355]">{formatDate(coupon.startTime)} - {formatDate(coupon.endTime)}</Text>
                      <View
                        className="px-3 py-1 bg-[#C9B78F] rounded-full"
                        onClick={() => handleReceiveCoupon(coupon.id)}
                      >
                        <Text className="text-xs text-[#5D3A1A]">领取</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* 我的优惠券 */}
        <View>
          {activeTab === 'available' && coupons.length > 0 && (
            <Text className="text-base font-bold text-[#2C1810] mb-3">我的优惠券</Text>
          )}
          
          {coupons.length === 0 ? (
            <View className="flex flex-col items-center justify-center pt-20">
              <Ticket size={48} color="#D4C9B8" />
              <Text className="text-[#6B5D52] mt-4">
                {activeTab === 'available' ? '暂无可用优惠券' : 
                 activeTab === 'used' ? '暂无已使用优惠券' : '暂无已过期优惠券'}
              </Text>
              {activeTab === 'available' && (
                <View
                  className="mt-4 px-4 py-2 bg-[#C9B78F] rounded-full"
                  onClick={() => Taro.switchTab({ url: '/pages/index/index' })}
                >
                  <Text className="text-sm text-[#5D3A1A]">去逛逛</Text>
                </View>
              )}
            </View>
          ) : (
            coupons.map((coupon) => (
              <Card key={coupon.id} className="bg-white rounded-xl mb-3 overflow-hidden">
                <View className="flex">
                  {/* 左侧金额 */}
                  <View className={`w-24 flex flex-col items-center justify-center py-4 ${getCouponBg(coupon.type, coupon.status)}`}>
                    <Text className="text-white text-xs opacity-80">
                      {coupon.status === 'used' ? '已使用' : coupon.status === 'expired' ? '已过期' : coupon.type === 'percent' ? '折扣' : '满减'}
                    </Text>
                    <View className="flex items-baseline">
                      <Text className="text-white text-xs">¥</Text>
                      <Text className="text-white text-2xl font-bold">{coupon.value}</Text>
                    </View>
                    <Text className="text-white text-xs opacity-80">满{coupon.minAmount}可用</Text>
                  </View>
                  
                  {/* 右侧信息 */}
                  <View className="flex-1 p-3 flex flex-col justify-between">
                    <View>
                      <Text className="text-sm font-medium text-[#2C1810]">{coupon.name}</Text>
                      <View className="flex items-center mt-1">
                        <Clock size={12} color="#8B7355" />
                        <Text className="text-xs text-[#8B7355] ml-1">
                          {formatDate(coupon.startTime)} - {formatDate(coupon.endTime)}
                        </Text>
                      </View>
                    </View>
                    <View className="flex items-center justify-end">
                      {coupon.status === 'unused' ? (
                        <View
                          className="px-3 py-1 border border-[#5D3A1A] rounded-full"
                          onClick={() => handleUseCoupon(coupon)}
                        >
                          <Text className="text-xs text-[#5D3A1A]">立即使用</Text>
                        </View>
                      ) : (
                        <Text className="text-xs text-[#8B7355]">
                          {coupon.status === 'used' ? '已使用' : '已过期'}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default CouponPage
