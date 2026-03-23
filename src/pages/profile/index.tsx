import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { 
  ChevronRight, 
  Package, 
  Heart, 
  Star,
  FileText,
  Award,
  Bell,
  Info,
  LogOut,
  User,
  MapPin,
  CreditCard,
  RotateCcw
} from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 用户数据类型
interface UserInfo {
  id: number
  nickname: string
  avatar: string
  constitution?: string
  points: number
  level: string
  balance: number
  coupons: number
  orderCount: { pending: number; shipped: number; completed: number }
}

// 默认用户数据（未登录状态）
const defaultUser: UserInfo = {
  id: 0,
  nickname: '未登录',
  avatar: '',
  points: 0,
  level: '普通用户',
  balance: 0,
  coupons: 0,
  orderCount: { pending: 0, shipped: 0, completed: 0 },
}

// 订单状态图标
const ORDER_STATUS = [
  { id: 'pending', name: '待付款', icon: CreditCard },
  { id: 'shipped', name: '待发货', icon: Package },
  { id: 'delivered', name: '待收货', icon: MapPin },
  { id: 'review', name: '待评价', icon: Star },
  { id: 'refund', name: '退换货', icon: RotateCcw },
]

// 功能菜单
const MENU_ITEMS = [
  { id: 'records', icon: FileText, title: '养生档案', desc: '体质记录与调理建议' },
  { id: 'favorites', icon: Heart, title: '我的收藏', desc: '收藏的商品' },
  { id: 'address', icon: MapPin, title: '收货地址', desc: '管理收货地址' },
  { id: 'help', icon: Info, title: '帮助中心', desc: '常见问题解答' },
]

