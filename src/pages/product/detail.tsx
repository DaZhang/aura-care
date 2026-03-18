import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Star, ChevronRight, Info, Package, Shield } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import type { FC } from 'react'

// 图片资源
const IMAGES = {
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
  braceletYangxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
  braceletYinxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
}

// 商品详情数据 - 传统中式配色
const PRODUCT_DETAILS: Record<string, {
  id: string
  name: string
  price: number
  originalPrice: number
  images: string[]
  constitution: string
  constitutionColor: string
  constitutionBg: string
  description: string
  spiceInfo: { name: string; effect: string }[]
  features: string[]
  material: string[]
  sales: number
  rating: number
  reviews: { user: string; avatar: string; content: string; rating: number; date: string }[]
}> = {
  peaceful: {
    id: 'peaceful',
    name: '平和养生手串',
    price: 298,
    originalPrice: 398,
    images: [IMAGES.braceletPeaceful, IMAGES.braceletPeaceful],
    constitution: '平和质',
    constitutionColor: '#5D4E37',
    constitutionBg: '#F5EFE0',
    description: '专为平和质人群设计，选用檀香、沉香、薰衣草等天然香料，帮助维持身体平衡，安神定志。',
    spiceInfo: [
      { name: '檀香', effect: '理气和胃，安神定志' },
      { name: '沉香', effect: '行气止痛，温中止呕' },
      { name: '薰衣草', effect: '舒缓神经，改善睡眠' },
    ],
    features: ['天然香料', '手工编织', '可定制刻字', '养生档案'],
    material: ['紫檀木', '沉香木', '白水晶'],
    sales: 1280,
    rating: 4.9,
    reviews: [
      { user: '清风明月', avatar: IMAGES.braceletPeaceful, content: '手串做工精致，香味淡雅持久，很喜欢！', rating: 5, date: '2024-01-15' },
      { user: '养生达人', avatar: IMAGES.braceletPeaceful, content: '配送到手很满意，已经开始佩戴了。', rating: 5, date: '2024-01-12' },
    ],
  },
  qixu: {
    id: 'qixu',
    name: '补气安神手串',
    price: 358,
    originalPrice: 458,
    images: [IMAGES.braceletQixu],
    constitution: '气虚质',
    constitutionColor: '#CC7722',
    constitutionBg: '#FAF0DC',
    description: '专为气虚质人群设计，选用黄芪、人参、白术等补气药材，帮助提升元气，改善疲劳。',
    spiceInfo: [
      { name: '黄芪', effect: '补气升阳，固表止汗' },
      { name: '人参', effect: '大补元气，复脉固脱' },
      { name: '白术', effect: '健脾益气，燥湿利水' },
    ],
    features: ['天然香料', '补气养生', '可定制刻字', '养生档案'],
    material: ['黄花梨', '蜜蜡', '翡翠'],
    sales: 856,
    rating: 4.8,
    reviews: [],
  },
  yangxu: {
    id: 'yangxu',
    name: '温阳暖身手串',
    price: 328,
    originalPrice: 428,
    images: [IMAGES.braceletYangxu],
    constitution: '阳虚质',
    constitutionColor: '#A63D2B',
    constitutionBg: '#F5E6E0',
    description: '专为阳虚质人群设计，选用肉桂、干姜、杜仲等温阳药材，帮助驱寒暖身，增强体质。',
    spiceInfo: [
      { name: '肉桂', effect: '补火助阳，引火归元' },
      { name: '干姜', effect: '温中散寒，回阳通脉' },
      { name: '杜仲', effect: '补肝肾，强筋骨' },
    ],
    features: ['天然香料', '温阳散寒', '可定制刻字', '养生档案'],
    material: ['红玛瑙', '石榴石', '朱砂'],
    sales: 723,
    rating: 4.9,
    reviews: [],
  },
  yinxu: {
    id: 'yinxu',
    name: '滋阴润燥手串',
    price: 368,
    originalPrice: 468,
    images: [IMAGES.braceletYinxu],
    constitution: '阴虚质',
    constitutionColor: '#4A6572',
    constitutionBg: '#E8EEF2',
    description: '专为阴虚质人群设计，选用麦冬、石斛、百合等滋阴药材，帮助润燥养阴，清热安神。',
    spiceInfo: [
      { name: '麦冬', effect: '养阴润肺，益胃生津' },
      { name: '石斛', effect: '滋阴清热，益胃生津' },
      { name: '百合', effect: '养阴润肺，清心安神' },
    ],
    features: ['天然香料', '滋阴润燥', '可定制刻字', '养生档案'],
    material: ['紫水晶', '月光石', '蓝宝石'],
    sales: 654,
    rating: 4.7,
    reviews: [],
  },
}

