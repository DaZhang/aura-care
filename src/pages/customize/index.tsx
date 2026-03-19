import { View, Text, ScrollView, Input, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Plus, Minus, Check } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import type { FC } from 'react'

// 图片资源 - 手串成品图
const IMAGES = {
  braceletPeaceful: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
  braceletQixu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
  braceletYangxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
  braceletYinxu: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
}

// 香料数据
const SPICES = {
  core: [
    { id: 'tanxiang', name: '檀香', effect: '理气和胃，安神定志', color: '#8B4513', emoji: '🪵' },
    { id: 'chenxiang', name: '沉香', effect: '行气止痛，温中止呕', color: '#2F4F4F', emoji: '🌑' },
    { id: 'huangqi', name: '黄芪', effect: '补气升阳，固表止汗', color: '#DAA520', emoji: '🌼' },
    { id: 'rougui', name: '肉桂', effect: '补火助阳，引火归元', color: '#CD853F', emoji: '🟤' },
  ],
  auxiliary: [
    { id: 'xunyicao', name: '薰衣草', effect: '舒缓神经，改善睡眠', color: '#9370DB', emoji: '💜' },
    { id: 'meigui', name: '玫瑰', effect: '疏肝解郁，理气止痛', color: '#FF69B4', emoji: '🌹' },
    { id: 'baihe', name: '百合', effect: '养阴润肺，清心安神', color: '#FFFACD', emoji: '🤍' },
    { id: 'chenpi', name: '陈皮', effect: '理气健脾，燥湿化痰', color: '#FFA500', emoji: '🍊' },
  ],
}

// 材质数据
const MATERIALS = [
  { id: 'zitan', name: '紫檀木', price: 0, color: '#8B0000', desc: '经典选择，温润如玉', emoji: '🔴' },
  { id: 'huanghuali', name: '黄花梨', price: 100, color: '#DAA520', desc: '珍贵木种，纹理优美', emoji: '🟡' },
  { id: 'baijing', name: '白水晶', price: 80, color: '#F0FFFF', desc: '纯净通透，能量纯净', emoji: '⚪' },
  { id: 'zishuijing', name: '紫水晶', price: 120, color: '#9370DB', desc: '智慧之石，安神助眠', emoji: '🟣' },
  { id: 'hongma', name: '红玛瑙', price: 60, color: '#B22222', desc: '热情活力，温暖护身', emoji: '❤️' },
  { id: 'liuli', name: '琉璃', price: 50, color: '#87CEEB', desc: '流光溢彩，灵动优雅', emoji: '💎' },
]

// 长度选项
const LENGTHS = [
  { id: 'small', name: '小号', size: '15cm', desc: '适合纤细手腕', beads: '约12颗' },
  { id: 'medium', name: '中号', size: '17cm', desc: '标准尺寸', beads: '约14颗' },
  { id: 'large', name: '大号', size: '19cm', desc: '适合较粗手腕', beads: '约16颗' },
]

