import { View, Text, Image } from '@tarojs/components'
import { ChevronRight } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 图片资源
const IMAGES = {
  brandHero: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
}

const IndexPage: FC = () => {
  const handleTestClick = () => {
    Taro.switchTab({ url: '/pages/test/index' })
  }

  return (
    <View className="min-h-screen bg-white flex flex-col">
      {/* 品牌区域 - 极度留白 */}
      <View className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 右侧品牌拼音 - 纵向排列 */}
        <View className="absolute right-6 top-1/3 flex flex-col items-center">
          <Text 
            className="text-xs text-gray-500 font-light"
            style={{ 
              writingMode: 'vertical-rl',
              letterSpacing: '8px'
            }}
          >
            HUAYE SHANGYI
          </Text>
        </View>

        {/* 品牌意境图 - 居中展示 */}
        <View className="flex flex-col items-center">
          <Image
            src={IMAGES.brandHero}
            className="w-64 h-64"
            mode="aspectFit"
          />
        </View>

        {/* 品牌故事入口 */}
        <View 
          className="flex items-center mt-8"
          onClick={handleTestClick}
        >
          <Text className="text-base text-gray-500 font-light">体质测试</Text>
          <ChevronRight size={16} color="#999" className="ml-1" />
        </View>
      </View>

      {/* 底部留白 */}
      <View className="h-24" />
    </View>
  )
}

export default IndexPage
