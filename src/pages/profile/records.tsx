import { View, Text, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, TrendingUp, Heart, BookOpen, ChevronRight } from 'lucide-react-taro'
import type { FC } from 'react'

// 体质记录数据
const CONSTITUTION_RECORDS = [
  { date: '2024-01-15', type: '平和质', score: 85, color: '#10B981', bg: '#D1FAE5' },
  { date: '2023-10-20', type: '平和质', score: 82, color: '#10B981', bg: '#D1FAE5' },
  { date: '2023-07-08', type: '气虚质', score: 75, color: '#F59E0B', bg: '#FEF3C7' },
]

// 调理记录
const ADJUSTMENT_RECORDS = [
  { 
    date: '2024-01-20', 
    title: '佩戴平和养生手串',
    desc: '开始使用檀香+沉香配方',
    effect: '睡眠质量有所改善'
  },
  { 
    date: '2024-01-10', 
    title: '调整作息时间',
    desc: '每天23点前入睡',
    effect: '精力更加充沛'
  },
  { 
    date: '2023-12-15', 
    title: '开始练习太极',
    desc: '每周三次，每次30分钟',
    effect: '身体柔韧性提升'
  },
]

// 养生建议
const HEALTH_ADVICE = [
  { title: '饮食调理', content: '建议多食用温补食物，如山药、红枣、桂圆等' },
  { title: '运动建议', content: '适合进行温和运动，如散步、太极、瑜伽等' },
  { title: '起居调养', content: '保持规律作息，避免熬夜，保证充足睡眠' },
]

const RecordsPage: FC = () => {
  const [constitution] = useState(CONSTITUTION_RECORDS[0])

  return (
    <View className="min-h-screen bg-[#F5F5F5]">
      <ScrollView scrollY className="h-screen">
        {/* 当前体质 */}
        <View className="bg-gradient-to-b from-[#1D3A4C] to-[#2D5A6C] px-4 pt-6 pb-8">
          <Text className="text-white text-sm mb-2" style={{ opacity: 0.7 }}>当前体质</Text>
          <View className="flex items-center mb-4">
            <View 
              className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: constitution.bg }}
            >
              <Text className="text-2xl font-bold" style={{ color: constitution.color }}>
                {constitution.type.charAt(0)}
              </Text>
            </View>
            <View>
              <Text className="text-white text-xl font-bold">{constitution.type}</Text>
              <View className="flex items-center mt-1">
                <View className="flex-1 h-2 bg-white rounded-full mr-2" style={{ width: 100, opacity: 0.2 }}>
                  <View 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${constitution.score}%` }}
                  />
                </View>
                <Text className="text-white text-sm">{constitution.score}分</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-sm" style={{ opacity: 0.7 }}>
            上次测试: {constitution.date}
          </Text>
        </View>

        {/* 体质变化趋势 */}
        <View className="px-4 -mt-4">
          <Card className="bg-white rounded-2xl shadow-sm mb-4">
            <CardContent className="p-4">
              <View className="flex items-center mb-3">
                <TrendingUp size={20} color="#1D3A4C" />
                <Text className="text-base font-bold text-gray-900 ml-2">体质变化趋势</Text>
              </View>
              <View className="space-y-3">
                {CONSTITUTION_RECORDS.map((record, index) => (
                  <View key={index} className="flex items-center">
                    <Text className="text-sm text-gray-500 w-24">{record.date}</Text>
                    <View 
                      className="px-3 py-1 rounded-full mr-2"
                      style={{ backgroundColor: record.bg }}
                    >
                      <Text className="text-sm" style={{ color: record.color }}>{record.type}</Text>
                    </View>
                    <Text className="text-sm text-gray-600">{record.score}分</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* 调理记录 */}
        <View className="px-4 mb-4">
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <View className="flex items-center justify-between mb-3">
                <View className="flex items-center">
                  <Calendar size={20} color="#1D3A4C" />
                  <Text className="text-base font-bold text-gray-900 ml-2">调理记录</Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </View>
              <View className="space-y-4">
                {ADJUSTMENT_RECORDS.map((record, index) => (
                  <View key={index} className="border-l-2 border-[#1D3A4C]/20 pl-4">
                    <Text className="text-xs text-gray-400 mb-1">{record.date}</Text>
                    <Text className="text-base font-medium text-gray-900 mb-1">{record.title}</Text>
                    <Text className="text-sm text-gray-600">{record.desc}</Text>
                    {record.effect && (
                      <Text className="text-sm text-[#10B981] mt-1">效果: {record.effect}</Text>
                    )}
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* 养生建议 */}
        <View className="px-4 mb-4">
          <Card className="bg-white rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <View className="flex items-center mb-3">
                <BookOpen size={20} color="#1D3A4C" />
                <Text className="text-base font-bold text-gray-900 ml-2">专属养生建议</Text>
              </View>
              <View className="space-y-4">
                {HEALTH_ADVICE.map((advice, index) => (
                  <View key={index} className="flex items-start">
                    <View className="w-8 h-8 rounded-full bg-[#1D3A4C]/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Heart size={16} color="#1D3A4C" />
                    </View>
                    <View>
                      <Text className="text-base font-medium text-gray-900 mb-1">{advice.title}</Text>
                      <Text className="text-sm text-gray-600">{advice.content}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* 重新测试 */}
        <View className="px-4 mb-8">
          <View 
            className="bg-[#1D3A4C] rounded-2xl p-4 flex items-center justify-between"
            onClick={() => {
              // 跳转到测试页
            }}
          >
            <View>
              <Text className="text-white text-base font-bold">体质可能变化了？</Text>
              <Text className="text-white text-sm mt-1" style={{ opacity: 0.7 }}>重新测试获取最新体质报告</Text>
            </View>
            <ChevronRight size={24} color="#fff" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default RecordsPage
