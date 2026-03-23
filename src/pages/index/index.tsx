import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useEffect } from 'react'
import { ChevronRight, ShoppingBag } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 九大体质数据 - 元古风格配色
const CONSTITUTIONS = [
  { id: 'peaceful', name: '平和质', icon: '☯', desc: '阴阳调和' },
  { id: 'qixu', name: '气虚质', icon: '气', desc: '补气安神' },
  { id: 'yangxu', name: '阳虚质', icon: '阳', desc: '温阳暖身' },
  { id: 'yinxu', name: '阴虚质', icon: '阴', desc: '滋阴润燥' },
  { id: 'tanshi', name: '痰湿质', icon: '湿', desc: '祛湿健脾' },
  { id: 'shire', name: '湿热质', icon: '热', desc: '清热利湿' },
  { id: 'xueyu', name: '血瘀质', icon: '血', desc: '活血化瘀' },
  { id: 'qiyu', name: '气郁质', icon: '郁', desc: '疏肝解郁' },
  { id: 'tebing', name: '特禀质', icon: '敏', desc: '益气固表' },
]

// 图片资源
const IMAGES = {
  brandHero: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
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
    image: IMAGES.brandHero,
    constitution: '平和质',
  },
  {
    id: 'qixu',
    name: '补气安神手串',
    price: 358,
    image: IMAGES.braceletQixu,
    constitution: '气虚质',
  },
  {
    id: 'yangxu',
    name: '温阳暖身手串',
    price: 328,
    image: IMAGES.braceletYangxu,
    constitution: '阳虚质',
  },
  {
    id: 'yinxu',
    name: '滋阴润燥手串',
    price: 368,
    image: IMAGES.braceletYinxu,
    constitution: '阴虚质',
  },
]

const IndexPage: FC = () => {
  useEffect(() => {
    // 初始化检查
  }, [])

  const handleTestClick = () => {
    Taro.switchTab({ url: '/pages/test/index' })
  }

  const handleConstitutionClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleProductClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleMoreClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  return (
    <View className="min-h-screen bg-[#FDF9F3]">
      <ScrollView scrollY className="h-screen">
        {/* 品牌区域 - 极简留白 */}
        <View className="relative pt-20 pb-12 px-5">
          {/* 品牌拼音 - 右侧纵向 */}
          <View className="absolute right-6 top-32 flex flex-col items-center">
            <Text className="text-xs text-gray-400 tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>
              HUAYE SHANGYI
            </Text>
          </View>

          {/* 品牌名称 */}
          <View className="mb-16">
            <Text className="text-3xl font-bold text-[#1A1A1A] tracking-wider">华烨尚医</Text>
            <Text className="text-sm text-gray-500 mt-2 tracking-widest">一人一方 · 一串一养生</Text>
          </View>

          {/* 品牌意境图 */}
          <View className="flex justify-center mb-12">
            <Image
              src={IMAGES.brandHero}
              className="w-64 h-64"
              mode="aspectFit"
            />
          </View>

          {/* 品牌故事入口 */}
          <View 
            className="flex items-center justify-center mb-16"
            onClick={handleTestClick}
          >
            <View className="border border-[#CBBE9C] rounded-full px-8 py-3">
              <Text className="text-[#CBBE9C] text-sm tracking-wider">开始体质测试</Text>
            </View>
          </View>
        </View>

        {/* 九大体质分类 */}
        <View className="bg-white rounded-t-3xl pt-8 pb-6 px-5">
          <View className="flex items-center justify-between mb-6">
            <Text className="text-xl font-bold text-[#1A1A1A]">九大体质</Text>
            <View className="flex items-center" onClick={handleMoreClick}>
              <Text className="text-sm text-[#CBBE9C]">查看全部</Text>
              <ChevronRight size={16} color="#CBBE9C" />
            </View>
          </View>

          <View className="grid grid-cols-3 gap-4">
            {CONSTITUTIONS.slice(0, 6).map((item) => (
              <View
                key={item.id}
                className="flex flex-col items-center py-4"
                onClick={() => handleConstitutionClick(item.id)}
              >
                <View className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                  <Text className="text-2xl">{item.icon}</Text>
                </View>
                <Text className="text-sm font-medium text-[#1A1A1A]">{item.name}</Text>
                <Text className="text-xs text-gray-500 mt-1">{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 精选推荐 */}
        <View className="bg-white py-8 px-5">
          <View className="flex items-center justify-between mb-6">
            <Text className="text-xl font-bold text-[#1A1A1A]">精选推荐</Text>
            <View className="flex items-center" onClick={handleMoreClick}>
              <Text className="text-sm text-[#CBBE9C]">更多</Text>
              <ChevronRight size={16} color="#CBBE9C" />
            </View>
          </View>

          <View className="space-y-4">
            {RECOMMENDED_PRODUCTS.map((product) => (
              <View
                key={product.id}
                className="flex items-start py-4 border-b border-gray-100"
                onClick={() => handleProductClick(product.id)}
              >
                <Image
                  src={product.image}
                  className="w-24 h-24 rounded-lg"
                  mode="aspectFill"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-base font-medium text-[#1A1A1A]">{product.name}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{product.constitution}</Text>
                  <View className="flex items-center justify-between mt-3">
                    <View className="flex items-baseline">
                      <Text className="text-sm text-[#D4A84B]">¥</Text>
                      <Text className="text-xl font-bold text-[#D4A84B]">{product.price}</Text>
                    </View>
                    <View className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                      <ShoppingBag size={20} color="#666" />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 底部留白 */}
        <View className="h-20" />
      </ScrollView>
    </View>
  )
}

export default IndexPage
