import { View, Text, ScrollView } from '@tarojs/components'
import { BookOpen, Leaf, Heart, Moon, Sun, Droplets } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 养生知识分类
const KNOWLEDGE_CATEGORIES = [
  {
    id: 'season',
    title: '四季养生',
    desc: '顺应四时，调养身心',
    icon: Sun,
    bgColor: '#F5E6E0',
    iconColor: '#A63D2B'
  },
  {
    id: 'constitution',
    title: '体质调理',
    desc: '九种体质，九种养生',
    icon: Leaf,
    bgColor: '#E8F0E8',
    iconColor: '#4A5D4A'
  },
  {
    id: 'sleep',
    title: '睡眠养生',
    desc: '安神助眠，睡出健康',
    icon: Moon,
    bgColor: '#E8EEF2',
    iconColor: '#4A6572'
  },
  {
    id: 'emotion',
    title: '情志养生',
    desc: '调畅情志，身心和谐',
    icon: Heart,
    bgColor: '#F5EEF5',
    iconColor: '#8B668B'
  },
  {
    id: 'diet',
    title: '饮食养生',
    desc: '药食同源，食养身心',
    icon: Droplets,
    bgColor: '#FBF5E6',
    iconColor: '#B8860B'
  },
  {
    id: 'classic',
    title: '中医典籍',
    desc: '传承经典，智慧养生',
    icon: BookOpen,
    bgColor: '#F5EFE0',
    iconColor: '#5D4E37'
  }
]

// 养生文章列表
const ARTICLES = [
  {
    id: '1',
    title: '春季养生：疏肝理气正当时',
    summary: '春季对应肝，肝主疏泄，春季养生重在养肝护肝...',
    category: '四季养生',
    readTime: '5分钟'
  },
  {
    id: '2',
    title: '气虚体质如何调理？',
    summary: '气虚体质的人容易疲乏、气短、自汗，调理应以补气为主...',
    category: '体质调理',
    readTime: '8分钟'
  },
  {
    id: '3',
    title: '失眠的中医调理方法',
    summary: '失眠多因心神不宁、阴阳失调，可通过中药调理、穴位按摩等方法改善...',
    category: '睡眠养生',
    readTime: '6分钟'
  },
  {
    id: '4',
    title: '《黄帝内经》养生智慧',
    summary: '《黄帝内经》是中医养生的基础典籍，蕴含丰富的养生智慧...',
    category: '中医典籍',
    readTime: '10分钟'
  }
]

const KnowledgePage: FC = () => {
  const handleCategoryClick = (_categoryId: string) => {
    Taro.showToast({ title: '功能开发中', icon: 'none' })
  }

  const handleArticleClick = (_articleId: string) => {
    Taro.showToast({ title: '功能开发中', icon: 'none' })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          养生知识
        </Text>
        <Text 
          className="text-[#8B7355] mt-2"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          中医养生，传承千年智慧
        </Text>
      </View>

      {/* 分类入口 */}
      <View className="px-6 py-4">
        <View className="flex flex-wrap justify-between">
          {KNOWLEDGE_CATEGORIES.map((category) => (
            <View
              key={category.id}
              className="w-[48%] mb-4 p-4 rounded-2xl"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <category.icon size={28} color={category.iconColor} />
              <Text 
                className="text-black mt-3"
                style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
              >
                {category.title}
              </Text>
              <Text 
                className="text-[#8B7355] mt-1"
                style={{ fontSize: '12px', fontWeight: 300 }}
              >
                {category.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 推荐文章 */}
      <View className="px-6 py-4">
        <Text 
          className="text-black mb-4"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
        >
          推荐阅读
        </Text>
        
        {ARTICLES.map((article) => (
          <View
            key={article.id}
            className="py-4 border-b border-gray-100"
            onClick={() => handleArticleClick(article.id)}
          >
            <Text 
              className="text-black"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
            >
              {article.title}
            </Text>
            <Text 
              className="text-[#8B7355] mt-2"
              style={{ fontSize: '13px', fontWeight: 300 }}
            >
              {article.summary}
            </Text>
            <View className="flex items-center justify-between mt-2">
              <Text 
                className="text-[#5D3A1A]"
                style={{ fontSize: '12px', fontWeight: 400 }}
              >
                {article.category}
              </Text>
              <Text 
                className="text-[#999999]"
                style={{ fontSize: '12px', fontWeight: 300 }}
              >
                {article.readTime}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* 底部留白 */}
      <View className="h-24" />
    </ScrollView>
  )
}

export default KnowledgePage
