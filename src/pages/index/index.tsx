import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Sparkles, ChevronRight, Gift, Star, TrendingUp } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 九大体质数据
const CONSTITUTIONS = [
  { id: 'peaceful', name: '平和质', color: '#10B981', bg: '#D1FAE5', icon: '☯️', desc: '阴阳调和，精力充沛' },
  { id: 'qixu', name: '气虚质', color: '#F59E0B', bg: '#FEF3C7', icon: '💨', desc: '易疲乏，需补气' },
  { id: 'yangxu', name: '阳虚质', color: '#EF4444', bg: '#FEE2E2', icon: '🔥', desc: '畏寒怕冷，需温阳' },
  { id: 'yinxu', name: '阴虚质', color: '#8B5CF6', bg: '#EDE9FE', icon: '💧', desc: '口干舌燥，需滋阴' },
  { id: 'tanshi', name: '痰湿质', color: '#6B7280', bg: '#F3F4F6', icon: '🌊', desc: '形体肥胖，需祛湿' },
  { id: 'shire', name: '湿热质', color: '#F97316', bg: '#FFEDD5', icon: '🌡️', desc: '面垢油光，需清热' },
  { id: 'xueyu', name: '血瘀质', color: '#DC2626', bg: '#FEE2E2', icon: '❤️', desc: '肤色晦暗，需活血' },
  { id: 'qiyu', name: '气郁质', color: '#6366F1', bg: '#E0E7FF', icon: '🌸', desc: '情绪低落，需解郁' },
  { id: 'tebing', name: '特禀质', color: '#EC4899', bg: '#FCE7F3', icon: '🛡️', desc: '易过敏，需调养' },
]

// 推荐商品数据
const RECOMMENDED_PRODUCTS = [
  {
    id: 'peaceful',
    name: '平和养生手串',
    price: 298,
    originalPrice: 398,
    image: 'https://img.alicdn.com/imgextra/i3/2200724907121/O1CN01HJmCXG1HE0wLJYZPN_!!2200724907121.jpg_Q75.jpg_.webp',
    constitution: '平和质',
    sales: 1280,
    rating: 4.9,
  },
  {
    id: 'qixu',
    name: '补气安神手串',
    price: 358,
    originalPrice: 458,
    image: 'https://img.alicdn.com/imgextra/i4/2200724907121/O1CN01vLfGvU1HE0wIXOGuA_!!2200724907121.jpg_Q75.jpg_.webp',
    constitution: '气虚质',
    sales: 856,
    rating: 4.8,
  },
  {
    id: 'yangxu',
    name: '温阳暖身手串',
    price: 328,
    originalPrice: 428,
    image: 'https://img.alicdn.com/imgextra/i1/2200724907121/O1CN01FhQJVT1HE0wNvMJH1_!!2200724907121.jpg_Q75.jpg_.webp',
    constitution: '阳虚质',
    sales: 723,
    rating: 4.9,
  },
  {
    id: 'yinxu',
    name: '滋阴润燥手串',
    price: 368,
    originalPrice: 468,
    image: 'https://img.alicdn.com/imgextra/i3/2200724907121/O1CN01PNT4QB1HE0wLJJbNS_!!2200724907121.jpg_Q75.jpg_.webp',
    constitution: '阴虚质',
    sales: 654,
    rating: 4.7,
  },
]

// 活动数据
const ACTIVITIES = [
  { id: 1, title: '新人专享', desc: '首单立减50元', icon: Gift, color: '#E54B4B', path: '/pages/product/detail?id=peaceful' },
  { id: 2, title: '限时特惠', desc: '精选手串8折起', icon: Star, color: '#F59E0B', path: '/pages/product/detail?id=qixu' },
  { id: 3, title: '体质测试', desc: '免费测体质领券', icon: TrendingUp, color: '#10B981', path: '/pages/test/index' },
]

const IndexPage: FC = () => {
  const handleTestClick = () => {
    Taro.switchTab({ url: '/pages/test/index' })
  }

  const handleConstitutionClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleProductClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleCustomizeClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  const handleActivityClick = (path: string) => {
    if (path.includes('/pages/test/')) {
      Taro.switchTab({ url: path })
    } else {
      Taro.navigateTo({ url: path })
    }
  }

  const handleMoreClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5]">
      {/* 顶部搜索栏 */}
      <View className="bg-[#1D3A4C] px-4 pt-12 pb-6 relative overflow-hidden">
        {/* 东方装饰元素 */}
        <View className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E54B4B] opacity-10" style={{ transform: 'translate(30%, -30%)' }} />
        <View className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#D4AF37] opacity-10" style={{ transform: 'translate(-40%, 40%)' }} />
        
        <View className="flex items-center justify-between mb-4 relative z-10">
          <View>
            <Text className="text-white text-xl font-bold">华烨尚医</Text>
            <Text className="text-white/70 text-xs mt-1">一人一方，一串一养生</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" onClick={handleTestClick}>
            <Sparkles size={20} color="#fff" />
          </View>
        </View>
        <View className="bg-white/10 rounded-full px-4 py-3 flex items-center" onClick={() => Taro.showToast({ title: '搜索功能开发中', icon: 'none' })}>
          <Search size={20} color="#fff" />
          <Text className="ml-2 text-white/70 text-sm">搜索体质、商品、香料...</Text>
        </View>
      </View>

      <ScrollView scrollY className="h-[calc(100vh-180px)]">
        {/* 活动入口 */}
        <View className="px-4 py-4">
          <View className="flex gap-3">
            {ACTIVITIES.map((activity) => (
              <View
                key={activity.id}
                className="flex-1 bg-white rounded-xl p-3 flex items-center"
                onClick={() => handleActivityClick(activity.path)}
              >
                <View
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <activity.icon size={20} color={activity.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900">{activity.title}</Text>
                  <Text className="text-xs text-gray-500">{activity.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 九大体质入口 */}
        <View className="px-4 py-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">九大体质</Text>
            <View className="flex items-center" onClick={handleTestClick}>
              <Text className="text-sm text-[#1D3A4C]">测一测</Text>
              <ChevronRight size={16} color="#1D3A4C" />
            </View>
          </View>
          <View className="grid grid-cols-5 gap-2">
            {CONSTITUTIONS.map((item) => (
              <View
                key={item.id}
                className="flex flex-col items-center py-3"
                onClick={() => handleConstitutionClick(item.id)}
              >
                <View
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: item.bg }}
                >
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <Text className="text-xs text-gray-700">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 体质测试卡片 */}
        <View className="px-4 py-4">
          <Card className="bg-gradient-to-r from-[#1D3A4C] to-[#2D5A6C] rounded-2xl overflow-hidden" onClick={handleTestClick}>
            <CardContent className="p-4 flex items-center">
              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-1">探索你的养生DNA</Text>
                <Text className="text-white/70 text-sm">3分钟测试，获取专属体质报告</Text>
              </View>
              <View className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={32} color="#fff" />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* 个性化定制入口 */}
        <View className="px-4 py-2">
          <Card className="bg-white rounded-2xl" onClick={handleCustomizeClick}>
            <CardContent className="p-4 flex items-center">
              <View className="w-16 h-16 rounded-xl bg-[#E54B4B]/10 flex items-center justify-center mr-4">
                <Text className="text-3xl">🎨</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900 mb-1">个性化定制</Text>
                <Text className="text-sm text-gray-500">选择香料、材质、刻字，打造专属手串</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </CardContent>
          </Card>
        </View>

        {/* 推荐商品 */}
        <View className="px-4 py-4">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">为你推荐</Text>
            <View className="flex items-center" onClick={handleMoreClick}>
              <Text className="text-sm text-gray-500">更多</Text>
              <ChevronRight size={16} color="#999" />
            </View>
          </View>
          <View className="grid grid-cols-2 gap-3">
            {RECOMMENDED_PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden"
                onClick={() => handleProductClick(product.id)}
              >
                <Image
                  src={product.image}
                  className="w-full h-40"
                  mode="aspectFill"
                />
                <CardContent className="p-3">
                  <Text className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </Text>
                  <Text className="text-xs text-gray-500 mb-2">{product.constitution}</Text>
                  <View className="flex items-baseline justify-between">
                    <View className="flex items-baseline">
                      <Text className="text-xs text-gray-500">¥</Text>
                      <Text className="text-lg font-bold text-[#E54B4B]">{product.price}</Text>
                      <Text className="text-xs text-gray-400 line-through ml-1">¥{product.originalPrice}</Text>
                    </View>
                    <Text className="text-xs text-gray-400">已售{product.sales}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* 底部间距 */}
        <View className="h-4" />
      </ScrollView>
    </View>
  )
}

export default IndexPage
