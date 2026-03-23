import { View, Text, Image } from '@tarojs/components'
import { Sparkles, ShoppingBag, Heart, BookOpen, Camera, MessageCircle } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

const IndexPage: FC = () => {
  const handleTestClick = () => {
    Taro.navigateTo({ url: '/pages/test/index' })
  }

  const handleCustomizeClick = () => {
    Taro.switchTab({ url: '/pages/customize/index' })
  }

  const handleKnowledgeClick = () => {
    Taro.navigateTo({ url: '/pages/knowledge/index' })
  }

  const handleClassicClick = () => {
    Taro.navigateTo({ url: '/pages/knowledge/index?category=classic' })
  }

  const handleCameraClick = () => {
    Taro.showToast({ title: '智能识药功能开发中', icon: 'none' })
  }

  const handleConsultClick = () => {
    Taro.navigateTo({ url: '/pages/message/index' })
  }

  return (
    <View className="min-h-screen bg-white flex flex-col">
      {/* 顶部留白 */}
      <View className="h-24" />

      {/* 竖排品牌名 - 小字号元古风格 */}
      <View className="flex justify-center">
        <View className="flex flex-col items-center">
          <Text 
            className="text-black"
            style={{ 
              fontSize: '28px',
              fontWeight: 400,
              writingMode: 'vertical-rl',
              letterSpacing: '8px',
              lineHeight: 1.1
            }}
          >
            华烨
          </Text>
        </View>
      </View>

      {/* 中间留白 */}
      <View className="h-8" />

      {/* 品牌意境图 */}
      <View className="flex justify-center px-12">
        <Image
          src="https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561"
          className="w-full"
          mode="widthFix"
        />
      </View>

      {/* 中间留白 */}
      <View className="h-5" />

      {/* 英文拼音 */}
      <View className="flex justify-center">
        <Text 
          className="text-[#333333]"
          style={{ 
            fontSize: '12px',
            fontWeight: 300,
            letterSpacing: '2px'
          }}
        >
          huaye
        </Text>
      </View>

      {/* 口号 */}
      <View className="flex justify-center mt-3">
        <Text 
          className="text-[#8B7355]"
          style={{ 
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '2px'
          }}
        >
          一人一方，一串一养生
        </Text>
      </View>

      {/* 功能入口区域 */}
      <View className="flex-1 flex flex-col justify-end px-8 pb-6">
        {/* 主要入口 - 体质测试 */}
        <View
          className="flex items-center justify-center py-3 rounded-full mb-5"
          style={{ backgroundColor: '#C9B78F' }}
          onClick={handleTestClick}
        >
          <Sparkles size={16} color="#5D3A1A" style={{ marginRight: 6 }} />
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '2px' }}
          >
            开始体质测试
          </Text>
        </View>

        {/* 次要入口 - 不同的图标 */}
        <View className="flex justify-around">
          <View 
            className="flex flex-col items-center"
            onClick={handleCustomizeClick}
          >
            <View className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EFE0' }}>
              <ShoppingBag size={18} color="#5D3A1A" />
            </View>
            <Text 
              className="text-[#5D3A1A] mt-2"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              全部手串
            </Text>
          </View>

          <View 
            className="flex flex-col items-center"
            onClick={handleKnowledgeClick}
          >
            <View className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5E6E0' }}>
              <Heart size={18} color="#8B2500" />
            </View>
            <Text 
              className="text-[#8B2500] mt-2"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              养生知识
            </Text>
          </View>

          <View 
            className="flex flex-col items-center"
            onClick={handleClassicClick}
          >
            <View className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F0E8' }}>
              <BookOpen size={18} color="#4A5D4A" />
            </View>
            <Text 
              className="text-[#4A5D4A] mt-2"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              中医典籍
            </Text>
          </View>

          <View 
            className="flex flex-col items-center"
            onClick={handleCameraClick}
          >
            <View className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8EEF2' }}>
              <Camera size={18} color="#4A6572" />
            </View>
            <Text 
              className="text-[#4A6572] mt-2"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              智能识药
            </Text>
          </View>

          <View 
            className="flex flex-col items-center"
            onClick={handleConsultClick}
          >
            <View className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5EEF5' }}>
              <MessageCircle size={18} color="#8B668B" />
            </View>
            <Text 
              className="text-[#8B668B] mt-2"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              在线咨询
            </Text>
          </View>
        </View>
      </View>

      {/* 底部留白 */}
      <View className="h-4" />
    </View>
  )
}

export default IndexPage