const ProfilePage: FC = () => {
  const [user, setUser] = useState<UserInfo>(defaultUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkLoginStatus()
  }, [])

  // 检查登录状态
  const checkLoginStatus = async () => {
    try {
      const token = Taro.getStorageSync('token')
      if (token) {
        const res = await Network.request({ url: '/api/user/info' })
        console.log('用户信息响应:', res.data)
        if (res.data?.code === 200) {
          setUser(res.data.data)
          setIsLoggedIn(true)
        } else {
          Taro.removeStorageSync('token')
          setIsLoggedIn(false)
        }
      }
    } catch (error) {
      console.error('检查登录状态失败:', error)
      setIsLoggedIn(false)
    }
  }

  // 微信授权登录
  const handleLogin = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const loginRes = await Taro.login()
      console.log('微信登录返回:', loginRes)
      
      if (!loginRes.code) {
        Taro.showToast({ title: '登录失败，请重试', icon: 'none' })
        return
      }

      const res = await Network.request({
        url: '/api/user/login',
        method: 'POST',
        data: { code: loginRes.code }
      })
      console.log('后端登录响应:', res.data)

      if (res.data?.code === 200) {
        Taro.setStorageSync('token', res.data.data.token)
        setUser(res.data.data.user)
        setIsLoggedIn(true)
        Taro.showToast({ title: '登录成功', icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.msg || '登录失败', icon: 'none' })
      }
    } catch (error) {
      console.error('登录失败:', error)
      Taro.showToast({ title: '网络错误', icon: 'none' })
    } finally {
      setIsLoading(false)
    }
  }

  // 退出登录
  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.removeStorageSync('token')
          setUser(defaultUser)
          setIsLoggedIn(false)
          Taro.showToast({ title: '已退出登录', icon: 'success' })
        }
      }
    })
  }

  const handleOrderClick = (status: string) => {
    if (!isLoggedIn) {
      Taro.showModal({
        title: '提示',
        content: '请先登录后再查看订单',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            handleLogin()
          }
        }
      })
      return
    }
    Taro.navigateTo({ url: `/pages/profile/orders?status=${status}` })
  }

  const handleMenuClick = (id: string) => {
    if (!isLoggedIn) {
      Taro.showModal({
        title: '提示',
        content: '请先登录后再使用此功能',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            handleLogin()
          }
        }
      })
      return
    }

    switch (id) {
      case 'records':
        Taro.showModal({
          title: '我的养生档案',
          content: `您的体质类型: ${user.constitution || '未测试'}\n\n根据中医九种体质辨证，建议您：\n• 保持规律作息\n• 饮食清淡均衡\n• 适度运动锻炼`,
          showCancel: false,
        })
        break
      case 'favorites':
        Taro.showModal({
          title: '我的收藏',
          content: '您还没有收藏任何商品',
          showCancel: false,
        })
        break
      case 'address':
        Taro.showToast({ title: '功能开发中', icon: 'none' })
        break
      case 'help':
        Taro.showModal({
          title: '帮助中心',
          content: '如有任何问题或建议，请联系客服：\n\n电话: 400-888-8888\n微信: huaye_wellness\n工作时间: 9:00-18:00',
          showCancel: false,
        })
        break
      default:
        Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  const handleAssetClick = (type: string) => {
    if (!isLoggedIn) {
      Taro.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            handleLogin()
          }
        }
      })
      return
    }

    switch (type) {
      case 'points':
        Taro.navigateTo({ url: '/pages/coupon/index' })
        break
      case 'coupons':
        Taro.navigateTo({ url: '/pages/coupon/index' })
        break
      default:
        Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5]">
      {/* 顶部标题栏 - 浅卡其色 */}
      <View className="bg-[#CBBE9C] h-12 flex items-center justify-center sticky top-0 z-50">
        <Text className="text-base font-medium text-white">个人中心</Text>
      </View>

      <ScrollView scrollY className="h-[calc(100vh-48px)]">
        {/* 用户信息区 - 黑色背景 */}
        <View className="bg-[#1A1A1A] px-5 pt-8 pb-6">
          <View className="flex items-center">
            {isLoggedIn && user.avatar ? (
              <Image 
                src={user.avatar} 
                className="w-16 h-16 rounded-full border-2 border-white"
              />
            ) : (
              <View className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <User size={32} color="#fff" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="text-white text-lg font-bold">{user.nickname}</Text>
              {isLoggedIn && (
                <View className="flex items-center mt-2">
                  {user.constitution && (
                    <View className="px-2 py-1 rounded bg-white bg-opacity-10">
                      <Text className="text-xs text-gray-300">{user.constitution}</Text>
                    </View>
                  )}
                  <View className="flex items-center ml-2">
                    <Award size={12} color="#CBBE9C" />
                    <Text className="text-xs text-gray-300 ml-1">{user.level}</Text>
                  </View>
                </View>
              )}
            </View>
            {!isLoggedIn && (
              <View 
                className="bg-[#CBBE9C] rounded-full px-5 py-2"
                onClick={handleLogin}
              >
                <Text className="text-white text-sm">
                  {isLoading ? '登录中...' : '登录'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 资产数据区 */}
        <View className="bg-white px-5 py-4">
          <View className="flex justify-around">
            <View 
              className="flex flex-col items-center"
              onClick={() => handleAssetClick('balance')}
            >
              <Text className="text-xl font-bold text-[#1A1A1A]">{user.balance}</Text>
              <Text className="text-xs text-gray-500 mt-1">卡余额</Text>
            </View>
            <View 
              className="flex flex-col items-center"
              onClick={() => handleAssetClick('points')}
            >
              <Text className="text-xl font-bold text-[#1A1A1A]">{user.points}</Text>
              <Text className="text-xs text-gray-500 mt-1">积分</Text>
            </View>
            <View 
              className="flex flex-col items-center"
              onClick={() => handleAssetClick('coupons')}
            >
              <Text className="text-xl font-bold text-[#1A1A1A]">{user.coupons}</Text>
              <Text className="text-xs text-gray-500 mt-1">优惠券</Text>
            </View>
          </View>
        </View>

        {/* 订单区 */}
        <View className="bg-white mt-2 px-5 py-4">
          <View className="flex items-center justify-between mb-4">
            <Text className="text-base font-bold text-[#1A1A1A]">我的订单</Text>
            <View 
              className="flex items-center"
              onClick={() => handleOrderClick('all')}
            >
              <Text className="text-sm text-gray-500">查看全部</Text>
              <ChevronRight size={16} color="#999" />
            </View>
          </View>
          
          <View className="flex justify-around">
            {ORDER_STATUS.map((status) => {
              const IconComponent = status.icon
              return (
                <View
                  key={status.id}
                  className="flex flex-col items-center"
                  onClick={() => handleOrderClick(status.id)}
                >
                  <View className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                    <IconComponent size={20} color="#666" />
                  </View>
                  <Text className="text-xs text-gray-700">{status.name}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* 功能列表 */}
        <View className="bg-white mt-2">
          {MENU_ITEMS.map((item, index) => {
            const IconComponent = item.icon
            return (
              <View
                key={item.id}
                className={`flex items-center px-5 py-4 ${index !== MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <View className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                  <IconComponent size={20} color="#666" />
                </View>
                <View className="flex-1">
                  <Text className="text-base text-[#1A1A1A]">{item.title}</Text>
                  <Text className="text-xs text-gray-500 mt-1">{item.desc}</Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </View>
            )
          })}
        </View>

        {/* 设置和帮助 */}
        <View className="bg-white mt-2">
          <View 
            className="flex items-center px-5 py-4 border-b border-gray-100"
            onClick={() => Taro.navigateTo({ url: '/pages/message/index' })}
          >
            <View className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3">
              <Bell size={20} color="#666" />
            </View>
            <Text className="flex-1 text-base text-[#1A1A1A]">消息通知</Text>
            <ChevronRight size={20} color="#999" />
          </View>
          
          <View 
            className="flex items-center px-5 py-4"
            onClick={() => Taro.showModal({
              title: '设置',
              content: '设置功能开发中',
              showCancel: false,
            })}
          >
            <View className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3">
              <Info size={20} color="#666" />
            </View>
            <Text className="flex-1 text-base text-[#1A1A1A]">设置</Text>
            <ChevronRight size={20} color="#999" />
          </View>
        </View>

        {/* 退出登录 */}
        {isLoggedIn && (
          <View className="mt-4 px-5">
            <View 
              className="bg-white rounded-xl p-4 flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut size={20} color="#999" />
              <Text className="text-gray-500 text-base ml-2">退出登录</Text>
            </View>
          </View>
        )}

        {/* 底部安全提示 */}
        <View className="px-5 py-8">
          <Text className="text-xs text-gray-400 text-center">
            登录即代表同意《用户协议》和《隐私政策》
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfilePage
