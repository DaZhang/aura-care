import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Settings, ScrollText, Ticket, Coins, HandHelping, ChevronRight, Flower2, Leaf, Sparkles } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

interface UserInfo {
  nickname: string
  avatar: string
  constitution: string
  points: number
  level: string
}

const ProfilePage: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '健康养生',
    avatar: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    constitution: '平和质',
    points: 1280,
    level: '会员'
  })

  // 个性化菜单图标 - 中医养生主题
  const menuItems = [
    { 
      icon: ScrollText, 
      title: '我的订单', 
      desc: '查看订单状态', 
      path: '/pages/order/list',
      bgColor: '#F5EFE0',
      iconColor: '#5D4E37'
    },
    { 
      icon: Ticket, 
      title: '我的优惠券', 
      desc: '查看可用优惠', 
      path: '/pages/coupon/list',
      bgColor: '#FBF5E6',
      iconColor: '#B8860B'
    },
    { 
      icon: Coins, 
      title: '我的积分', 
      desc: `${userInfo.points} 积分`, 
      path: '/pages/points/index',
      bgColor: '#F5EEF5',
      iconColor: '#8B668B'
    },
    { 
      icon: Flower2, 
      title: '我的体质', 
      desc: '查看体质报告', 
      path: '/pages/test/result',
      bgColor: '#E8F0E8',
      iconColor: '#4A5D4A'
    },
    { 
      icon: Leaf, 
      title: '养生知识', 
      desc: '中医养生指南', 
      path: '/pages/knowledge/index',
      bgColor: '#EEF2E8',
      iconColor: '#5C6B4E'
    },
    { 
      icon: Sparkles, 
      title: '专属定制', 
      desc: '一人一手串', 
      path: '/pages/test/index',
      bgColor: '#E8EEF2',
      iconColor: '#4A6572'
    },
    { 
      icon: HandHelping, 
      title: '帮助中心', 
      desc: '常见问题解答', 
      path: '/pages/help/index',
      bgColor: '#F5E6E0',
      iconColor: '#A63D2B'
    },
  ]

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    try {
      const res = await Network.request({ url: '/api/user/info' })
      if (res.data?.code === 200 && res.data.data) {
        setUserInfo(res.data.data)
      }
    } catch (error) {
      console.error('加载用户信息失败:', error)
    }
  }

  const handleMenuClick = (path: string) => {
    Taro.navigateTo({ url: path })
  }

  const handleSettingsClick = () => {
    Taro.navigateTo({ url: '/pages/settings/index' })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部留白 */}
      <View className="h-8" />

      {/* 用户信息模块 - 水墨风格 */}
      <View className="px-6 py-6">
        <View className="flex items-start">
          {/* 左侧用户信息 */}
          <View className="flex-1">
            {/* 用户昵称 */}
            <Text 
              className="text-black"
              style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
            >
              {userInfo.nickname}
            </Text>
            
            {/* 体质标签 */}
            <View className="mt-3">
              <Text 
                className="text-[#5D3A1A]"
                style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
              >
                {userInfo.constitution}
              </Text>
            </View>
            
            {/* 会员信息 */}
            <Text 
              className="text-[#8B7355] mt-2"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              {userInfo.level}
            </Text>
          </View>

          {/* 右侧头像和设置 */}
          <View className="flex items-center">
            <Image
              src={userInfo.avatar}
              className="w-16 h-16 rounded-full"
              mode="aspectFill"
            />
            <View className="ml-3" onClick={handleSettingsClick}>
              <Settings size={22} color="#999" />
            </View>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 积分展示 */}
      <View className="px-6 py-5">
        <View className="flex items-center justify-between">
          <View>
            <Text 
              className="text-[#8B7355]"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              我的积分
            </Text>
            <Text 
              className="text-[#5D3A1A] mt-1"
              style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '2px' }}
            >
              {userInfo.points}
            </Text>
          </View>
          <View 
            className="border border-[#5D3A1A] rounded-full px-6 py-2"
            onClick={() => handleMenuClick('/pages/points/index')}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              查看明细
            </Text>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 功能菜单列表 - 个性化图标 */}
      <View className="px-6 py-4">
        {menuItems.map((item) => (
          <View
            key={item.title}
            className="flex items-center py-4"
            onClick={() => handleMenuClick(item.path)}
          >
            {/* 个性化图标背景 */}
            <View 
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: item.bgColor }}
            >
              <item.icon size={22} color={item.iconColor} />
            </View>
            <View className="ml-4 flex-1">
              {/* 菜单标题 */}
              <Text 
                className="text-black"
                style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
              >
                {item.title}
              </Text>
              
              {/* 菜单描述 */}
              <Text 
                className="text-[#8B7355] mt-1"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                {item.desc}
              </Text>
            </View>
            <ChevronRight size={18} color="#D4D4D4" />
          </View>
        ))}
      </View>

      {/* 底部留白 */}
      <View className="h-24" />
    </ScrollView>
  )
}

export default ProfilePage