const ProductDetailPage: FC = () => {
  const router = useRouter()
  const [product, setProduct] = useState(PRODUCT_DETAILS.peaceful)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const id = router.params.id || 'peaceful'
    if (PRODUCT_DETAILS[id]) {
      setProduct(PRODUCT_DETAILS[id])
    }
  }, [router.params])

  const handleCustomize = () => {
    Taro.navigateTo({ url: `/pages/customize/index?productId=${product.id}` })
  }

  const handleBuyNow = () => {
    Taro.navigateTo({ url: `/pages/customize/index?productId=${product.id}` })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    Taro.showToast({
      title: isFavorite ? '已取消收藏' : '已收藏',
      icon: 'success',
    })
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED] pb-24">
      {/* 商品图片 */}
      <View className="relative">
        <Image
          src={product.images[selectedImage]}
          className="w-full h-96"
          mode="aspectFill"
        />
        {/* 图片指示器 */}
        {product.images.length > 1 && (
          <View className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {product.images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${index === selectedImage ? 'bg-white' : 'bg-white'}`}
                style={index !== selectedImage ? { opacity: 0.5 } : {}}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </View>
        )}
        {/* 体质标签 */}
        <View
          className="absolute top-4 left-4 px-3 py-1 rounded-full"
          style={{ backgroundColor: product.constitutionBg }}
        >
          <Text className="text-sm font-medium" style={{ color: product.constitutionColor }}>
            {product.constitution}
          </Text>
        </View>
      </View>

      <ScrollView scrollY className="h-[calc(100vh-450px)]">
        {/* 基本信息 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-baseline mb-2">
            <Text className="text-sm text-[#6B5D52]">¥</Text>
            <Text className="text-3xl font-bold text-[#8B2500]">{product.price}</Text>
            <Text className="text-sm text-[#8B7355] line-through ml-2">¥{product.originalPrice}</Text>
          </View>
          <Text className="text-lg font-bold text-[#2C1810] mb-2">{product.name}</Text>
          <View className="flex items-center gap-4 text-sm text-[#6B5D52]">
            <View className="flex items-center">
              <Star size={14} color="#CC7722" />
              <Text className="ml-1">{product.rating}</Text>
            </View>
            <Text>已售 {product.sales}</Text>
          </View>
        </View>

        {/* 产品特点 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">产品特点</Text>
          <View className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <View
                key={index}
                className="px-3 py-1 rounded-full bg-[#F7F4ED]"
              >
                <Text className="text-sm text-[#5D4E37]">{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 香料配方 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">专属配方</Text>
          <View className="space-y-3">
            {product.spiceInfo.map((spice, index) => (
              <View key={index} className="flex items-center p-3 bg-[#F7F4ED] rounded-xl">
                <View className="w-10 h-10 rounded-full bg-[#5D3A1A]/10 flex items-center justify-center mr-3">
                  <Text className="text-lg">{['🌿', '🌱', '🍃'][index]}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-[#2C1810]">{spice.name}</Text>
                  <Text className="text-sm text-[#6B5D52]">{spice.effect}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 材质选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">可选材质</Text>
          <View className="flex flex-wrap gap-2">
            {product.material.map((mat, index) => (
              <View
                key={index}
                className="px-4 py-2 rounded-xl border border-[#D4C4B0]"
              >
                <Text className="text-sm text-[#3D2B1F]">{mat}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 产品介绍 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">产品介绍</Text>
          <Text className="text-sm text-gray-600 leading-relaxed">{product.description}</Text>
        </View>

        {/* 用户评价 */}
        {product.reviews.length > 0 && (
          <View className="bg-white p-4 mb-2">
            <View className="flex items-center justify-between mb-3">
              <Text className="text-base font-bold text-gray-900">用户评价</Text>
              <View className="flex items-center">
                <Text className="text-sm text-gray-500">查看全部</Text>
                <ChevronRight size={16} color="#999" />
              </View>
            </View>
            <View className="space-y-3">
              {product.reviews.map((review, index) => (
                <View key={index} className="flex items-start">
                  <Image src={review.avatar} className="w-10 h-10 rounded-full mr-3" />
                  <View className="flex-1">
                    <View className="flex items-center justify-between mb-1">
                      <Text className="font-medium text-gray-900">{review.user}</Text>
                      <Text className="text-xs text-gray-400">{review.date}</Text>
                    </View>
                    <View className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          color={i < review.rating ? '#F59E0B' : '#E0E0E0'}
                        />
                      ))}
                    </View>
                    <Text className="text-sm text-gray-600">{review.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 服务保障 */}
        <View className="bg-white p-4 mb-4">
          <View className="flex justify-around">
            <View className="flex items-center">
              <Shield size={20} color="#1D3A4C" />
              <Text className="text-sm text-gray-600 ml-1">正品保障</Text>
            </View>
            <View className="flex items-center">
              <Package size={20} color="#5D3A1A" />
              <Text className="text-sm text-[#6B5D52] ml-1">急速发货</Text>
            </View>
            <View className="flex items-center">
              <Info size={20} color="#5D3A1A" />
              <Text className="text-sm text-[#6B5D52] ml-1">专业客服</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部操作栏 */}
      <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DDD3] p-4 flex items-center gap-3">
        <View className="flex items-center gap-4">
          <View className="flex flex-col items-center" onClick={toggleFavorite}>
            <Heart size={24} color={isFavorite ? '#8B2500' : '#8B7355'} />
            <Text className="text-xs text-[#6B5D52]">收藏</Text>
          </View>
          <View className="flex flex-col items-center">
            <Share2 size={24} color="#8B7355" />
            <Text className="text-xs text-[#6B5D52]">分享</Text>
          </View>
        </View>
        <View className="flex-1 flex gap-2">
          <Button
            className="flex-1 border border-[#5D3A1A] text-[#5D3A1A] rounded-full py-3"
            onClick={handleCustomize}
          >
            立即定制
          </Button>
          <Button
            className="flex-1 bg-[#8B2500] text-white rounded-full py-3"
            onClick={handleBuyNow}
          >
            立即购买
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProductDetailPage
