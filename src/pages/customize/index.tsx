import { View, Text, ScrollView, Input } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Plus, Minus, Sparkles, Check } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import type { FC } from 'react'

// 香料数据
const SPICES = {
  core: [
    { id: 'tanxiang', name: '檀香', effect: '理气和胃，安神定志', color: '#8B4513' },
    { id: 'chenxiang', name: '沉香', effect: '行气止痛，温中止呕', color: '#2F4F4F' },
    { id: 'huangqi', name: '黄芪', effect: '补气升阳，固表止汗', color: '#DAA520' },
    { id: 'rougui', name: '肉桂', effect: '补火助阳，引火归元', color: '#CD853F' },
  ],
  auxiliary: [
    { id: 'xunyicao', name: '薰衣草', effect: '舒缓神经，改善睡眠', color: '#9370DB' },
    { id: 'meigui', name: '玫瑰', effect: '疏肝解郁，理气止痛', color: '#FF69B4' },
    { id: 'baihe', name: '百合', effect: '养阴润肺，清心安神', color: '#FFFACD' },
    { id: 'chenpi', name: '陈皮', effect: '理气健脾，燥湿化痰', color: '#FFA500' },
  ],
}

// 材质数据
const MATERIALS = [
  { id: 'zitan', name: '紫檀木', price: 0, color: '#8B0000', desc: '经典选择，温润如玉' },
  { id: 'huanghuali', name: '黄花梨', price: 100, color: '#DAA520', desc: '珍贵木种，纹理优美' },
  { id: 'baijing', name: '白水晶', price: 80, color: '#F0FFFF', desc: '纯净通透，能量纯净' },
  { id: 'zishuijing', name: '紫水晶', price: 120, color: '#9370DB', desc: '智慧之石，安神助眠' },
  { id: 'hongma', name: '红玛瑙', price: 60, color: '#B22222', desc: '热情活力，温暖护身' },
  { id: 'liuli', name: '琉璃', price: 50, color: '#87CEEB', desc: '流光溢彩，灵动优雅' },
]

// 长度选项
const LENGTHS = [
  { id: 'small', name: '小号', size: '15cm', desc: '适合纤细手腕' },
  { id: 'medium', name: '中号', size: '17cm', desc: '标准尺寸' },
  { id: 'large', name: '大号', size: '19cm', desc: '适合较粗手腕' },
]

