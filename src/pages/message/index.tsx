import { View, Text, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Bell, Package, Gift, MessageCircle, ChevronRight } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 消息类型配置
const MESSAGE_TYPES = [
  { id: 'all', name: '全部', icon: Bell },
  { id: 'order', name: '订单消息', icon: Package },
  { id: 'promotion', name: '活动优惠', icon: Gift },
  { id: 'system', name: '系统通知', icon: MessageCircle },
]

interface Message {
  id: string
  type: string
  title: string
  content: string
  read: boolean
  createTime: string
  data?: any
}

const MessagePage: FC = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState({ total: 0, byType: {} as Record<string, number> })

  useEffect(() => {
    loadMessages()
    loadUnreadCount()
  }, [activeTab])

  const loadMessages = async () => {
    try {
      const res = await Network.request({
        url: '/api/message/list',
        data: { type: activeTab === 'all' ? undefined : activeTab }
      })
      console.log('消息数据:', res.data)
      setMessages(res.data.data?.list || [])
    } catch (error) {
      console.error('加载消息失败:', error)
      // 使用模拟数据
      setMessages([
        {
          id: '1',
          type: 'order',
          title: '支付成功',
          content: '您的订单ORD001已支付成功，我们将尽快为您发货',
          read: false,
          createTime: '2024-01-15 14:30',
        },
        {
          id: '2',
          type: 'promotion',
          title: '优惠券到账',
          content: '恭喜您获得新人专享优惠券，满100减50',
          read: false,
          createTime: '2024-01-14 10:00',
        },
        {
          id: '3',
          type: 'system',
          title: '会员升级',
          content: '恭喜您升级为银卡会员，享受更多权益',
          read: true,
          createTime: '2024-01-10 09:00',
        },
      ])
    }
  }

  const loadUnreadCount = async () => {
    try {
      const res = await Network.request({ url: '/api/message/unread-count' })
      setUnreadCount(res.data.data || { total: 0, byType: {} })
    } catch (error) {
      console.error('加载未读数量失败:', error)
    }
  }

  const handleTabChange = (type: string) => {
    setActiveTab(type)
  }

  const handleMessageClick = async (message: Message) => {
    // 标记已读
    if (!message.read) {
      try {
        await Network.request({
          url: '/api/message/read',
          method: 'POST',
          data: { messageIds: [message.id] }
        })
        
        setMessages(msgs => 
          msgs.map(m => m.id === message.id ? { ...m, read: true } : m)
        )
        loadUnreadCount()
      } catch (error) {
        console.error('标记已读失败:', error)
      }
    }

    // 根据消息类型跳转
    if (message.type === 'order' && message.data?.orderId) {
      Taro.navigateTo({ url: `/pages/profile/orders?orderId=${message.data.orderId}` })
    }
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = MESSAGE_TYPES.find(t => t.id === type)
    return typeConfig?.icon || Bell
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      order: '#8B2500',
      promotion: '#B8860B',
      system: '#5D3A1A',
      service: '#2E8B57',
    }
    return colors[type] || '#5D3A1A'
  }

  const formatTime = (time: string) => {
    const date = new Date(time)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes}分钟前`
      }
      return `${hours}小时前`
    } else if (days === 1) {
      return '昨天'
    } else if (days < 7) {
      return `${days}天前`
    }
    return time.split(' ')[0]
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 顶部标签栏 */}
      <View className="bg-white px-4 py-3 flex justify-around border-b border-[#E5DDD3]">
        {MESSAGE_TYPES.map(type => {
          const Icon = type.icon
          const count = type.id === 'all' 
            ? unreadCount.total 
            : unreadCount.byType[type.id] || 0
          
          return (
            <View
              key={type.id}
              className={`flex flex-col items-center ${activeTab === type.id ? 'opacity-100' : 'opacity-60'}`}
              onClick={() => handleTabChange(type.id)}
            >
              <View className="relative">
                <Icon size={22} color={activeTab === type.id ? '#5D3A1A' : '#6B5D52'} />
                {count > 0 && (
                  <View className="absolute -top-1 -right-1 w-4 h-4 bg-[#E54B4B] rounded-full flex items-center justify-center">
                    <Text className="text-white text-xs">{count > 9 ? '9+' : count}</Text>
                  </View>
                )}
              </View>
              <Text className={`text-xs mt-1 ${activeTab === type.id ? 'text-[#5D3A1A] font-medium' : 'text-[#6B5D52]'}`}>
                {type.name}
              </Text>
            </View>
          )
        })}
      </View>

      {/* 消息列表 */}
      <ScrollView scrollY className="px-4 py-4">
        {messages.length === 0 ? (
          <View className="flex flex-col items-center justify-center pt-20">
            <Bell size={48} color="#D4C9B8" />
            <Text className="text-[#6B5D52] mt-4">暂无消息</Text>
          </View>
        ) : (
          messages.map((message) => {
            const Icon = getTypeIcon(message.type)
            const typeColor = getTypeColor(message.type)
            
            return (
              <Card
                key={message.id}
                className={`bg-white rounded-xl mb-3 overflow-hidden ${!message.read ? 'border-l-4' : ''}`}
                style={{ borderLeftColor: !message.read ? typeColor : 'transparent' }}
                onClick={() => handleMessageClick(message)}
              >
                <CardContent className="p-4">
                  <View className="flex items-start">
                    {/* 图标 */}
                    <View 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${typeColor}15` }}
                    >
                      <Icon size={20} color={typeColor} />
                    </View>
                    
                    {/* 内容 */}
                    <View className="flex-1">
                      <View className="flex items-center justify-between mb-1">
                        <Text className="text-sm font-medium text-[#2C1810]">{message.title}</Text>
                        <Text className="text-xs text-[#8B7355]">{formatTime(message.createTime)}</Text>
                      </View>
                      <Text className="text-xs text-[#6B5D52] line-clamp-2">{message.content}</Text>
                    </View>
                    
                    {/* 箭头 */}
                    <ChevronRight size={16} color="#D4C9B8" className="ml-2" />
                  </View>
                </CardContent>
              </Card>
            )
          })
        )}
      </ScrollView>
    </View>
  )
}

export default MessagePage
