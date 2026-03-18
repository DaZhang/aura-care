import { View, Text } from '@tarojs/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingBag, Heart, BookOpen } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'

// 体质详细信息
const CONSTITUTION_DETAILS: Record<string, {
  name: string
  color: string
  bg: string
  description: string
  features: string[]
  spice: string
  spiceInfo: { name: string; effect: string }[]
  advice: string[]
  productId: string
}> = {
  平和: {
    name: '平和质',
    color: '#10B981',
    bg: '#D1FAE5',
    description: '阴阳气血调和，体态适中、面色红润、精力充沛',
    features: ['体态适中', '面色红润', '精力充沛', '睡眠良好', '二便正常'],
    spice: '檀香+沉香+薰衣草',
    spiceInfo: [
      { name: '檀香', effect: '理气和胃，安神定志' },
      { name: '沉香', effect: '行气止痛，温中止呕' },
      { name: '薰衣草', effect: '舒缓神经，改善睡眠' },
    ],
    advice: ['保持规律作息', '适度运动', '饮食均衡', '保持心情愉悦'],
    productId: 'peaceful',
  },
  气虚: {
    name: '气虚质',
    color: '#F59E0B',
    bg: '#FEF3C7',
    description: '元气不足，易疲乏、气短、自汗',
    features: ['容易疲乏', '声音低弱', '易出汗', '易感冒', '舌淡红'],
    spice: '黄芪+人参+白术',
    spiceInfo: [
      { name: '黄芪', effect: '补气升阳，固表止汗' },
      { name: '人参', effect: '大补元气，复脉固脱' },
      { name: '白术', effect: '健脾益气，燥湿利水' },
    ],
    advice: ['避免剧烈运动', '注意保暖', '多吃补气食物', '充足休息'],
    productId: 'qixu',
  },
  阳虚: {
    name: '阳虚质',
    color: '#EF4444',
    bg: '#FEE2E2',
    description: '阳气不足，畏寒怕冷、手足不温',
    features: ['畏寒怕冷', '手足不温', '面色柔白', '口淡不渴', '喜热饮'],
    spice: '肉桂+干姜+杜仲',
    spiceInfo: [
      { name: '肉桂', effect: '补火助阳，引火归元' },
      { name: '干姜', effect: '温中散寒，回阳通脉' },
      { name: '杜仲', effect: '补肝肾，强筋骨' },
    ],
    advice: ['注意保暖', '多晒太阳', '避免寒凉食物', '适量运动'],
    productId: 'yangxu',
  },
  阴虚: {
    name: '阴虚质',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    description: '阴液亏少，口燥咽干、手足心热',
    features: ['口燥咽干', '手足心热', '面色潮红', '易失眠', '大便干燥'],
    spice: '麦冬+石斛+百合',
    spiceInfo: [
      { name: '麦冬', effect: '养阴润肺，益胃生津' },
      { name: '石斛', effect: '滋阴清热，益胃生津' },
      { name: '百合', effect: '养阴润肺，清心安神' },
    ],
    advice: ['避免熬夜', '少吃辛辣', '多吃滋阴食物', '保持心情平和'],
    productId: 'yinxu',
  },
  痰湿: {
    name: '痰湿质',
    color: '#6B7280',
    bg: '#F3F4F6',
    description: '痰湿凝聚，形体肥胖、腹部肥满',
    features: ['形体肥胖', '腹部肥满', '口黏苔腻', '身重不爽', '喜食肥甘'],
    spice: '陈皮+茯苓+苍术',
    spiceInfo: [
      { name: '陈皮', effect: '理气健脾，燥湿化痰' },
      { name: '茯苓', effect: '利水渗湿，健脾宁心' },
      { name: '苍术', effect: '燥湿健脾，祛风散寒' },
    ],
    advice: ['控制饮食', '加强运动', '少吃甜食油腻', '规律作息'],
    productId: 'tanshi',
  },
  湿热: {
    name: '湿热质',
    color: '#F97316',
    bg: '#FFEDD5',
    description: '湿热内蕴，面垢油光、易生痤疮',
    features: ['面垢油光', '易生痤疮', '口苦口干', '身重困倦', '大便黏滞'],
    spice: '藿香+佩兰+荷叶',
    spiceInfo: [
      { name: '藿香', effect: '化湿醒脾，解暑发表' },
      { name: '佩兰', effect: '化湿解暑，醒脾开胃' },
      { name: '荷叶', effect: '清热解暑，升发清阳' },
    ],
    advice: ['清淡饮食', '避免湿热环境', '多吃清热食物', '适量运动'],
    productId: 'shire',
  },
  血瘀: {
    name: '血瘀质',
    color: '#DC2626',
    bg: '#FEE2E2',
    description: '血行不畅，肤色晦暗、易有瘀斑',
    features: ['肤色晦暗', '易有瘀斑', '口唇暗淡', '易有疼痛', '舌质暗'],
    spice: '丹参+红花+川芎',
    spiceInfo: [
      { name: '丹参', effect: '活血祛瘀，通经止痛' },
      { name: '红花', effect: '活血通经，散瘀止痛' },
      { name: '川芎', effect: '活血行气，祛风止痛' },
    ],
    advice: ['避免久坐', '适量运动', '保持心情舒畅', '注意保暖'],
    productId: 'xueyu',
  },
  气郁: {
    name: '气郁质',
    color: '#6366F1',
    bg: '#E0E7FF',
    description: '气机郁滞，情绪低落、易焦虑',
    features: ['情绪低落', '易焦虑', '胸闷叹气', '咽喉有异物感', '易失眠'],
    spice: '玫瑰+合欢花+佛手',
    spiceInfo: [
      { name: '玫瑰', effect: '疏肝解郁，理气止痛' },
      { name: '合欢花', effect: '解郁安神，理气开胃' },
      { name: '佛手', effect: '疏肝理气，和胃止痛' },
    ],
    advice: ['保持心情愉悦', '多参加社交活动', '适量运动', '学会释放压力'],
    productId: 'qiyu',
  },
  特禀: {
    name: '特禀质',
    color: '#EC4899',
    bg: '#FCE7F3',
    description: '先天失常，易过敏、有遗传倾向',
    features: ['易过敏', '易打喷嚏', '皮肤敏感', '有遗传倾向', '易患哮喘'],
    spice: '黄芪+防风+甘草',
    spiceInfo: [
      { name: '黄芪', effect: '补气固表，托毒排脓' },
      { name: '防风', effect: '祛风解表，胜湿止痛' },
      { name: '甘草', effect: '补脾益气，清热解毒' },
    ],
    advice: ['避免过敏原', '增强体质', '注意饮食', '定期体检'],
    productId: 'tebing',
  },
}

