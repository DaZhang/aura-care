import { View, Text, ScrollView } from '@tarojs/components'
import { Coins, Gift, ArrowUpRight, ArrowDownRight, Calendar, Share2, Crown, Sparkles } from 'lucide-react-taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 会员等级配置
const MEMBER_LEVELS = [
  {
    id: 'silver',
    name: '白银会员',
    color: '#C0C0C0',
    bgColor: '#F5F5F5',
    icon: '🥈',
    threshold: 500,
    discount: 0.98,
    freeShipping: true,
    pointsMultiplier: 1.2,
    benefits: ['98折优惠', '满299包邮', '专属优惠券', '积分1.2倍'],
  },
  {
    id: 'gold',
    name: '黄金会员',
    color: '#FFD700',
    bgColor: '#FFF8E1',
    icon: '🥇',
    threshold: 2000,
    discount: 0.95,
    freeShipping: true,
    pointsMultiplier: 1.5,
    benefits: ['95折优惠', '包邮', '专属优惠券', '积分1.5倍', '优先发货'],
  },
  {
    id: 'diamond',
    name: '钻石会员',
    color: '#B9F2FF',
    bgColor: '#E8F4F8',
    icon: '💎',
    threshold: 5000,
    discount: 0.90,
    freeShipping: true,
    pointsMultiplier: 2,
    benefits: ['9折优惠', '包邮', '生日礼遇', '积分2倍', '专属客服'],
  },
]

// 积分规则说明
const POINTS_RULES = [
  { icon: '🛒', title: '消费得积分', desc: '每消费1元 = 20积分', color: '#4A5D4A' },
  { icon: '📅', title: '每日签到', desc: '+1积分，连续7天额外+5', color: '#CC7722' },
  { icon: '⭐', title: '商品评价', desc: '+10积分，带图+20', color: '#5D4E37' },
  { icon: '👥', title: '邀请好友', desc: '好友首单后+50积分', color: '#7D4E5D' },
]

// 积分记录类型
interface PointsRecord {
  id: string
  type: 'earn' | 'spend'
  title: string
  points: number
  date: string
  description?: string
}

const PointsPage: FC = () => {
  // 用户数据
  const [userPoints, setUserPoints] = useState(0)
  const [totalConsume, setTotalConsume] = useState(0) // 累计消费
  const [memberLevel, setMemberLevel] = useState<typeof MEMBER_LEVELS[0] | null>(null)
  const [signInDays, setSignInDays] = useState(0) // 连续签到天数
  const [records, setRecords] = useState<PointsRecord[]>([])
  const [loading, setLoading] = useState(true)

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        // 尝试从本地存储读取用户数据
        const userDataStr = Taro.getStorageSync('userData')
        if (userDataStr) {
          const userData = JSON.parse(userDataStr)
          setUserPoints(userData.points || 0)
          setTotalConsume(userData.totalConsume || 0)
          setRecords(userData.pointsRecords || [])

          // 根据累计消费计算会员等级
          const level = getMemberLevel(userData.totalConsume || 0)
          setMemberLevel(level)
        }

        // 尝试从后端获取
        const res = await Network.request({ url: '/api/user/points' })
        if (res.data?.code === 200) {
          const data = res.data.data
          setUserPoints(data.points || 0)
          setTotalConsume(data.totalConsume || 0)
          setRecords(data.records || [])

          const level = getMemberLevel(data.totalConsume || 0)
          setMemberLevel(level)
        }
      } catch (error) {
        console.error('加载积分数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // 根据累计消费获取会员等级
  const getMemberLevel = (consume: number) => {
    if (consume >= 5000) return MEMBER_LEVELS[2] // 钻石
    if (consume >= 2000) return MEMBER_LEVELS[1] // 黄金
    if (consume >= 500) return MEMBER_LEVELS[0] // 白银
    return null
  }

  // 获取下一个会员等级
  const getNextLevel = () => {
    if (!memberLevel) return MEMBER_LEVELS[0]
    const currentIndex = MEMBER_LEVELS.findIndex(l => l.id === memberLevel.id)
    return currentIndex < MEMBER_LEVELS.length - 1 ? MEMBER_LEVELS[currentIndex + 1] : null
  }

  // 获取下一个等级的进度
  const getNextLevelProgress = () => {
    const nextLevel = getNextLevel()
    if (!nextLevel) return 100
    const progress = (totalConsume / nextLevel.threshold) * 100
    return Math.min(progress, 100)
  }

  // 签到
  const handleSignIn = async () => {
    try {
      Taro.showLoading({ title: '签到中...' })
      const res = await Network.request({
        url: '/api/user/points/signin',
        method: 'POST',
        header: { 'x-user-id': 'user001' }
      })
      Taro.hideLoading()
      
      if (res.data?.code === 200) {
        const data = res.data.data
        let pointsEarned = data.pointsEarned
        let message = `签到成功 +${pointsEarned}积分`
        
        if (data.hasBonus) {
          message = '连续签到7天！额外+5积分'
        }
        
        if (data.memberMultiplier > 1) {
          message += ` (${data.memberMultiplier}倍)`
        }
        
        setUserPoints(data.totalPoints)
        setSignInDays(data.continuousDays)
        
        // 添加记录
        const newRecord: PointsRecord = {
          id: Date.now().toString(),
          type: 'earn',
          title: '每日签到',
          points: pointsEarned,
          date: new Date().toISOString().split('T')[0],
          description: message,
        }
        setRecords(prev => [newRecord, ...prev])
        
        Taro.showToast({ title: message, icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.message || '签到失败', icon: 'none' })
      }
    } catch (error) {
      Taro.hideLoading()
      console.error('签到失败:', error)
      // 本地模拟签到
      let pointsEarned = 1
      let message = '签到成功 +1积分'
      
      if (signInDays >= 6) {
        pointsEarned += 5
        message = '连续签到7天！额外+5积分'
      }
      
      if (memberLevel) {
        pointsEarned = Math.floor(pointsEarned * memberLevel.pointsMultiplier)
        message += ` (${memberLevel.name}${memberLevel.pointsMultiplier}倍)`
      }
      
      const newPoints = userPoints + pointsEarned
      setUserPoints(newPoints)
      setSignInDays(prev => prev + 1)
      
      const newRecord: PointsRecord = {
        id: Date.now().toString(),
        type: 'earn',
        title: '每日签到',
        points: pointsEarned,
        date: new Date().toISOString().split('T')[0],
        description: message,
      }
      setRecords(prev => [newRecord, ...prev])
      
      Taro.showToast({ title: message, icon: 'success' })
    }
  }

  // 分享得积分
  const handleShare = async () => {
    try {
      const res = await Network.request({
        url: '/api/user/points/invite',
        method: 'POST',
        data: { invitedOpenid: 'mock_invited_user' },
        header: { 'x-user-id': 'user001' }
      })
      
      if (res.data?.code === 200) {
        const data = res.data.data
        setUserPoints(data.totalPoints)
        
        const newRecord: PointsRecord = {
          id: Date.now().toString(),
          type: 'earn',
          title: '邀请好友',
          points: data.pointsEarned,
          date: new Date().toISOString().split('T')[0],
          description: '好友首单后奖励',
        }
        setRecords(prev => [newRecord, ...prev])
        
        Taro.showToast({ title: `分享成功 +${data.pointsEarned}积分`, icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.message || '分享失败', icon: 'none' })
      }
    } catch (error) {
      console.error('分享积分失败:', error)
      // 本地模拟
      let pointsEarned = 50
      if (memberLevel) {
        pointsEarned = Math.floor(pointsEarned * memberLevel.pointsMultiplier)
      }
      
      const newPoints = userPoints + pointsEarned
      setUserPoints(newPoints)
      
      const newRecord: PointsRecord = {
        id: Date.now().toString(),
        type: 'earn',
        title: '邀请好友',
        points: pointsEarned,
        date: new Date().toISOString().split('T')[0],
        description: '好友首单后奖励',
      }
      setRecords(prev => [newRecord, ...prev])
      
      Taro.showToast({ title: `分享成功 +${pointsEarned}积分`, icon: 'success' })
    }
  }

  // 保存用户数据到本地

  // 去购物
  const handleShopClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  // 去兑换
  const handleExchangeClick = () => {
    Taro.navigateTo({ url: '/pages/coupon/list' })
  }

  const nextLevel = getNextLevel()
  const progress = getNextLevelProgress()

  if (loading) {
    return (
      <View className="flex items-center justify-center h-screen bg-white">
        <Text className="text-[#5D3A1A]" style={{ fontSize: '14px' }}>加载中...</Text>
      </View>
    )
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 积分概览头部 */}
      <View className="px-6 py-8" style={{ backgroundColor: '#5D3A1A' }}>
        {/* 会员等级标签 */}
        {memberLevel ? (
          <View className="flex items-center mb-3">
            <Text className="text-xl mr-2">{memberLevel.icon}</Text>
            <Text 
              className="text-white"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '2px' }}
            >
              {memberLevel.name}
            </Text>
            <Text 
              className="text-white ml-2 opacity-70"
              style={{ fontSize: '12px' }}
            >
              {memberLevel.pointsMultiplier}倍积分
            </Text>
          </View>
        ) : nextLevel ? (
          <View className="flex items-center mb-3">
            <Text 
              className="text-white opacity-70"
              style={{ fontSize: '13px', fontWeight: 300 }}
            >
              消费满 ¥{nextLevel.threshold} 升级{nextLevel.icon} {nextLevel.name}
            </Text>
          </View>
        ) : (
          <View className="flex items-center mb-3">
            <Crown size={16} color="#FFD700" className="mr-2" />
            <Text 
              className="text-white"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '2px' }}
            >
              钻石会员
            </Text>
          </View>
        )}

        {/* 积分显示 */}
        <View className="flex items-baseline">
          <Text 
            className="text-white"
            style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '2px' }}
          >
            {userPoints}
          </Text>
        </View>
        <Text 
          className="text-white opacity-60 mt-1"
          style={{ fontSize: '12px', fontWeight: 300 }}
        >
          20积分 = 1元，可抵扣 ¥{(userPoints / 20).toFixed(2)}
        </Text>

        {/* 升级进度条 */}
        {nextLevel && !memberLevel && (
          <View className="mt-4">
            <View className="flex justify-between items-center mb-1">
              <Text className="text-white opacity-70 text-xs">距离 {nextLevel.icon} {nextLevel.name}</Text>
              <Text className="text-white opacity-70 text-xs">¥{totalConsume}/{nextLevel.threshold}</Text>
            </View>
            <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <View 
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: nextLevel.color }}
              />
            </View>
          </View>
        )}

        {/* 累计消费 */}
        <View className="flex items-center mt-4 pt-4 border-t border-white border-opacity-20">
          <View>
            <Text className="text-white text-opacity-60 text-xs">累计消费</Text>
            <Text className="text-white text-lg mt-1">¥{totalConsume.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* 积分任务入口 */}
      <View className="px-6 py-5">
        <View className="flex justify-around">
          <View 
            className="flex flex-col items-center"
            onClick={handleShopClick}
          >
            <View className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFE0' }}>
              <Coins size={24} color="#5D3A1A" />
            </View>
            <Text className="text-[#5D3A1A] mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              购物得积分
            </Text>
            <Text className="text-[#999] mt-1" style={{ fontSize: '10px' }}>1元=20积分</Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleExchangeClick}
          >
            <View className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F0E8' }}>
              <Gift size={24} color="#4A5D4A" />
            </View>
            <Text className="text-[#4A5D4A] mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              积分兑换
            </Text>
            <Text className="text-[#999] mt-1" style={{ fontSize: '10px' }}>优惠券</Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleSignIn}
          >
            <View className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E1' }}>
              <Calendar size={24} color="#CC7722" />
            </View>
            <Text className="text-[#CC7722] mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              每日签到
            </Text>
            <Text className="text-[#999] mt-1" style={{ fontSize: '10px' }}>+1积分</Text>
          </View>
          <View 
            className="flex flex-col items-center"
            onClick={handleShare}
          >
            <View className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2E8EC' }}>
              <Share2 size={24} color="#7D4E5D" />
            </View>
            <Text className="text-[#7D4E5D] mt-2" style={{ fontSize: '12px', fontWeight: 400 }}>
              邀请好友
            </Text>
            <Text className="text-[#999] mt-1" style={{ fontSize: '10px' }}>+50积分</Text>
          </View>
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-2 bg-gray-50" />

      {/* 积分规则说明 */}
      <View className="px-6 py-5">
        <View className="flex items-center mb-4">
          <Sparkles size={16} color="#C9B78F" />
          <Text 
            className="text-[#5D3A1A] ml-2"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            积分规则
          </Text>
        </View>
        
        <View className="space-y-3">
          {POINTS_RULES.map((rule, index) => (
            <View 
              key={index}
              className="flex items-center p-4 rounded-xl"
              style={{ backgroundColor: '#FAFAFA' }}
            >
              <Text className="text-2xl mr-4">{rule.icon}</Text>
              <View className="flex-1">
                <Text 
                  className="text-[#2C1810]"
                  style={{ fontSize: '14px', fontWeight: 400 }}
                >
                  {rule.title}
                </Text>
                <Text 
                  className="text-[#999] mt-1"
                  style={{ fontSize: '12px' }}
                >
                  {rule.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 会员权益说明 */}
      {memberLevel && (
        <>
          <View className="h-2 bg-gray-50" />
          <View className="px-6 py-5">
            <View className="flex items-center mb-4">
              <Crown size={16} color={memberLevel.color} />
              <Text 
                className="text-[#5D3A1A] ml-2"
                style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
              >
                我的权益
              </Text>
              <Text className="text-xl ml-2">{memberLevel.icon}</Text>
            </View>
            
            <View 
              className="p-4 rounded-xl"
              style={{ backgroundColor: memberLevel.bgColor }}
            >
              <View className="flex flex-wrap gap-2">
                {memberLevel.benefits.map((benefit, index) => (
                  <View 
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                  >
                    <Text 
                      className="text-[#5D3A1A]"
                      style={{ fontSize: '12px', fontWeight: 400 }}
                    >
                      {benefit}
                    </Text>
                  </View>
                ))}
              </View>
              {nextLevel && (
                <View className="mt-3 pt-3 border-t border-[#5D3A1A]/10">
                  <Text className="text-[#666] text-xs">
                    再消费 ¥{(nextLevel.threshold - totalConsume).toFixed(2)} 可升级至 {nextLevel.icon} {nextLevel.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </>
      )}

      {/* 分割线 */}
      <View className="h-2 bg-gray-50" />

      {/* 积分明细 */}
      <View className="px-6 py-5">
        <Text 
          className="text-[#5D3A1A] mb-4"
          style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
        >
          积分明细
        </Text>
        
        {records.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <Coins size={48} color="#D4D4D4" />
            <Text className="text-[#999] mt-4" style={{ fontSize: '14px' }}>
              暂无积分记录
            </Text>
            <Text className="text-[#CCC] mt-2" style={{ fontSize: '12px' }}>
              去购物获取积分吧
            </Text>
          </View>
        ) : (
          records.map((record) => (
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
                    className="text-[#2C1810]"
                    style={{ fontSize: '14px', fontWeight: 400 }}
                  >
                    {record.title}
                  </Text>
                  {record.description && (
                    <Text 
                      className="text-[#999] mt-1"
                      style={{ fontSize: '11px' }}
                    >
                      {record.description}
                    </Text>
                  )}
                  <Text 
                    className="text-[#CCC] mt-1"
                    style={{ fontSize: '11px' }}
                  >
                    {record.date}
                  </Text>
                </View>
              </View>
              <Text 
                style={{ 
                  fontSize: '15px', 
                  fontWeight: 400,
                  color: record.type === 'earn' ? '#4A5D4A' : '#A63D2B'
                }}
              >
                {record.type === 'earn' ? '+' : ''}{record.points}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default PointsPage
