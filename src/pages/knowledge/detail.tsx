import { View, Text, ScrollView } from '@tarojs/components'
import { ChevronLeft, Clock, BookOpen } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'

interface ArticleDetail {
  id: string
  title: string
  summary: string
  category: string
  categoryId: string
  readTime: string
  content: string
}

const ArticleDetailPage: FC = () => {
  const router = useRouter()
  const [article, setArticle] = useState<ArticleDetail | null>(null)

  useEffect(() => {
    loadArticle()
  }, [router.params])

  const loadArticle = () => {
    // 从本地存储读取文章详情
    const articleData = Taro.getStorageSync('articleDetail')
    if (articleData) {
      setArticle(JSON.parse(articleData))
    } else {
      Taro.showToast({ title: '文章不存在', icon: 'none' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    }
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  if (!article) {
    return (
      <View className="flex items-center justify-center h-screen bg-white">
        <Text className="text-[#8B7355]">加载中...</Text>
      </View>
    )
  }

  // 将内容按段落分割
  const paragraphs = article.content.split('\n').filter(p => p.trim())

  return (
    <View className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <View 
        className="fixed top-0 left-0 right-0 h-12 flex items-center px-4 bg-white z-50"
        style={{ borderBottomWidth: '1px', borderBottomColor: '#F5F5F5' }}
      >
        <View onClick={handleBack}>
          <ChevronLeft size={24} color="#5D3A1A" />
        </View>
        <Text 
          className="flex-1 text-center text-black"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
        >
          文章详情
        </Text>
        <View className="w-6" />
      </View>

      {/* 内容区域 */}
      <ScrollView scrollY className="pt-12" style={{ height: 'calc(100vh - 48px)' }}>
        {/* 文章标题 */}
        <View className="px-6 pt-6 pb-4">
          <Text 
            className="text-black"
            style={{ fontSize: '22px', fontWeight: 400, letterSpacing: '2px', lineHeight: 1.6 }}
          >
            {article.title}
          </Text>
        </View>

        {/* 文章信息 */}
        <View className="px-6 pb-4 flex items-center">
          <View className="flex items-center mr-4">
            <BookOpen size={14} color="#8B7355" />
            <Text 
              className="text-[#8B7355] ml-1"
              style={{ fontSize: '12px', fontWeight: 300 }}
            >
              {article.category}
            </Text>
          </View>
          <View className="flex items-center">
            <Clock size={14} color="#8B7355" />
            <Text 
              className="text-[#8B7355] ml-1"
              style={{ fontSize: '12px', fontWeight: 300 }}
            >
              {article.readTime}
            </Text>
          </View>
        </View>

        {/* 分割线 */}
        <View className="h-px bg-gray-200 mx-6" />

        {/* 文章摘要 */}
        <View className="px-6 py-4 mx-6 mt-4 rounded-xl" style={{ backgroundColor: '#F5EFE0' }}>
          <Text 
            className="text-[#5D4E37]"
            style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8 }}
          >
            {article.summary}
          </Text>
        </View>

        {/* 文章正文 */}
        <View className="px-6 py-6">
          {paragraphs.map((paragraph, index) => {
            // 判断是否是标题行（以【】包裹）
            const isTitle = paragraph.startsWith('【') && paragraph.endsWith('】')
            // 判断是否是列表项
            const isListItem = paragraph.match(/^\d+\./)
            
            return (
              <Text 
                key={index}
                className="text-black mb-4"
                style={{ 
                  fontSize: isTitle ? '16px' : '15px', 
                  fontWeight: isTitle ? 500 : (isListItem ? 400 : 400), 
                  letterSpacing: '1px', 
                  lineHeight: 1.8,
                  display: 'block'
                }}
              >
                {paragraph}
              </Text>
            )
          })}
        </View>

        {/* 底部留白 */}
        <View className="h-8" />
      </ScrollView>
    </View>
  )
}

export default ArticleDetailPage
