import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Sparkles } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 九大体质测试题
const TEST_QUESTIONS = [
  {
    id: 1,
    question: '您是否容易感到疲乏无力？',
    options: [
      { text: '经常如此', score: { 气虚: 3, 阳虚: 2 } },
      { text: '偶尔这样', score: { 气虚: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { 阴虚: 1 } },
    ],
  },
  {
    id: 2,
    question: '您是否容易手脚冰凉？',
    options: [
      { text: '经常如此', score: { 阳虚: 3, 血瘀: 1 } },
      { text: '偶尔这样', score: { 阳虚: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { 阴虚: 1 } },
    ],
  },
  {
    id: 3,
    question: '您是否容易出汗，尤其是活动后？',
    options: [
      { text: '经常如此', score: { 气虚: 3 } },
      { text: '偶尔这样', score: { 气虚: 1 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 4,
    question: '您是否容易口干舌燥？',
    options: [
      { text: '经常如此', score: { 阴虚: 3, 湿热: 1 } },
      { text: '偶尔这样', score: { 阴虚: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { 痰湿: 1 } },
    ],
  },
  {
    id: 5,
    question: '您是否容易情绪低落或焦虑？',
    options: [
      { text: '经常如此', score: { 气郁: 3 } },
      { text: '偶尔这样', score: { 气郁: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 6,
    question: '您是否容易皮肤过敏或出现皮疹？',
    options: [
      { text: '经常如此', score: { 特禀: 3, 湿热: 1 } },
      { text: '偶尔这样', score: { 特禀: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 7,
    question: '您是否容易面部油腻或长痘？',
    options: [
      { text: '经常如此', score: { 湿热: 3, 痰湿: 1 } },
      { text: '偶尔这样', score: { 湿热: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 8,
    question: '您是否容易身体沉重或困倦？',
    options: [
      { text: '经常如此', score: { 痰湿: 3, 湿热: 1 } },
      { text: '偶尔这样', score: { 痰湿: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 9,
    question: '您是否容易头痛或身体疼痛？',
    options: [
      { text: '经常如此', score: { 血瘀: 3, 气郁: 1 } },
      { text: '偶尔这样', score: { 血瘀: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 10,
    question: '您整体感觉精力充沛吗？',
    options: [
      { text: '非常充沛', score: { 平和: 3 } },
      { text: '比较充沛', score: { 平和: 2 } },
      { text: '一般', score: {} },
      { text: '不太充沛', score: { 气虚: 1, 阳虚: 1 } },
    ],
  },
]

// 体质信息 - 中式配色
const CONSTITUTION_INFO: Record<string, { name: string; color: string; bg: string; description: string; spice: string }> = {
  平和: {
    name: '平和质',
    color: '#5D4E37',
    bg: '#F5EFE0',
    description: '阴阳气血调和，体态适中、面色红润、精力充沛',
    spice: '檀香+沉香+薰衣草',
  },
  气虚: {
    name: '气虚质',
    color: '#CC7722',
    bg: '#FAF0DC',
    description: '元气不足，易疲乏、气短、自汗',
    spice: '黄芪+人参+白术',
  },
  阳虚: {
    name: '阳虚质',
    color: '#A63D2B',
    bg: '#F5E6E0',
    description: '阳气不足，畏寒怕冷、手足不温',
    spice: '肉桂+干姜+杜仲',
  },
  阴虚: {
    name: '阴虚质',
    color: '#4A6572',
    bg: '#E8EEF2',
    description: '阴液亏少，口燥咽干、手足心热',
    spice: '麦冬+石斛+百合',
  },
  痰湿: {
    name: '痰湿质',
    color: '#5C6B4E',
    bg: '#EEF2E8',
    description: '痰湿凝聚，形体肥胖、腹部肥满',
    spice: '陈皮+茯苓+苍术',
  },
  湿热: {
    name: '湿热质',
    color: '#B8860B',
    bg: '#FBF5E6',
    description: '湿热内蕴，面垢油光、易生痤疮',
    spice: '藿香+佩兰+荷叶',
  },
  血瘀: {
    name: '血瘀质',
    color: '#8B0000',
    bg: '#F5E6E6',
    description: '血行不畅，肤色晦暗、易有瘀斑',
    spice: '丹参+红花+川芎',
  },
  气郁: {
    name: '气郁质',
    color: '#4A5D4A',
    bg: '#E8F0E8',
    description: '气机郁滞，情绪低落、易焦虑',
    spice: '玫瑰+合欢花+佛手',
  },
  特禀: {
    name: '特禀质',
    color: '#8B668B',
    bg: '#F5EEF5',
    description: '先天失常，易过敏、有遗传倾向',
    spice: '黄芪+防风+甘草',
  },
}

const TestPage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<string>('')

  const progress = ((currentIndex + 1) / TEST_QUESTIONS.length) * 100
  const currentQuestion = TEST_QUESTIONS[currentIndex]

  const handleSelect = (score: Record<string, number>) => {
    // 累加分数
    const newAnswers = { ...answers }
    Object.entries(score).forEach(([key, value]) => {
      newAnswers[key] = (newAnswers[key] || 0) + value
    })
    setAnswers(newAnswers)

    // 下一题或完成
    if (currentIndex < TEST_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // 计算结果
      const sorted = Object.entries(newAnswers).sort((a, b) => b[1] - a[1])
      const topConstitution = sorted[0]?.[0] || '平和'
      setResult(topConstitution)
      setIsCompleted(true)
    }
  }

  const handleViewResult = () => {
    Taro.navigateTo({ url: `/pages/test/result?type=${result}` })
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers({})
    setIsCompleted(false)
    setResult('')
  }

  if (isCompleted) {
    const info = CONSTITUTION_INFO[result] || CONSTITUTION_INFO.平和
    return (
      <View className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* 东方装饰元素 */}
        <View className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: info.color, transform: 'translate(-50%, -50%)' }} />
        <View className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: info.color, transform: 'translate(50%, 50%)' }} />
        
        <View 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10" 
          style={{ backgroundColor: info.bg }}
        >
          <Sparkles size={48} color={info.color} />
        </View>
        
        {/* 体质名称 - 水墨风格 */}
        <Text 
          className="mb-2"
          style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '6px', color: info.color }}
        >
          {info.name}
        </Text>
        
        <Text 
          className="text-center mb-8 px-6"
          style={{ fontSize: '15px', fontWeight: 300, color: '#8B7355', lineHeight: 1.8 }}
        >
          {info.description}
        </Text>
        
        <View className="w-full space-y-3">
          <View
            className="w-full rounded-full py-4 flex items-center justify-center"
            style={{ backgroundColor: '#EBE3D5' }}
            onClick={handleViewResult}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
            >
              查看详细报告
            </Text>
          </View>
          <View
            className="w-full border-2 rounded-full py-4 flex items-center justify-center"
            style={{ borderColor: '#5D3A1A' }}
            onClick={handleRestart}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
            >
              重新测试
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-white p-6">
      {/* 进度条 */}
      <View className="mb-8">
        <View className="flex justify-between items-center mb-3">
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            体质测试
          </Text>
          <Text 
            className="text-[#8B7355]"
            style={{ fontSize: '14px', fontWeight: 300 }}
          >
            {currentIndex + 1}/{TEST_QUESTIONS.length}
          </Text>
        </View>
        <Progress value={progress} className="h-1" />
      </View>

      {/* 问题卡片 */}
      <Card className="bg-white rounded-2xl shadow-sm mb-6 border border-gray-100">
        <CardContent className="p-6">
          <Text 
            className="mb-8 block"
            style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px', color: '#2C1810', lineHeight: 1.6 }}
          >
            {currentQuestion.question}
          </Text>
          <View className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <View
                key={index}
                className="p-4 rounded-xl active:opacity-80 transition-opacity"
                style={{ backgroundColor: '#F7F4ED' }}
                onClick={() => handleSelect(option.score)}
              >
                <View className="flex justify-between items-center">
                  <Text 
                    className="text-[#3D2B1F]"
                    style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
                  >
                    {option.text}
                  </Text>
                  <ChevronRight size={20} color="#8B7355" />
                </View>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* 提示 */}
      <Text 
        className="text-center"
        style={{ fontSize: '13px', fontWeight: 300, color: '#8B7355' }}
      >
        请根据您最近一个月的实际情况选择
      </Text>
    </View>
  )
}

export default TestPage