const CustomizePage: FC = () => {
  const router = useRouter()
  const [, setConstitutionType] = useState<string>('')
  
  // 香料配比
  const [coreSpice, setCoreSpice] = useState('tanxiang')
  const [auxiliarySpice, setAuxiliarySpice] = useState('xunyicao')
  const [coreRatio, setCoreRatio] = useState(70)
  
  // 材质与尺寸
  const [material, setMaterial] = useState('zitan')
  const [length, setLength] = useState('medium')
  
  // 刻字
  const [engraving, setEngraving] = useState('')
  
  // 数量
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (router.params.type) {
      setConstitutionType(router.params.type)
    }
  }, [router.params])

  // 计算价格
  const calculatePrice = () => {
    const basePrice = 298
    const materialExtra = MATERIALS.find(m => m.id === material)?.price || 0
    const engravingExtra = engraving ? 20 : 0
    return (basePrice + materialExtra + engravingExtra) * quantity
  }

  const handleEngravingChange = (value: string) => {
    if (value.length <= 6) {
      setEngraving(value)
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleSubmit = () => {
    const orderData = {
      coreSpice,
      auxiliarySpice,
      coreRatio,
      material,
      length,
      engraving,
      quantity,
      price: calculatePrice(),
    }
    console.log('提交订单:', orderData)
    Taro.showToast({
      title: '订单提交成功',
      icon: 'success',
    })
  }

  const selectedMaterial = MATERIALS.find(m => m.id === material)

  return (
    <View className="min-h-screen bg-[#F5F5F5] pb-24">
      <ScrollView scrollY className="h-[calc(100vh-100px)]">
        {/* 预览区 */}
        <View className="bg-gradient-to-b from-[#1D3A4C] to-[#2D5A6C] p-6 pb-8 relative overflow-hidden">
          {/* 东方装饰元素 */}
          <View className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#D4AF37] opacity-5" style={{ transform: 'translate(-50%, -50%)' }} />
          <View className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#E54B4B] opacity-5" style={{ transform: 'translate(30%, 30%)' }} />
          
          <View className="flex items-center justify-center mb-4 relative z-10">
            <View className="w-48 h-48 rounded-full bg-white bg-opacity-10 flex items-center justify-center relative">
              <View 
                className="w-36 h-36 rounded-full border-4 border-white flex items-center justify-center"
                style={{ borderColor: selectedMaterial?.color || '#fff', opacity: 0.3 }}
              >
                <Sparkles size={60} color="#fff" />
              </View>
              {/* 装饰环 */}
              <View className="absolute inset-0 rounded-full border border-white" style={{ opacity: 0.2 }} />
              <View className="absolute inset-4 rounded-full border border-white" style={{ opacity: 0.1 }} />
            </View>
          </View>
          <Text className="text-white text-center text-sm opacity-70">
            手串预览图（实际效果以实物为准）
          </Text>
        </View>

        {/* 核心香料选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">核心香料</Text>
          <View className="grid grid-cols-2 gap-3">
            {SPICES.core.map((spice) => (
              <View
                key={spice.id}
                className={`p-3 rounded-xl border-2 ${
                  coreSpice === spice.id ? 'border-[#1D3A4C]' : 'border-gray-100'
                }`}
                onClick={() => setCoreSpice(spice.id)}
              >
                <View className="flex items-center mb-1">
                  <View
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: spice.color }}
                  />
                  <Text className="font-medium text-gray-900">{spice.name}</Text>
                  {coreSpice === spice.id && <Check size={16} color="#1D3A4C" className="ml-auto" />}
                </View>
                <Text className="text-xs text-gray-500">{spice.effect}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 辅助香料选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">辅助香料</Text>
          <View className="grid grid-cols-2 gap-3">
            {SPICES.auxiliary.map((spice) => (
              <View
                key={spice.id}
                className={`p-3 rounded-xl border-2 ${
                  auxiliarySpice === spice.id ? 'border-[#1D3A4C]' : 'border-gray-100'
                }`}
                onClick={() => setAuxiliarySpice(spice.id)}
              >
                <View className="flex items-center mb-1">
                  <View
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: spice.color }}
                  />
                  <Text className="font-medium text-gray-900">{spice.name}</Text>
                  {auxiliarySpice === spice.id && <Check size={16} color="#1D3A4C" className="ml-auto" />}
                </View>
                <Text className="text-xs text-gray-500">{spice.effect}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 配比调整 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-gray-900">香料配比</Text>
            <Text className="text-sm text-gray-500">核心 {coreRatio}% / 辅助 {100 - coreRatio}%</Text>
          </View>
          <Slider
            value={[coreRatio]}
            onValueChange={(value) => setCoreRatio(value[0])}
            max={100}
            step={5}
            className="w-full"
          />
            <View className="flex justify-between mt-2">
              <Text className="text-xs text-gray-400">辅助为主</Text>
              <Text className="text-xs text-gray-400">核心为主</Text>
            </View>
        </View>

        {/* 材质选择 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-gray-900">珠串材质</Text>
            <Text className="text-sm text-[#E54B4B]">+¥{selectedMaterial?.price || 0}</Text>
          </View>
          <View className="grid grid-cols-3 gap-2">
            {MATERIALS.map((mat) => (
              <View
                key={mat.id}
                className={`p-3 rounded-xl border-2 text-center ${
                  material === mat.id ? 'border-[#1D3A4C]' : 'border-gray-100'
                }`}
                onClick={() => setMaterial(mat.id)}
              >
                <View
                  className="w-8 h-8 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: mat.color }}
                />
                <Text className="text-sm font-medium text-gray-900">{mat.name}</Text>
                {mat.price > 0 && (
                  <Text className="text-xs text-gray-500">+¥{mat.price}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 尺寸选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">手串尺寸</Text>
          <View className="flex gap-3">
            {LENGTHS.map((len) => (
              <View
                key={len.id}
                className={`flex-1 p-3 rounded-xl border-2 text-center ${
                  length === len.id ? 'border-[#1D3A4C]' : 'border-gray-100'
                }`}
                onClick={() => setLength(len.id)}
              >
                <Text className="font-medium text-gray-900">{len.name}</Text>
                <Text className="text-xs text-gray-500">{len.size}</Text>
                <Text className="text-xs text-gray-400 mt-1">{len.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 刻字服务 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-gray-900">刻字服务</Text>
            {engraving && <Text className="text-sm text-[#E54B4B]">+¥20</Text>}
          </View>
          <View className="bg-gray-50 rounded-xl p-3">
            <Input
              className="w-full bg-transparent text-base"
              placeholder="请输入刻字内容（最多6字）"
              value={engraving}
              onInput={(e) => handleEngravingChange(e.detail.value)}
              maxlength={6}
            />
          </View>
          <Text className="text-xs text-gray-400 mt-2">
            {engraving.length}/6 字符
          </Text>
        </View>

        {/* 数量选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">购买数量</Text>
          <View className="flex items-center justify-between">
            <View className="flex items-center bg-gray-50 rounded-full">
              <View
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus size={20} color={quantity <= 1 ? '#ccc' : '#1D3A4C'} />
              </View>
              <Text className="w-12 text-center text-lg font-medium">{quantity}</Text>
              <View
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus size={20} color={quantity >= 10 ? '#ccc' : '#1D3A4C'} />
              </View>
            </View>
            <Text className="text-lg font-bold text-[#E54B4B]">¥{calculatePrice()}</Text>
          </View>
        </View>

        {/* 定制说明 */}
        <View className="bg-white p-4 mb-4">
          <Text className="text-base font-bold text-gray-900 mb-3">定制说明</Text>
          <View className="space-y-2">
            <Text className="text-sm text-gray-600">• 手串为定制产品，非质量问题不支持退换</Text>
            <Text className="text-sm text-gray-600">• 香料为天然植物香料，香味可持续3-6个月</Text>
            <Text className="text-sm text-gray-600">• 定制周期约为3-5个工作日</Text>
            <Text className="text-sm text-gray-600">• 每件手串附带专属养生档案</Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部提交栏 */}
      <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center">
        <View className="flex-1">
          <Text className="text-xs text-gray-500">总计</Text>
          <Text className="text-2xl font-bold text-[#E54B4B]">¥{calculatePrice()}</Text>
        </View>
        <Button
          className="bg-[#E54B4B] text-white rounded-full px-8 py-3"
          onClick={handleSubmit}
        >
          提交定制
        </Button>
      </View>
    </View>
  )
}

export default CustomizePage
