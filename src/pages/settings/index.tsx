import { View, Text, ScrollView } from '@tarojs/components'
import { User, Bell, Shield, FileText, ChevronRight } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

const SettingsPage: FC = () => {
  const menuItems = [
    {
      id: 'profile',
      title: '个人资料',
      icon: User,
      bgColor: '#F5EFE0',
      iconColor: '#5D4E37'
    },
    {
      id: 'notification',
      title: '消息通知',
      icon: Bell,
      bgColor: '#E8EEF2',
      iconColor: '#4A6572'
    },
    {
      id: 'privacy',
      title: '隐私设置',
      icon: Shield,
      bgColor: '#F5EEF5',
      iconColor: '#8B668B'
    },
    {
      id: 'agreement',
      title: '用户协议',
      icon: FileText,
      bgColor: '#F5E6E0',
      iconColor: '#A63D2B'
    }
  ]

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'agreement') {
      Taro.navigateTo({ url: '/pages/agreement/user' })
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已退出登录', icon: 'success' })
          setTimeout(() => {
            Taro.switchTab({ url: '/pages/index/index' })
          }, 1500)
        }
      }
    })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          设置
        </Text>
      </View>

      {/* 菜单列表 */}
      <View className="px-6 py-4">
        {menuItems.map((item) => (
          <View
            key={item.id}
            className="flex items-center py-4 border-b border-gray-100"
            onClick={() => handleMenuClick(item.id)}
          >
            <View 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: item.bgColor }}
            >
              <item.icon size={20} color={item.iconColor} />
            </View>
            <Text 
              className="text-black ml-4 flex-1"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
            >
              {item.title}
            </Text>
            <ChevronRight size={18} color="#D4D4D4" />
          </View>
        ))}
      </View>

      {/* 退出登录按钮 */}
      <View className="px-6 py-8">
        <View
          className="flex items-center justify-center py-4 rounded-full border border-[#5D3A1A]"
          onClick={handleLogout}
        >
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            退出登录
          </Text>
        </View>
      </View>

      {/* 版本信息 */}
      <View className="flex items-center justify-center">
        <Text 
          className="text-[#999999]"
          style={{ fontSize: '12px', fontWeight: 300 }}
        >
          版本 1.0.0
        </Text>
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default SettingsPage
