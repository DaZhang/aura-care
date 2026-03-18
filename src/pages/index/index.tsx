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

// 图片资源
const IMAGES = {
  bgHeader: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bg-header_aa301268.png?sign=1805351307-5642313b93-0-17344048ba2e9612ef7f63f6f9324eefdc9eecfe5ec461723a56982394a1c03d',
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
  braceletYangxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
  braceletYinxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
}

// 推荐商品数据
const RECOMMENDED_PRODUCTS = [
  {
    id: 'peaceful',
    name: '平和养生手串',
    price: 298,
    originalPrice: 398,
    image: IMAGES.braceletPeaceful,
    constitution: '平和质',
    sales: 1280,
    rating: 4.9,
  },
  {
    id: 'qixu',
    name: '补气安神手串',
    price: 358,
    originalPrice: 458,
    image: IMAGES.braceletQixu,
    constitution: '气虚质',
    sales: 856,
    rating: 4.8,
  },
  {
    id: 'yangxu',
    name: '温阳暖身手串',
    price: 328,
    originalPrice: 428,
    image: IMAGES.braceletYangxu,
    constitution: '阳虚质',
    sales: 723,
    rating: 4.9,
  },
  {
    id: 'yinxu',
    name: '滋阴润燥手串',
    price: 368,
    originalPrice: 468,
    image: IMAGES.braceletYinxu,
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
      <View className="relative overflow-hidden">
        {/* 背景图 */}
        <Image
          src={IMAGES.bgHeader}
          className="w-full h-48"
          mode="aspectFill"
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        />
        {/* 渐变遮罩 */}
        <View className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#1D3A4C]/90 to-[#1D3A4C]/70" />
        
        <View className="relative z-10 px-4 pt-12 pb-6">
          <View className="flex items-center justify-between mb-4">
            <View>
              <Text className="text-white text-xl font-bold">东方养生·华烨尚医</Text>
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
