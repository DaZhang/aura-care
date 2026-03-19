import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Sparkles, ChevronRight, Gift, Star, TrendingUp } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 九大体质数据 - 传统中式配色
const CONSTITUTIONS = [
  { id: 'peaceful', name: '平和质', color: '#5D4E37', bg: '#F5EFE0', icon: '☯', desc: '阴阳调和，精力充沛' },
  { id: 'qixu', name: '气虚质', color: '#CC7722', bg: '#FAF0DC', icon: '气', desc: '易疲乏，需补气' },
  { id: 'yangxu', name: '阳虚质', color: '#A63D2B', bg: '#F5E6E0', icon: '阳', desc: '畏寒怕冷，需温阳' },
  { id: 'yinxu', name: '阴虚质', color: '#4A6572', bg: '#E8EEF2', icon: '阴', desc: '口干舌燥，需滋阴' },
  { id: 'tanshi', name: '痰湿质', color: '#5C6B4E', bg: '#EEF2E8', icon: '湿', desc: '形体肥胖，需祛湿' },
  { id: 'shire', name: '湿热质', color: '#B85C38', bg: '#F8EDE4', icon: '热', desc: '面垢油光，需清热' },
  { id: 'xueyu', name: '血瘀质', color: '#7D4E5D', bg: '#F2E8EC', icon: '血', desc: '肤色晦暗，需活血' },
  { id: 'qiyu', name: '气郁质', color: '#4A5568', bg: '#EAEFF5', icon: '郁', desc: '情绪低落，需解郁' },
  { id: 'tebing', name: '特禀质', color: '#6B7B5E', bg: '#F0F4EC', icon: '敏', desc: '易过敏，需调养' },
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

// 活动数据 - 传统中式配色
const ACTIVITIES = [
  { id: 1, title: '新人专享', desc: '首单立减50元', icon: Gift, color: '#8B2500', action: 'newuser' },
  { id: 2, title: '限时特惠', desc: '精选手串8折起', icon: Star, color: '#B8860B', action: 'sale' },
  { id: 3, title: '体质测试', desc: '免费测体质领券', icon: TrendingUp, color: '#2E8B57', action: 'test' },
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

  const handleActivityClick = (action: string) => {
    switch (action) {
      case 'newuser':
        // 新人专享 - 显示新人优惠弹窗
        Taro.showModal({
          title: '新人专享福利',
          content: '恭喜您获得新用户专属优惠！首单立减50元，有效期7天。现在去选购您的心仪手串吧！',
          confirmText: '立即选购',
          cancelText: '稍后再说',
          success: (res) => {
            if (res.confirm) {
              Taro.switchTab({ url: '/pages/customize/index' })
            }
          }
        })
        break
      case 'sale':
        // 限时特惠 - 跳转到定制页面
        Taro.showModal({
          title: '限时特惠活动',
          content: '精选手串限时8折起！活动时间有限，快来挑选您的专属养生手串。',
          confirmText: '立即参与',
          cancelText: '稍后再说',
          success: (res) => {
            if (res.confirm) {
              Taro.switchTab({ url: '/pages/customize/index' })
            }
          }
        })
        break
      case 'test':
        // 体质测试
        Taro.switchTab({ url: '/pages/test/index' })
        break
      default:
        Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  const handleMoreClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 顶部搜索栏 */}
      <View className="relative overflow-hidden">
        {/* 背景图 */}
        <Image
          src={IMAGES.bgHeader}
          className="w-full h-48"
          mode="aspectFill"
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        />
        {/* 渐变遮罩 - 使用墨色 */}
        <View className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#5D3A1A]/90 to-[#3D2A15]/80" />
        
        <View className="relative z-10 px-4 pt-12 pb-6">
          <View className="flex items-center justify-between mb-4">
            <View>
              <Text className="text-[#FDF9F3] text-xl font-bold">东方养生·华烨尚医</Text>
              <Text className="text-[#FDF9F3]/80 text-xs mt-1">一人一方，一串一养生</Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-[#FDF9F3]/10 flex items-center justify-center border border-[#FDF9F3]/20" onClick={handleTestClick}>
              <Sparkles size={20} color="#FDF9F3" />
            </View>
          </View>
          <View className="bg-[#FDF9F3]/15 rounded-full px-4 py-3 flex items-center border border-[#FDF9F3]/10" onClick={() => Taro.showToast({ title: '搜索功能开发中', icon: 'none' })}>
            <Search size={20} color="#FDF9F3" />
            <Text className="ml-2 text-[#FDF9F3]/70 text-sm">搜索体质、商品、香料...</Text>
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
                onClick={() => handleActivityClick(activity.action)}
              >
                <View
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <activity.icon size={20} color={activity.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-[#2C1810]">{activity.title}</Text>
                  <Text className="text-xs text-[#6B5D52]">{activity.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 九大体质入口 */}
        <View className="px-4 py-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-lg font-bold text-[#2C1810]">九大体质</Text>
            <View className="flex items-center" onClick={handleTestClick}>
              <Text className="text-sm text-[#5D3A1A]">测一测</Text>
              <ChevronRight size={16} color="#5D3A1A" />
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
                <Text className="text-xs text-[#5D4E37]">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 体质测试卡片 */}
        <View className="px-4 py-4">
          <Card className="bg-gradient-to-r from-[#5D3A1A] to-[#7D4A2A] rounded-2xl overflow-hidden" onClick={handleTestClick}>
            <CardContent className="p-4 flex items-center">
              <View className="flex-1">
                <Text className="text-[#FDF9F3] text-lg font-bold mb-1">探索你的养生DNA</Text>
                <Text className="text-[#FDF9F3]/70 text-sm">3分钟测试，获取专属体质报告</Text>
              </View>
              <View className="w-16 h-16 rounded-full bg-[#FDF9F3]/20 flex items-center justify-center">
                <Sparkles size={32} color="#FDF9F3" />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* 个性化定制入口 */}
        <View className="px-4 py-2">
          <Card className="bg-[#FDF9F3] rounded-2xl border border-[#D4C9B8]" onClick={handleCustomizeClick}>
            <CardContent className="p-4 flex items-center">
              <View className="w-16 h-16 rounded-xl bg-[#8B2500]/10 flex items-center justify-center mr-4">
                <Text className="text-3xl">📜</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#2C1810] mb-1">个性化定制</Text>
                <Text className="text-sm text-[#6B5D52]">选择香料、材质、刻字，打造专属手串</Text>
              </View>
              <ChevronRight size={20} color="#6B5D52" />
            </CardContent>
          </Card>
        </View>

        {/* 推荐商品 */}
        <View className="px-4 py-4">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-lg font-bold text-[#2C1810]">为你推荐</Text>
            <View className="flex items-center" onClick={handleMoreClick}>
              <Text className="text-sm text-[#6B5D52]">更多</Text>
              <ChevronRight size={16} color="#6B5D52" />
            </View>
          </View>
          <View className="grid grid-cols-2 gap-3">
            {RECOMMENDED_PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="bg-[#FDF9F3] rounded-2xl overflow-hidden border border-[#D4C9B8]/50"
                onClick={() => handleProductClick(product.id)}
              >
                <Image
                  src={product.image}
                  className="w-full h-40"
                  mode="aspectFill"
                />
                <CardContent className="p-3">
                  <Text className="text-sm font-medium text-[#2C1810] line-clamp-2 mb-1">
                    {product.name}
                  </Text>
                  <Text className="text-xs text-[#6B5D52] mb-2">{product.constitution}</Text>
                  <View className="flex items-baseline justify-between">
                    <View className="flex items-baseline">
                      <Text className="text-xs text-[#8B2500]">¥</Text>
                      <Text className="text-lg font-bold text-[#8B2500]">{product.price}</Text>
                      <Text className="text-xs text-[#6B5D52]/50 line-through ml-1">¥{product.originalPrice}</Text>
                    </View>
                    <Text className="text-xs text-[#6B5D52]/70">已售{product.sales}</Text>
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