const CustomizePage: FC = () => {
  const router = useRouter()
  const [productId, setProductId] = useState('peaceful')
  
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
    if (router.params.productId) {
      setProductId(router.params.productId)
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

  // 提交定制 - 跳转到订单确认页面
  const handleSubmit = () => {
    const customization = {
      coreSpice,
      auxiliarySpice,
      coreRatio,
      material,
      materialName: MATERIALS.find(m => m.id === material)?.name || '紫檀木',
      length,
      engraving,
    }
    
    Taro.navigateTo({ 
      url: `/pages/order/confirm?productId=${productId}&quantity=${quantity}&customization=${encodeURIComponent(JSON.stringify(customization))}`
    })
  }

  const selectedMaterial = MATERIALS.find(m => m.id === material)
  const selectedCoreSpice = SPICES.core.find(s => s.id === coreSpice)
  const selectedAuxiliarySpice = SPICES.auxiliary.find(s => s.id === auxiliarySpice)
  const selectedLength = LENGTHS.find(l => l.id === length)

  return (
    <View className="min-h-screen bg-[#F7F4ED] pb-24">
      <ScrollView scrollY className="h-[calc(100vh-100px)]">
        {/* 手串预览区 */}
        <View className="bg-gradient-to-b from-[#5D3A1A] to-[#8B5A2B] p-6 relative overflow-hidden">
          {/* 东方装饰元素 */}
          <View className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#D4AF37] opacity-10" style={{ transform: 'translate(-50%, -50%)' }} />
          <View className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#8B2500] opacity-10" style={{ transform: 'translate(30%, 30%)' }} />
          
          {/* 标题 */}
          <View className="text-center mb-4 relative z-10">
            <Text className="text-white text-lg font-bold">定制您的专属手串</Text>
          </View>
          
          {/* 手串成品预览图 */}
          <View className="flex items-center justify-center relative z-10">
            <View className="relative">
              {/* 手串图片 */}
              <View className="w-52 h-52 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ opacity: 0.1 }}>
                <Image
                  src={IMAGES[productId as keyof typeof IMAGES] || IMAGES.braceletPeaceful}
                  className="w-44 h-44"
                  mode="aspectFit"
                />
              </View>
              
              {/* 材质颜色指示环 */}
              <View 
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: selectedMaterial?.color || '#fff', opacity: 0.6 }}
              />
              
              {/* 装饰环 */}
              <View className="absolute -inset-2 rounded-full border border-white opacity-20" />
              <View className="absolute -inset-4 rounded-full border border-white opacity-10" />
            </View>
          </View>
          
          {/* 预览信息 */}
          <View className="mt-4 text-center relative z-10">
            <View className="flex justify-center items-center gap-4 mb-2">
              <View className="flex items-center">
                <Text className="text-lg">{selectedMaterial?.emoji}</Text>
                <Text className="text-white text-sm ml-1">{selectedMaterial?.name}</Text>
              </View>
              <View className="flex items-center">
                <Text className="text-lg">{selectedCoreSpice?.emoji}</Text>
                <Text className="text-white text-sm ml-1">{selectedCoreSpice?.name}</Text>
              </View>
              <View className="flex items-center">
                <Text className="text-lg">{selectedAuxiliarySpice?.emoji}</Text>
                <Text className="text-white text-sm ml-1">{selectedAuxiliarySpice?.name}</Text>
              </View>
            </View>
            <Text className="text-white text-xs opacity-70">
              {selectedLength?.size} · {selectedLength?.beads} · {engraving || '无刻字'}
            </Text>
          </View>
        </View>

        {/* 定制选项卡片 */}
        <View className="bg-white mx-4 -mt-4 rounded-2xl shadow-sm p-4 mb-4 relative z-10">
          <Text className="text-base font-bold text-[#2C1810] mb-3">定制配方</Text>
          
          {/* 当前配方摘要 */}
          <View className="bg-[#F7F4ED] rounded-xl p-3">
            <View className="flex items-center justify-between mb-2">
              <Text className="text-sm text-[#6B5D52]">核心香料</Text>
              <View className="flex items-center">
                <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: selectedCoreSpice?.color }} />
                <Text className="text-sm font-medium text-[#2C1810]">{selectedCoreSpice?.name}</Text>
                <Text className="text-xs text-[#8B7355] ml-2">{coreRatio}%</Text>
              </View>
            </View>
            <View className="flex items-center justify-between">
              <Text className="text-sm text-[#6B5D52]">辅助香料</Text>
              <View className="flex items-center">
                <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: selectedAuxiliarySpice?.color }} />
                <Text className="text-sm font-medium text-[#2C1810]">{selectedAuxiliarySpice?.name}</Text>
                <Text className="text-xs text-[#8B7355] ml-2">{100 - coreRatio}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 核心香料选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">核心香料</Text>
          <View className="grid grid-cols-2 gap-3">
            {SPICES.core.map((spice) => (
              <View
                key={spice.id}
                className={`p-3 rounded-xl border-2 ${
                  coreSpice === spice.id ? 'border-[#5D3A1A] bg-[#F7F4ED]' : 'border-[#E5DDD3]'
                }`}
                onClick={() => setCoreSpice(spice.id)}
              >
                <View className="flex items-center mb-1">
                  <Text className="text-lg mr-2">{spice.emoji}</Text>
                  <Text className="font-medium text-[#2C1810]">{spice.name}</Text>
                  {coreSpice === spice.id && <Check size={16} color="#5D3A1A" className="ml-auto" />}
                </View>
                <Text className="text-xs text-[#6B5D52] ml-7">{spice.effect}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 辅助香料选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">辅助香料</Text>
          <View className="grid grid-cols-2 gap-3">
            {SPICES.auxiliary.map((spice) => (
              <View
                key={spice.id}
                className={`p-3 rounded-xl border-2 ${
                  auxiliarySpice === spice.id ? 'border-[#5D3A1A] bg-[#F7F4ED]' : 'border-[#E5DDD3]'
                }`}
                onClick={() => setAuxiliarySpice(spice.id)}
              >
                <View className="flex items-center mb-1">
                  <Text className="text-lg mr-2">{spice.emoji}</Text>
                  <Text className="font-medium text-[#2C1810]">{spice.name}</Text>
                  {auxiliarySpice === spice.id && <Check size={16} color="#5D3A1A" className="ml-auto" />}
                </View>
                <Text className="text-xs text-[#6B5D52] ml-7">{spice.effect}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 配比调整 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-[#2C1810]">香料配比</Text>
            <Text className="text-sm text-[#6B5D52]">核心 {coreRatio}% / 辅助 {100 - coreRatio}%</Text>
          </View>
          <Slider
            value={[coreRatio]}
            onValueChange={(value) => setCoreRatio(value[0])}
            max={100}
            step={5}
            className="w-full"
          />
          <View className="flex justify-between mt-2">
            <Text className="text-xs text-[#8B7355]">辅助为主</Text>
            <Text className="text-xs text-[#8B7355]">核心为主</Text>
          </View>
        </View>

        {/* 材质选择 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-[#2C1810]">珠串材质</Text>
            <Text className="text-sm text-[#8B2500]">+¥{selectedMaterial?.price || 0}</Text>
          </View>
          <View className="grid grid-cols-3 gap-2">
            {MATERIALS.map((mat) => (
              <View
                key={mat.id}
                className={`p-3 rounded-xl border-2 text-center relative ${
                  material === mat.id ? 'border-[#5D3A1A] bg-[#F7F4ED]' : 'border-[#E5DDD3]'
                }`}
                onClick={() => setMaterial(mat.id)}
              >
                <Text className="text-xl mb-1">{mat.emoji}</Text>
                <Text className="text-sm font-medium text-[#2C1810]">{mat.name}</Text>
                {mat.price > 0 && (
                  <Text className="text-xs text-[#8B2500]">+¥{mat.price}</Text>
                )}
                {material === mat.id && (
                  <View className="absolute top-1 right-1">
                    <Check size={14} color="#5D3A1A" />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 尺寸选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">手串尺寸</Text>
          <View className="flex gap-3">
            {LENGTHS.map((len) => (
              <View
                key={len.id}
                className={`flex-1 p-3 rounded-xl border-2 text-center ${
                  length === len.id ? 'border-[#5D3A1A] bg-[#F7F4ED]' : 'border-[#E5DDD3]'
                }`}
                onClick={() => setLength(len.id)}
              >
                <Text className="font-medium text-[#2C1810]">{len.name}</Text>
                <Text className="text-xs text-[#6B5D52]">{len.size}</Text>
                <Text className="text-xs text-[#8B7355] mt-1">{len.beads}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 刻字服务 */}
        <View className="bg-white p-4 mb-2">
          <View className="flex items-center justify-between mb-3">
            <Text className="text-base font-bold text-[#2C1810]">刻字服务</Text>
            {engraving && <Text className="text-sm text-[#8B2500]">+¥20</Text>}
          </View>
          <View className="bg-[#F7F4ED] rounded-xl p-3">
            <Input
              className="w-full bg-transparent text-base"
              placeholder="请输入刻字内容（最多6字）"
              value={engraving}
              onInput={(e) => handleEngravingChange(e.detail.value)}
              maxlength={6}
            />
          </View>
          <View className="flex justify-between mt-2">
            <Text className="text-xs text-[#8B7355]">刻字将呈现在手串吊牌上</Text>
            <Text className="text-xs text-[#8B7355]">{engraving.length}/6</Text>
          </View>
        </View>

        {/* 数量选择 */}
        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-[#2C1810] mb-3">购买数量</Text>
          <View className="flex items-center justify-between">
            <View className="flex items-center bg-[#F7F4ED] rounded-full">
              <View
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus size={20} color={quantity <= 1 ? '#D4C4B0' : '#5D3A1A'} />
              </View>
              <Text className="w-12 text-center text-lg font-medium">{quantity}</Text>
              <View
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus size={20} color={quantity >= 10 ? '#D4C4B0' : '#5D3A1A'} />
              </View>
            </View>
            <Text className="text-lg font-bold text-[#8B2500]">¥{calculatePrice()}</Text>
          </View>
        </View>

        {/* 定制说明 */}
        <View className="bg-white p-4 mb-4">
          <Text className="text-base font-bold text-[#2C1810] mb-3">定制说明</Text>
          <View className="space-y-2">
            <View className="flex items-start">
              <Text className="text-sm text-[#5D3A1A] mr-2">•</Text>
              <Text className="text-sm text-[#6B5D52]">手串为定制产品，非质量问题不支持退换</Text>
            </View>
            <View className="flex items-start">
              <Text className="text-sm text-[#5D3A1A] mr-2">•</Text>
              <Text className="text-sm text-[#6B5D52]">香料为天然植物香料，香味可持续3-6个月</Text>
            </View>
            <View className="flex items-start">
              <Text className="text-sm text-[#5D3A1A] mr-2">•</Text>
              <Text className="text-sm text-[#6B5D52]">定制周期约为3-5个工作日</Text>
            </View>
            <View className="flex items-start">
              <Text className="text-sm text-[#5D3A1A] mr-2">•</Text>
              <Text className="text-sm text-[#6B5D52]">每件手串附带专属养生档案</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部提交栏 */}
      <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5DDD3] p-4 flex items-center">
        <View className="flex-1">
          <Text className="text-xs text-[#6B5D52]">定制总价</Text>
          <Text className="text-2xl font-bold text-[#8B2500]">¥{calculatePrice()}</Text>
        </View>
        <View
          className="bg-[#8B2500] rounded-full px-8 py-3"
          onClick={handleSubmit}
        >
          <Text className="text-white text-base font-medium">提交定制</Text>
        </View>
      </View>
    </View>
  )
}

export default CustomizePage
