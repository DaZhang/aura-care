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
  constitutionColor: '#5D4E37',
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
    action: 'orders'
  },
  { 
    id: 'records', 
    icon: FileText, 
    title: '养生档案', 
    desc: '体质记录与调理建议',
    action: 'records'
  },
  { 
    id: 'favorites', 
    icon: Heart, 
    title: '我的收藏', 
    desc: '收藏的商品和内容',
    action: 'favorites'
  },
  { 
    id: 'points', 
    icon: Gift, 
    title: '积分商城', 
    desc: `当前积分: ${mockUser.points}`,
    action: 'points'
  },
]

const SETTING_ITEMS = [
  { id: 'settings', icon: Settings, title: '设置', action: 'settings' },
  { id: 'notification', icon: Bell, title: '消息通知', action: 'notification' },
  { id: 'help', icon: Info, title: '帮助与反馈', action: 'help' },
]

const ProfilePage: FC = () => {
  const [user] = useState(mockUser)

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'orders':
        Taro.navigateTo({ url: '/pages/profile/orders' })
        break
      case 'records':
        // 养生档案 - 显示体质档案信息
        Taro.showModal({
          title: '我的养生档案',
          content: `您的体质类型: ${user.constitution}\n\n根据中医九种体质辨证，建议您：\n• 保持规律作息\n• 饮食清淡均衡\n• 适度运动锻炼\n\n您的专属养生手串正在为您调理体质中~`,
          showCancel: false,
          confirmText: '我知道了'
        })
        break
      case 'favorites':
        // 我的收藏
        Taro.showModal({
          title: '我的收藏',
          content: '您还没有收藏任何商品，快去挑选心仪的养生手串吧！',
          confirmText: '去逛逛',
          cancelText: '稍后再说',
          success: (res) => {
            if (res.confirm) {
              Taro.switchTab({ url: '/pages/customize/index' })
            }
          }
        })
        break
      case 'points':
        // 积分商城
        Taro.showModal({
          title: '积分商城',
          content: `当前积分: ${user.points}\n\n可用积分兑换：\n• 50积分 = 5元优惠券\n• 100积分 = 免运费券\n• 200积分 = 定制刻字服务\n\n积分可通过购买、签到、分享获得`,
          confirmText: '立即兑换',
          cancelText: '稍后再说',
          success: (res) => {
            if (res.confirm) {
              Taro.showToast({ title: '积分兑换功能开发中', icon: 'none' })
            }
          }
        })
        break
      case 'settings':
        Taro.showModal({
          title: '设置',
          content: '设置功能开发中，敬请期待！',
          showCancel: false
        })
        break
      case 'notification':
        Taro.showModal({
          title: '消息通知',
          content: '暂无新消息',
          showCancel: false
        })
        break
      case 'help':
        Taro.showModal({
          title: '帮助与反馈',
          content: '如有任何问题或建议，请联系客服：\n\n电话: 400-888-8888\n微信: huaye_wellness\n工作时间: 9:00-18:00',
          showCancel: false
        })
        break
      default:
        Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  const handleOrderClick = (status: string) => {
    Taro.navigateTo({ url: `/pages/profile/orders?status=${status}` })
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 用户信息头部 */}
      <View className="bg-gradient-to-b from-[#5D3A1A] to-[#8B5A2B] px-4 pt-12 pb-8 relative overflow-hidden">
        {/* 东方装饰元素 */}
        <View className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#D4AF37] opacity-10" style={{ transform: 'translate(30%, -30%)' }} />
        <View className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#8B2500] opacity-10" style={{ transform: 'translate(-40%, 40%)' }} />
        
        <View className="flex items-center mb-6 relative z-10">
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
        <View className="bg-white rounded-2xl p-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <View className="flex items-center">
            <Star size={24} color="#D4AF37" />
            <View className="ml-3">
              <Text className="text-white text-lg font-bold">{user.points}</Text>
              <Text className="text-white text-xs" style={{ opacity: 0.7 }}>可用积分</Text>
            </View>
          </View>
          <View 
            className="bg-[#D4AF37] rounded-full px-4 py-2"
            onClick={() => handleMenuClick('points')}
          >
            <Text className="text-white text-sm">积分兑换</Text>
          </View>
        </View>
      </View>

      <ScrollView scrollY className="h-[calc(100vh-280px)]">
        {/* 订单快捷入口 */}
        <View className="bg-white mx-4 -mt-4 rounded-2xl shadow-sm p-4 mb-4">
          <View className="flex items-center justify-between mb-4">
            <Text className="text-base font-bold text-[#2C1810]">我的订单</Text>
            <View 
              className="flex items-center"
              onClick={() => handleOrderClick('all')}
            >
              <Text className="text-sm text-[#6B5D52]">全部订单</Text>
              <ChevronRight size={16} color="#8B7355" />
            </View>
          </View>
          <View className="flex justify-around">
            <View className="flex flex-col items-center relative"
              onClick={() => handleOrderClick('pending')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#8B250015' }}>
                <Package size={20} color="#8B2500" />
              </View>
              <Text className="text-xs text-[#3D2B1F]">待付款</Text>
              {user.orderCount.pending > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8B2500] flex items-center justify-center">
                  <Text className="text-white text-xs">{user.orderCount.pending}</Text>
                </View>
              )}
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('shipped')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#CC772215' }}>
                <Package size={20} color="#CC7722" />
              </View>
              <Text className="text-xs text-[#3D2B1F]">待收货</Text>
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('completed')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#5D4E3715' }}>
                <Package size={20} color="#5D4E37" />
              </View>
              <Text className="text-xs text-[#3D2B1F]">已完成</Text>
            </View>
            <View className="flex flex-col items-center"
              onClick={() => handleOrderClick('review')}
            >
              <View className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#4A657215' }}>
                <Star size={20} color="#4A6572" />
              </View>
              <Text className="text-xs text-[#3D2B1F]">待评价</Text>
            </View>
          </View>
        </View>

        {/* 功能菜单 */}
        <View className="bg-white mx-4 rounded-2xl shadow-sm mb-4 overflow-hidden">
          {MENU_ITEMS.map((item, index) => (
            <View
              key={item.id}
              className={`flex items-center p-4 ${index !== MENU_ITEMS.length - 1 ? 'border-b border-[#E5DDD3]' : ''}`}
              onClick={() => handleMenuClick(item.action)}
            >
              <View className="w-10 h-10 rounded-full bg-[#5D3A1A] flex items-center justify-center mr-3" style={{ opacity: 0.1 }}>
                <item.icon size={20} color="#5D3A1A" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-[#2C1810]">{item.title}</Text>
                <Text className="text-xs text-[#6B5D52] mt-1">{item.desc}</Text>
              </View>
              <ChevronRight size={20} color="#8B7355" />
            </View>
          ))}
        </View>

        {/* 设置菜单 */}
        <View className="bg-white mx-4 rounded-2xl shadow-sm mb-4 overflow-hidden">
          {SETTING_ITEMS.map((item, index) => (
            <View
              key={item.id}
              className={`flex items-center p-4 ${index !== SETTING_ITEMS.length - 1 ? 'border-b border-[#E5DDD3]' : ''}`}
              onClick={() => handleMenuClick(item.action)}
            >
              <View className="w-10 h-10 rounded-full bg-[#F7F4ED] flex items-center justify-center mr-3">
                <item.icon size={20} color="#5D4E37" />
              </View>
              <Text className="flex-1 text-base text-[#2C1810]">{item.title}</Text>
              <ChevronRight size={20} color="#8B7355" />
            </View>
          ))}
        </View>

        {/* 退出登录 */}
        <View className="px-4 mb-8">
          <View 
            className="bg-white rounded-2xl p-4 flex items-center justify-center"
            onClick={() => {
              Taro.showModal({
                title: '提示',
                content: '确定要退出登录吗？',
                success: (res) => {
                  if (res.confirm) {
                    Taro.showToast({ title: '已退出登录', icon: 'success' })
                  }
                }
              })
            }}
          >
            <LogOut size={20} color="#8B2500" />
            <Text className="text-[#8B2500] ml-2">退出登录</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfilePage
