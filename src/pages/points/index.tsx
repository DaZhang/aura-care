import { View, Text, ScrollView } from '@tarojs/components'
import { Coins, Gift, ArrowUpRight, ArrowDownRight, Calendar, Share2 } from 'lucide-react-taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 积分记录
const POINTS_RECORDS = [
  { id: '1', type: 'earn', title: '购买商品', points: 100, date: '2024-01-15' },
  { id: '2', type: 'earn', title: '每日签到', points: 10, date: '2024-01-14' },
  { id: '3', type: 'spend', title: '积分抵扣', points: -50, date: '2024-01-13' },
  { id: '4', type: 'earn', title: '分享好友', points: 20, date: '2024-01-12' },
  { id: '5', type: 'earn', title: '购买商品', points: 80, date: '2024-01-10' },
  { id: '6', type: 'spend', title: '积分抵扣', points: -100, date: '2024-01-08' },
]

const PointsPage: FC = () => {
  const [points, setPoints] = useState(1280)

  useEffect(() => {
    loadPoints()
  }, [])

  const loadPoints = async () => {
    try {
      const res = await Network.request({ url: '/api/user/points' })
      if (res.data?.code === 200) {
        setPoints(res.data.data || 0)
      }
    } catch (error) {
      console.error('加载积分失败:', error)
    }
  }

  const handleShopClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  const handleExchangeClick = () => {
    Taro.navigateTo({ url: '/pages/coupon/list' })
  }

  const handleSignInClick = () => {
    Taro.showToast({ title: '签到成功 +10积分', icon: 'success' })
  }

  const handleShareClick = () => {
    Taro.showToast({ title: '分享成功 +20积分', icon: 'success' })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 积分概览 */}
      <View className="px-6 py-8" style={{ backgroundColor: '#5D3A1A' }}>
        <Text 
          className="text-white opacity-80"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          我的积分
        </Text>
        <View className="flex items-baseline mt-2">
          <Text 
            className="text-white"
            style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '2px' }}
          >
            {points}
          </Text>
        </View>
        <Text 
          className="text-white opacity-60 mt-2"
          style={{ fontSize: '12px', fontWeight: 300 }}
        >
          100积分 = 1元，可在结算时抵扣
        </Text>
      </View>

      {/* 积分说明 */}
      <View className="px-6 py-4">
        <View className="flex justify-around">
          <View 
            className="flex flex-col items-center"
            onClick={handleShopClick}
          >
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFE0' }}>
              <Coins size={22} color="#5D3A1A" />
            </View>
            <Text className="text-black mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              购物得积分
            </Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleExchangeClick}
          >
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F0E8' }}>
              <Gift size={22} color="#4A5D4A" />
            </View>
            <Text className="text-black mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              积分兑换
            </Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleSignInClick}
          >
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5E6E0' }}>
              <Calendar size={22} color="#8B2500" />
            </View>
            <Text className="text-black mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              每日签到
            </Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleShareClick}
          >
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8EEF2' }}>
              <Share2 size={22} color="#4A6572" />
            </View>
            <Text className="text-black mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              分享好友
            </Text>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 积分明细 */}
      <View className="px-6 py-4">
        <Text 
          className="text-black mb-4"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
        >
          积分明细
        </Text>
        
        {POINTS_RECORDS.map((record) => (
          <View
            key={record.id}
            className="flex items-center justify-between py-4 border-b border-gray-100"
          >
            <View className="flex items-center">
              <View 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: record.type === 'earn' ? '#E8F0E8' : '#F5E6E0' }}
              >
                {record.type === 'earn' ? (
                  <ArrowUpRight size={18} color="#4A5D4A" />
                ) : (
                  <ArrowDownRight size={18} color="#A63D2B" />
                )}
              </View>
              <View className="ml-3">
                <Text 
                  className="text-black"
                  style={{ fontSize: '15px', fontWeight: 400 }}
                >
                  {record.title}
                </Text>
                <Text 
                  className="text-[#999999] mt-1"
                  style={{ fontSize: '12px', fontWeight: 300 }}
                >
                  {record.date}
                </Text>
              </View>
            </View>
            <Text 
              style={{ 
                fontSize: '16px', 
                fontWeight: 400,
                color: record.type === 'earn' ? '#4A5D4A' : '#A63D2B'
              }}
            >
              {record.type === 'earn' ? '+' : ''}{record.points}
            </Text>
          </View>
        ))}
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default PointsPage
