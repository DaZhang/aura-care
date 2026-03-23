import { View, Text, Image } from '@tarojs/components'
import type { FC } from 'react'

const IndexPage: FC = () => {
  return (
    <View className="min-h-screen bg-white flex flex-col">
      {/* 顶部留白 */}
      <View className="h-16" />

      {/* 竖排品牌名 - 元古风格 */}
      <View className="flex justify-center">
        <View className="flex flex-col items-center">
          <Text 
            className="text-black"
            style={{ 
              fontSize: '48px',
              fontWeight: 400,
              writingMode: 'vertical-rl',
              letterSpacing: '12px',
              lineHeight: 1.2
            }}
          >
            华烨尚医
          </Text>
        </View>
      </View>

      {/* 中间留白 */}
      <View className="h-12" />

      {/* 品牌意境图 - 居中展示 */}
      <View className="flex justify-center px-12">
        <Image
          src="https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561"
          className="w-full"
          mode="widthFix"
        />
      </View>

      {/* 中间留白 */}
      <View className="h-8" />

      {/* 主标题 - 元古商店风格 */}
      <View className="flex justify-center">
        <Text 
          className="text-black"
          style={{ 
            fontSize: '36px',
            fontWeight: 400,
            letterSpacing: '8px'
          }}
        >
          华烨尚医
        </Text>
      </View>

      {/* 英文拼音 - 元古风格 */}
      <View className="flex justify-center mt-4">
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

      {/* 底部留白 */}
      <View className="flex-1" />
    </View>
  )
}

export default IndexPage
