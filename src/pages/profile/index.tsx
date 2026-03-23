import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Settings, Receipt, Ticket, Gift, Info, ChevronRight } from 'lucide-react-taro'
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

  const menuItems = [
    { icon: Receipt, title: '我的订单', desc: '查看订单状态', path: '/pages/order/list' },
    { icon: Ticket, title: '我的优惠券', desc: '查看可用优惠', path: '/pages/coupon/list' },
    { icon: Gift, title: '我的积分', desc: `${userInfo.points} 积分`, path: '/pages/points/index' },
    { icon: Info, title: '帮助中心', desc: '常见问题解答', path: '/pages/help/index' },
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

      {/* 用户信息模块 - 元古风格 */}
      <View className="px-6 py-6">
        <View className="flex items-start">
          {/* 左侧用户信息 */}
          <View className="flex-1">
            {/* 用户昵称 - 20px 字重400 */}
            <Text 
              className="text-black"
              style={{ fontSize: '20px', fontWeight: 400 }}
            >
              {userInfo.nickname}
            </Text>
            
            {/* 体质标签 - 14px 字重300 */}
            <View className="mt-2">
              <Text 
                className="text-[#B8A692]"
                style={{ fontSize: '14px', fontWeight: 300 }}
              >
                {userInfo.constitution}
              </Text>
            </View>
            
            {/* 会员信息 - 14px 字重300 */}
            <Text 
              className="text-[#333333] mt-2"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              {userInfo.level}
            </Text>
          </View>

          {/* 右侧头像和设置 */}
          <View className="flex items-center">
            <Image
              src={userInfo.avatar}
              className="w-14 h-14 rounded-full"
              mode="aspectFill"
            />
            <View className="ml-3" onClick={handleSettingsClick}>
              <Settings size={20} color="#999" />
            </View>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 积分展示 - 元古风格 */}
      <View className="px-6 py-4">
        <View className="flex items-center justify-between">
          <View>
            <Text 
              className="text-[#333333]"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              我的积分
            </Text>
            <Text 
              className="text-[#B8A692] mt-1"
              style={{ fontSize: '24px', fontWeight: 400 }}
            >
              {userInfo.points}
            </Text>
          </View>
          <View 
            className="border border-gray-300 rounded-full px-5 py-1"
            onClick={() => handleMenuClick('/pages/points/index')}
          >
            <Text 
              className="text-[#333333]"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              查看明细
            </Text>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 功能菜单列表 - 元古风格 */}
      <View className="px-6 py-4">
        {menuItems.map((item) => (
          <View
            key={item.title}
            className="flex items-center py-4"
            onClick={() => handleMenuClick(item.path)}
          >
            <item.icon size={20} color="#999" />
            <View className="ml-3 flex-1">
              {/* 菜单标题 - 16px 字重400 */}
              <Text 
                className="text-black"
                style={{ fontSize: '16px', fontWeight: 400 }}
              >
                {item.title}
              </Text>
              
              {/* 菜单描述 - 14px 字重300 */}
              <Text 
                className="text-[#333333] mt-1"
                style={{ fontSize: '14px', fontWeight: 300 }}
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
