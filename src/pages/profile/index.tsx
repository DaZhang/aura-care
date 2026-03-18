import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { 
  Settings, 
  ChevronRight, 
  Package, 
  Heart, 
  Gift,
  Star,
  FileText,
  Award,
  Bell,
  Info,
  LogOut
} from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 用户数据
const mockUser = {
  nickname: '养生达人',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  constitution: '平和质',
  constitutionColor: '#10B981',
  points: 1280,
  level: '黄金会员',
  orderCount: { pending: 2, shipped: 1, completed: 5 },
}

// 菜单数据
const MENU_ITEMS = [
  { 
    id: 'orders', 
    icon: Package, 
    title: '我的订单', 
    desc: '查看所有订单',
    path: '/pages/profile/orders'
  },
  { 
    id: 'records', 
    icon: FileText, 
    title: '养生档案', 
    desc: '体质记录与调理建议',
    path: '/pages/profile/records'
  },
  { 
    id: 'favorites', 
    icon: Heart, 
    title: '我的收藏', 
    desc: '收藏的商品和内容',
    path: ''
  },
  { 
    id: 'points', 
    icon: Gift, 
    title: '积分商城', 
    desc: `当前积分: ${mockUser.points}`,
    path: ''
  },
]

const SETTING_ITEMS = [
  { id: 'settings', icon: Settings, title: '设置', path: '' },
  { id: 'notification', icon: Bell, title: '消息通知', path: '' },
  { id: 'help', icon: Info, title: '帮助与反馈', path: '' },
]

const ProfilePage: FC = () => {
  const [user] = useState(mockUser)

  const handleMenuClick = (path: string) => {
    if (path) {
      Taro.navigateTo({ url: path })
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  const handleOrderClick = (status: string) => {
    Taro.navigateTo({ url: `/pages/profile/orders?status=${status}` })
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5]">
      {/* 用户信息头部 */}
      <View className="bg-gradient-to-b from-[#1D3A4C] to-[#2D5A6C] px-4 pt-12 pb-8">
        <View className="flex items-center mb-6">
          <Image 
            src={user.avatar} 
            className="w-20 h-20 rounded-full border-4 border-white"
            style={{ opacity: 0.3 }}
          />
          <View className="ml-4 flex-1">
            <Text className="text-white text-xl font-bold">{user.nickname}</Text>
            <View className="flex items-center mt-2">
              <View 
                className="px-3 py-1 rounded-full mr-2"
                style={{ backgroundColor: `${user.constitutionColor}15` }}
              >
                <Text className="text-sm" style={{ color: user.constitutionColor }}>
                  {user.constitution}
                </Text>
              </View>
              <View className="flex items-center bg-white rounded-full px-3 py-1" style={{ opacity: 0.1 }}>
                <Award size={14} color="#D4AF37" />
                <Text className="text-white text-sm ml-1">{user.level}</Text>
              </View>
            </View>
          </View>
          <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ opacity: 0.1 }}>
            <Settings size={20} color="#fff" />
          </View>
        </View>

        {/* 会员积分 */}
        <View className="bg-white rounded-2xl p-4 flex items-center justify-between" style={{ opacity: 0.1 }}>
          <View className="flex items-center">
            <Star size={24} color="#D4AF37" />
            <View className="ml-3">
              <Text className="text-white text-lg font-bold">{user.points}</Text>
              <Text className="text-white text-xs" style={{ opacity: 0.7 }}>可用积分</Text>
            </View>
          </View>
          <View 
            className="bg-[#D4AF37] rounded-full px-4 py-2"
            onClick={() => handleMenuClick('')}
          >
            <Text className="text-white text-sm">积分兑换</Text>
          </View>
        </View>
      </View>

      <ScrollView scrollY className="h-[calc(100vh-280px)]">
        {/* 订单快捷入口 */}
        <View className="bg-white mx-4 -mt-4 rounded-2xl shadow-sm p-4 mb-4">
          <View className="flex items-center justify-between mb-4">
            <Text className="text-base font-bold text-gray-900">我的订单</Text>
            <View 
              className="flex items-center"
              onClick={() => handleOrderClick('all')}
            >
              <Text className="text-sm text-gray-500">全部订单</Text>
              <ChevronRight size={16} color="#999" />
            </View>
          </View>
          <View className="flex justify-around">
            <View className="flex flex-col items-center relative"
              onClick={() => handleOrderClick('pending')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#E54B4B15' }}>
                <Package size={20} color="#E54B4B" />
              </View>
              <Text className="text-xs text-gray-600">待付款</Text>
              {user.orderCount.pending > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E54B4B] flex items-center justify-center">
                  <Text className="text-white text-xs">{user.orderCount.pending}</Text>
                </View>
              )}
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('shipped')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#F59E0B15' }}>
                <Package size={20} color="#F59E0B" />
              </View>
              <Text className="text-xs text-gray-600">待收货</Text>
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('completed')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#10B98115' }}>
                <Package size={20} color="#10B981" />
              </View>
              <Text className="text-xs text-gray-600">已完成</Text>
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('review')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#8B5CF615' }}>
                <Star size={20} color="#8B5CF6" />
              </View>
              <Text className="text-xs text-gray-600">待评价</Text>
            </View>
          </View>
        </View>

        {/* 功能菜单 */}
        <View className="bg-white mx-4 rounded-2xl shadow-sm mb-4 overflow-hidden">
          {MENU_ITEMS.map((item, index) => (
            <View
              key={item.id}
              className={`flex items-center p-4 ${index !== MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}
              onClick={() => handleMenuClick(item.path)}
            >
              <View className="w-10 h-10 rounded-full bg-[#1D3A4C] flex items-center justify-center mr-3" style={{ opacity: 0.1 }}>
                <item.icon size={20} color="#1D3A4C" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">{item.title}</Text>
                <Text className="text-xs text-gray-500 mt-1">{item.desc}</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </View>
          ))}
        </View>

        {/* 设置菜单 */}
        <View className="bg-white mx-4 rounded-2xl shadow-sm mb-4 overflow-hidden">
          {SETTING_ITEMS.map((item, index) => (
            <View
              key={item.id}
              className={`flex items-center p-4 ${index !== SETTING_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}
              onClick={() => handleMenuClick(item.path)}
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <item.icon size={20} color="#666" />
              </View>
              <Text className="flex-1 text-base text-gray-900">{item.title}</Text>
              <ChevronRight size={20} color="#999" />
            </View>
          ))}
        </View>

        {/* 退出登录 */}
        <View className="px-4 mb-8">
          <View className="bg-white rounded-2xl p-4 flex items-center justify-center">
            <LogOut size={20} color="#E54B4B" />
            <Text className="text-[#E54B4B] ml-2">退出登录</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfilePage
