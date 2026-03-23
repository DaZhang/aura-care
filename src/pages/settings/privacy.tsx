import { View, Text, ScrollView, Switch } from '@tarojs/components'
import { Shield, Eye, Lock, Bell, ChevronRight, Info } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'

const PrivacySettingsPage: FC = () => {
  const [settings, setSettings] = useState({
    profileVisible: true,      // 个人资料可见性
    purchaseHistory: true,     // 购买记录可见
    constitutionShare: false,  // 体质测试结果分享
    recommendationEnabled: true, // 个性化推荐
    dataCollection: true,      // 数据收集
    locationService: false,    // 位置服务
    pushNotification: true,    // 推送通知
    smsNotification: false,    // 短信通知
  })

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    Taro.setStorageSync('privacySettings', JSON.stringify(newSettings))
    Taro.showToast({ title: '设置已更新', icon: 'success', duration: 1000 })
  }

  const handleClearData = () => {
    Taro.showModal({
      title: '清除数据',
      content: '确定要清除所有个人数据吗？此操作不可恢复。',
      confirmText: '确定清除',
      confirmColor: '#A63D2B',
      success: (res) => {
        if (res.confirm) {
          // 清除本地数据
          const keys = ['userInfo', 'constitution', 'testHistory', 'privacySettings']
          keys.forEach(key => Taro.removeStorageSync(key))
          Taro.showToast({ title: '数据已清除', icon: 'success' })
          // 重置设置
          setSettings({
            profileVisible: true,
            purchaseHistory: true,
            constitutionShare: false,
            recommendationEnabled: true,
            dataCollection: true,
            locationService: false,
            pushNotification: true,
            smsNotification: false,
          })
        }
      }
    })
  }

  const handleExportData = () => {
    Taro.showModal({
      title: '导出数据',
      content: '将导出您的个人数据副本，数据将发送到您的注册邮箱。',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '数据导出请求已提交', icon: 'success' })
        }
      }
    })
  }

  const handleDeleteAccount = () => {
    Taro.showModal({
      title: '注销账号',
      content: '注销后您的所有数据将被删除且无法恢复，确定要注销账号吗？',
      confirmText: '确认注销',
      confirmColor: '#A63D2B',
      success: (res) => {
        if (res.confirm) {
          Taro.showModal({
            title: '再次确认',
            content: '您真的要注销账号吗？此操作不可撤销！',
            confirmText: '确认注销',
            confirmColor: '#A63D2B',
            success: (res2) => {
              if (res2.confirm) {
                Taro.clearStorageSync()
                Taro.showToast({ title: '账号已注销', icon: 'success' })
                setTimeout(() => {
                  Taro.switchTab({ url: '/pages/index/index' })
                }, 1500)
              }
            }
          })
        }
      }
    })
  }

  const settingSections = [
    {
      title: '个人信息',
      icon: Eye,
      color: '#5D3A1A',
      items: [
        {
          key: 'profileVisible',
          title: '个人资料可见',
          desc: '允许其他用户查看您的个人资料',
          hasSwitch: true
        },
        {
          key: 'purchaseHistory',
          title: '购买记录可见',
          desc: '允许查看您的购买历史',
          hasSwitch: true
        },
        {
          key: 'constitutionShare',
          title: '体质测试分享',
          desc: '允许分享您的体质测试结果',
          hasSwitch: true
        }
      ]
    },
    {
      title: '数据与隐私',
      icon: Lock,
      color: '#8B668B',
      items: [
        {
          key: 'recommendationEnabled',
          title: '个性化推荐',
          desc: '根据您的偏好推荐商品',
          hasSwitch: true
        },
        {
          key: 'dataCollection',
          title: '数据收集',
          desc: '允许收集使用数据以改善体验',
          hasSwitch: true
        },
        {
          key: 'locationService',
          title: '位置服务',
          desc: '允许获取您的位置信息',
          hasSwitch: true
        }
      ]
    },
    {
      title: '通知设置',
      icon: Bell,
      color: '#4A6572',
      items: [
        {
          key: 'pushNotification',
          title: '推送通知',
          desc: '接收订单、活动等推送消息',
          hasSwitch: true
        },
        {
          key: 'smsNotification',
          title: '短信通知',
          desc: '接收重要订单短信提醒',
          hasSwitch: true
        }
      ]
    }
  ]

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          隐私设置
        </Text>
        <Text 
          className="text-[#8B7355] mt-2"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          管理您的隐私和账户安全
        </Text>
      </View>

      {/* 设置分组 */}
      {settingSections.map((section) => (
        <View key={section.title} className="px-6 mb-6">
          <View className="flex items-center mb-3">
            <section.icon size={18} color={section.color} />
            <Text 
              className="text-black ml-2"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
            >
              {section.title}
            </Text>
          </View>
          
          <View className="bg-gray-50 rounded-2xl overflow-hidden">
            {section.items.map((item, index) => (
              <View
                key={item.key}
                className={`px-4 py-4 ${index < section.items.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <View className="flex items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text 
                      className="text-black"
                      style={{ fontSize: '15px', fontWeight: 400 }}
                    >
                      {item.title}
                    </Text>
                    <Text 
                      className="text-[#999999] mt-1"
                      style={{ fontSize: '12px', fontWeight: 300 }}
                    >
                      {item.desc}
                    </Text>
                  </View>
                  {item.hasSwitch && (
                    <Switch
                      checked={settings[item.key as keyof typeof settings]}
                      color="#5D3A1A"
                      onChange={() => handleToggle(item.key as keyof typeof settings)}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* 数据管理 */}
      <View className="px-6 mb-6">
        <View className="flex items-center mb-3">
          <Shield size={18} color="#A63D2B" />
          <Text 
            className="text-black ml-2"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
          >
            数据管理
          </Text>
        </View>

        <View className="bg-gray-50 rounded-2xl overflow-hidden">
          <View
            className="px-4 py-4 border-b border-gray-200 flex items-center justify-between"
            onClick={handleExportData}
          >
            <Text 
              className="text-black"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              导出个人数据
            </Text>
            <ChevronRight size={18} color="#D4D4D4" />
          </View>
          
          <View
            className="px-4 py-4 flex items-center justify-between"
            onClick={handleClearData}
          >
            <Text 
              className="text-[#A63D2B]"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              清除本地数据
            </Text>
            <ChevronRight size={18} color="#D4D4D4" />
          </View>
        </View>
      </View>

      {/* 隐私说明 */}
      <View className="px-6 mb-6">
        <View className="flex items-center mb-3">
          <Info size={18} color="#8B7355" />
          <Text 
            className="text-black ml-2"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
          >
            隐私说明
          </Text>
        </View>

        <View className="px-4 py-4 rounded-2xl" style={{ backgroundColor: '#F5EFE0' }}>
          <Text 
            className="text-[#5D4E37]"
            style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8 }}
          >
            我们重视您的隐私安全。您的个人信息仅用于提供更好的服务体验，不会向第三方泄露。您可以随时管理或删除您的个人数据。
          </Text>
        </View>
      </View>

      {/* 注销账号 */}
      <View className="px-6 py-6">
        <View
          className="flex items-center justify-center py-4 rounded-full border border-[#A63D2B]"
          onClick={handleDeleteAccount}
        >
          <Text 
            className="text-[#A63D2B]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            注销账号
          </Text>
        </View>
        <Text 
          className="text-[#999999] text-center mt-2"
          style={{ fontSize: '12px', fontWeight: 300 }}
        >
          注销后所有数据将被永久删除
        </Text>
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default PrivacySettingsPage
