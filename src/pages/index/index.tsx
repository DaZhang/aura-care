import { View, Text, Image } from '@tarojs/components'
import { Sparkles, ShoppingBag, Heart, BookOpen } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

const IndexPage: FC = () => {
  const handleTestClick = () => {
    Taro.switchTab({ url: '/pages/test/index' })
  }

  const handleCustomizeClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  return (
    <View className="min-h-screen bg-white flex flex-col">
      {/* 顶部留白 */}
      <View className="h-12" />

      {/* 竖排品牌名 - 水墨书法风格 */}
      <View className="flex justify-center">
        <View className="flex flex-col items-center">
          <Text 
            className="text-black"
            style={{ 
              fontSize: '48px',
              fontWeight: 400,
              writingMode: 'vertical-rl',
              letterSpacing: '16px',
              lineHeight: 1.1
            }}
          >
            华烨尚医
          </Text>
        </View>
      </View>

      {/* 中间留白 */}
      <View className="h-10" />

      {/* 品牌意境图 */}
      <View className="flex justify-center px-10">
        <Image
          src="https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561"
          className="w-full"
          mode="widthFix"
        />
      </View>

      {/* 中间留白 */}
      <View className="h-6" />

      {/* 主标题 */}
      <View className="flex justify-center">
        <Text 
          className="text-black"
          style={{ 
            fontSize: '36px',
            fontWeight: 400,
            letterSpacing: '10px'
          }}
        >
          华烨尚医
        </Text>
      </View>

      {/* 英文拼音 */}
      <View className="flex justify-center mt-3">
        <Text 
          className="text-[#333333]"
          style={{ 
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '2px'
          }}
        >
          huaye shangyi
        </Text>
      </View>

      {/* 副标题 */}
      <View className="flex justify-center mt-4">
        <Text 
          className="text-[#8B7355]"
          style={{ 
            fontSize: '16px',
            fontWeight: 300,
            letterSpacing: '4px'
          }}
        >
          一人一手串 · 体质养生
        </Text>
      </View>

      {/* 功能入口区域 */}
      <View className="flex-1 flex flex-col justify-end px-8 pb-8">
        {/* 主要入口 - 体质测试 */}
        <View
          className="flex items-center justify-center py-4 rounded-full mb-4"
          style={{ backgroundColor: '#5D3A1A' }}
          onClick={handleTestClick}
        >
          <Sparkles size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text 
            className="text-white"
            style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
          >
            开始体质测试
          </Text>
        </View>

        {/* 次要入口 */}
        <View className="flex justify-around mt-4">
          <View 
            className="flex flex-col items-center"
            onClick={handleCustomizeClick}
          >
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFE0' }}>
              <ShoppingBag size={22} color="#5D3A1A" />
            </View>
            <Text 
              className="text-[#5D3A1A] mt-2"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              全部手串
            </Text>
          </View>

          <View className="flex flex-col items-center">
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5E6E0' }}>
              <Heart size={22} color="#8B2500" />
            </View>
            <Text 
              className="text-[#8B2500] mt-2"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              养生知识
            </Text>
          </View>

          <View className="flex flex-col items-center">
            <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F0E8' }}>
              <BookOpen size={22} color="#4A5D4A" />
            </View>
            <Text 
              className="text-[#4A5D4A] mt-2"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              中医典籍
            </Text>
          </View>
        </View>
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </View>
  )
}

export default IndexPage
