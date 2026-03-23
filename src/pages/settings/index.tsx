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
      iconColor: '#5D4E37',
      action: 'navigate',
      url: '/pages/profile/edit'
    },
    {
      id: 'notification',
      title: '消息通知',
      icon: Bell,
      bgColor: '#E8EEF2',
      iconColor: '#4A6572',
      action: 'toggle',
      enabled: true
    },
    {
      id: 'privacy',
      title: '隐私设置',
      icon: Shield,
      bgColor: '#F5EEF5',
      iconColor: '#8B668B',
      action: 'navigate',
      url: '/pages/settings/privacy'
    },
    {
      id: 'agreement',
      title: '用户协议',
      icon: FileText,
      bgColor: '#F5E6E0',
      iconColor: '#A63D2B',
      action: 'navigate',
      url: '/pages/agreement/user'
    }
  ]

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.action === 'navigate' && item.url) {
      Taro.navigateTo({ url: item.url })
    } else if (item.action === 'toggle') {
      Taro.showToast({ title: '设置已更新', icon: 'success' })
    }
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的用户数据
          Taro.removeStorageSync('userInfo')
          Taro.removeStorageSync('token')
          Taro.showToast({ title: '已退出登录', icon: 'success' })
          setTimeout(() => {
            Taro.switchTab({ url: '/pages/index/index' })
          }, 1500)
        }
      }
    })
  }

  const handleClearCache = () => {
    Taro.showModal({
      title: '清除缓存',
      content: '确定要清除本地缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 保留购物车数据，只清除其他缓存
          const cart = Taro.getStorageSync('cart')
          Taro.clearStorageSync()
          if (cart) {
            Taro.setStorageSync('cart', cart)
          }
          Taro.showToast({ title: '缓存已清除', icon: 'success' })
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
      <View className="px-6 py-2">
        {menuItems.map((item) => (
          <View
            key={item.id}
            className="flex items-center py-4 border-b border-gray-100"
            onClick={() => handleMenuClick(item)}
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
            {item.action === 'toggle' ? (
              <View 
                className={`w-12 h-7 rounded-full flex items-center px-1 ${item.enabled ? 'bg-[#5D3A1A]' : 'bg-gray-300'}`}
              >
                <View 
                  className={`w-5 h-5 rounded-full bg-white ${item.enabled ? 'ml-auto' : ''}`}
                />
              </View>
            ) : (
              <ChevronRight size={18} color="#D4D4D4" />
            )}
          </View>
        ))}
      </View>

      {/* 其他设置 */}
      <View className="px-6 py-2 mt-4">
        <View
          className="flex items-center py-4 border-b border-gray-100"
          onClick={handleClearCache}
        >
          <View 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#FBF5E6' }}
          >
            <Text style={{ fontSize: '16px' }}>🗑️</Text>
          </View>
          <Text 
            className="text-black ml-4 flex-1"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
          >
            清除缓存
          </Text>
          <ChevronRight size={18} color="#D4D4D4" />
        </View>
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