const ResultPage: FC = () => {
  const router = useRouter()
  const [constitution, setConstitution] = useState<string>('平和')

  useEffect(() => {
    const type = router.params.type || '平和'
    setConstitution(type)
  }, [router.params])

  const info = CONSTITUTION_DETAILS[constitution] || CONSTITUTION_DETAILS.平和

  const handleCustomize = () => {
    Taro.navigateTo({ url: `/pages/customize/index?type=${constitution}` })
  }

  const handleViewProduct = () => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${info.productId}` })
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* 头部 */}
      <View className="relative pt-6 pb-12 px-4" style={{ backgroundColor: info.bg }}>
        <View className="flex items-center justify-center mb-4">
          <View className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: info.color }}>
            <Text className="text-white text-3xl font-bold">{constitution.charAt(0)}</Text>
        </View>
        </View>
        <Text className="text-2xl font-bold text-center mb-2" style={{ color: info.color }}>
          {info.name}
        </Text>
        <Text className="text-sm text-gray-600 text-center px-8">
          {info.description}
        </Text>
      </View>

      {/* 内容区 */}
      <View className="px-4 -mt-6">
        {/* 体质特征 */}
        <Card className="bg-white rounded-2xl shadow-sm mb-4">
          <CardContent className="p-4">
            <View className="flex items-center mb-3">
              <Heart size={20} color={info.color} />
              <Text className="text-base font-medium ml-2">体质特征</Text>
            </View>
            <View className="flex flex-wrap gap-2">
              {info.features.map((feature, index) => (
                <View
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: info.bg, color: info.color }}
                >
                  <Text>{feature}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* 推荐香料 */}
        <Card className="bg-white rounded-2xl shadow-sm mb-4">
          <CardContent className="p-4">
            <View className="flex items-center mb-3">
              <BookOpen size={20} color={info.color} />
              <Text className="text-base font-medium ml-2">专属配方</Text>
            </View>
            <Text className="text-sm text-gray-600 mb-3">{info.spice}</Text>
            <View className="space-y-2">
              {info.spiceInfo.map((spice, index) => (
                <View key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-xl">
                  <Text className="font-medium text-gray-900">{spice.name}</Text>
                  <Text className="text-sm text-gray-500 flex-1 ml-4 text-right">{spice.effect}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* 调理建议 */}
        <Card className="bg-white rounded-2xl shadow-sm mb-4">
          <CardContent className="p-4">
            <View className="flex items-center mb-3">
              <ShoppingBag size={20} color={info.color} />
              <Text className="text-base font-medium ml-2">调理建议</Text>
            </View>
            <View className="space-y-2">
              {info.advice.map((item, index) => (
                <View key={index} className="flex items-center">
                  <View className="w-6 h-6 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: info.bg }}>
                    <Text className="text-xs" style={{ color: info.color }}>{index + 1}</Text>
                  </View>
                  <Text className="text-sm text-gray-700">{item}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 底部按钮 */}
      <View className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <View className="flex gap-3">
          <Button
            className="flex-1 bg-[#1D3A4C] text-white rounded-full py-3"
            onClick={handleCustomize}
          >
            立即定制手串
          </Button>
          <Button
            className="flex-1 border border-[#E54B4B] text-[#E54B4B] rounded-full py-3"
            onClick={handleViewProduct}
          >
            查看推荐商品
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ResultPage
