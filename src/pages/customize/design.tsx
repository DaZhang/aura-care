import { View, Text, ScrollView, Image } from '@tarojs/components'
import { Check, Sparkles } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'

// 材质选项
const MATERIAL_OPTIONS = [
  { id: 'sandalwood', name: '檀香木', desc: '温润如玉，香气淡雅', price: 0, color: '#D4A574', textColor: '#5D4E37' },
  { id: 'agarwood', name: '沉香木', desc: '香韵悠长，静心安神', price: 100, color: '#8B4513', textColor: '#8B4513' },
  { id: 'huanghuali', name: '黄花梨', desc: '纹理华美，尊贵典雅', price: 200, color: '#DAA520', textColor: '#B8860B' },
  { id: 'ebony', name: '乌木', desc: '沉稳厚重，辟邪镇宅', price: 80, color: '#2F2F2F', textColor: '#2F2F2F' },
  { id: 'rosewood', name: '紫檀木', desc: '帝王之木，养血益气', price: 150, color: '#8B0000', textColor: '#8B0000' },
]

// 珠子大小选项
const BEAD_SIZE_OPTIONS = [
  { id: '8mm', name: '8mm', desc: '精致小巧，适合女性', price: 0 },
  { id: '10mm', name: '10mm', desc: '经典尺寸，男女皆宜', price: 20 },
  { id: '12mm', name: '12mm', desc: '大气稳重，适合男性', price: 40 },
  { id: '14mm', name: '14mm', desc: '霸气尊贵，气质非凡', price: 60 },
]

// 圈数选项
const STRAND_OPTIONS = [
  { id: 'single', name: '单圈', desc: '简约大方', price: 0, beads: 12 },
  { id: 'double', name: '双圈', desc: '层次丰富', price: 80, beads: 22 },
  { id: 'triple', name: '三圈', desc: '华贵典雅', price: 150, beads: 32 },
]

// 香料配方选项
const SPICE_OPTIONS = [
  { id: 'calming', name: '安神定志', desc: '檀香+沉香+薰衣草', price: 50, effect: '舒缓压力，改善睡眠' },
  { id: 'vitality', name: '益气养元', desc: '黄芪+人参+白术', price: 60, effect: '补气升阳，固表止汗' },
  { id: 'warm', name: '温阳暖身', desc: '肉桂+干姜+杜仲', price: 55, effect: '温阳散寒，引火归元' },
  { id: 'nourish', name: '滋阴润燥', desc: '麦冬+石斛+百合', price: 65, effect: '滋阴润肺，清心安神' },
  { id: 'detox', name: '祛湿健脾', desc: '陈皮+茯苓+苍术', price: 45, effect: '化痰祛湿，健脾和胃' },
  { id: 'custom', name: '个性化定制', desc: '根据您的体质调配', price: 80, effect: '专属配方，精准调理' },
]

// 配饰选项
const ACCESSORY_OPTIONS = [
  { id: 'none', name: '无配饰', desc: '简约纯净', price: 0 },
  { id: 'buddha', name: '小佛头', desc: '平安护佑', price: 30 },
  { id: 'lotus', name: '莲花吊坠', desc: '圣洁吉祥', price: 40 },
  { id: 'gourd', name: '小葫芦', desc: '福禄双全', price: 35 },
  { id: 'coin', name: '铜钱', desc: '招财进宝', price: 25 },
]

// 定制步骤
const STEPS = [
  { id: 1, title: '选择材质' },
  { id: 2, title: '珠子大小' },
  { id: 3, title: '圈数长度' },
  { id: 4, title: '香料配方' },
  { id: 5, title: '配饰选择' },
  { id: 6, title: '确认定制' },
]

const CustomDesignPage: FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [constitution, setConstitution] = useState('平和')
  
  // 定制选项
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0])
  const [selectedBeadSize, setSelectedBeadSize] = useState(BEAD_SIZE_OPTIONS[1])
  const [selectedStrand, setSelectedStrand] = useState(STRAND_OPTIONS[0])
  const [selectedSpice, setSelectedSpice] = useState(SPICE_OPTIONS[0])
  const [selectedAccessory, setSelectedAccessory] = useState(ACCESSORY_OPTIONS[0])

  useEffect(() => {
    // 获取用户的体质类型
    const savedConstitution = Taro.getStorageSync('constitution')
    if (savedConstitution) {
      // 尝试解码存储的体质值（可能是URL编码）
      let decodedConstitution = savedConstitution
      try {
        // 如果包含 % 说明是URL编码，需要解码
        if (savedConstitution.includes('%')) {
          decodedConstitution = decodeURIComponent(savedConstitution)
        }
      } catch (e) {
        console.error('解码体质失败:', e)
      }
      setConstitution(decodedConstitution)
      // 根据体质推荐香料
      const spiceRecommendation: Record<string, string> = {
        '平和': 'calming',
        '气虚': 'vitality',
        '阳虚': 'warm',
        '阴虚': 'nourish',
        '痰湿': 'detox',
        '湿热': 'detox',
        '血瘀': 'calming',
        '气郁': 'calming',
        '特禀': 'vitality',
      }
      const recommendedSpice = spiceRecommendation[decodedConstitution] || 'calming'
      const spice = SPICE_OPTIONS.find(s => s.id === recommendedSpice)
      if (spice) setSelectedSpice(spice)
    }

    // 检查是否有传入的体质参数（需要解码）
    const type = router.params.type
    if (type) {
      // 解码URL参数中的中文
      let decodedType = type
      try {
        decodedType = decodeURIComponent(type)
      } catch (e) {
        console.error('解码体质参数失败:', e)
      }
      setConstitution(decodedType)
      // 同时更新本地存储（存储原始中文，不编码）
      Taro.setStorageSync('constitution', decodedType)
    }
  }, [router.params])

  // 计算总价
  const basePrice = 298 // 基础价格
  const totalPrice = basePrice + selectedMaterial.price + selectedBeadSize.price + 
    selectedStrand.price + selectedSpice.price + selectedAccessory.price

  // 根据材质获取预览图
  const getPreviewImage = () => {
    // 材质对应的商品图片映射
    const materialImageMap: Record<string, string> = {
      'sandalwood': 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
      'agarwood': 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
      'huanghuali': 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
      'ebony': 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
      'rosewood': 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    }
    return materialImageMap[selectedMaterial.id] || materialImageMap['sandalwood']
  }

  // 生成定制描述
  const customDescription = `${selectedMaterial.name} | ${selectedBeadSize.name} | ${selectedStrand.name} | ${selectedSpice.name}${selectedAccessory.id !== 'none' ? ` | ${selectedAccessory.name}` : ''}`

  // 处理步骤导航
  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 加入购物车
  const handleAddToCart = () => {
    const cart = Taro.getStorageSync('cart')
    let cartItems = cart ? JSON.parse(cart) : []
    
    const newItem = {
      id: `custom_${Date.now()}`,
      productId: 'custom',
      name: `${constitution}定制手串`,
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
      price: totalPrice,
      quantity: 1,
      constitution: `${constitution}质专属`,
      selected: true,
      bgColor: selectedMaterial.color,
      isCustom: true,
      customOptions: customDescription
    }
    
    cartItems.push(newItem)
    Taro.setStorageSync('cart', JSON.stringify(cartItems))
    
    Taro.showToast({ 
      title: '定制手串已加入购物车', 
      icon: 'success',
      duration: 2000 
    })
    
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/cart/index' })
    }, 2000)
  }

  // 渲染选项卡片
  const renderOptionCard = (option: any, isSelected: boolean, onClick: () => void) => (
    <View
      key={option.id}
      className={`p-4 rounded-2xl mb-3 ${isSelected ? 'border-2 border-[#5D3A1A]' : 'border border-gray-200'}`}
      style={{ 
        backgroundColor: isSelected ? '#F5EFE0' : '#FAFAFA',
      }}
      onClick={onClick}
    >
      <View className="flex items-center justify-between">
        <View className="flex-1">
          <Text 
            className="text-black"
            style={{ fontSize: '16px', fontWeight: 400 }}
          >
            {option.name}
          </Text>
          <Text 
            className="text-[#8B7355] mt-1"
            style={{ fontSize: '13px', fontWeight: 300 }}
          >
            {option.desc}
          </Text>
          {option.effect && (
            <Text 
              className="text-[#5D3A1A] mt-1"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              {option.effect}
            </Text>
          )}
        </View>
        <View className="flex items-center">
          {option.price > 0 && (
            <Text 
              className="text-[#A63D2B] mr-2"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              +¥{option.price}
            </Text>
          )}
          {isSelected && (
            <View 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#EBE3D5' }}
            >
              <Check size={14} color="#fff" />
            </View>
          )}
        </View>
      </View>
    </View>
  )

  // 渲染材质选项（带颜色预览）
  const renderMaterialCard = (option: typeof MATERIAL_OPTIONS[0], isSelected: boolean) => (
    <View
      key={option.id}
      className={`p-4 rounded-2xl mb-3 ${isSelected ? 'border-2 border-[#5D3A1A]' : 'border border-gray-200'}`}
      style={{ backgroundColor: isSelected ? '#F5EFE0' : '#FAFAFA' }}
      onClick={() => setSelectedMaterial(option)}
    >
      <View className="flex items-center justify-between">
        <View className="flex items-center flex-1">
          <View 
            className="w-10 h-10 rounded-full mr-3"
            style={{ backgroundColor: option.color }}
          />
          <View className="flex-1">
            <Text 
              className="text-black"
              style={{ fontSize: '16px', fontWeight: 400 }}
            >
              {option.name}
            </Text>
            <Text 
              className="text-[#8B7355] mt-1"
              style={{ fontSize: '13px', fontWeight: 300 }}
            >
              {option.desc}
            </Text>
          </View>
        </View>
        <View className="flex items-center">
          {option.price > 0 && (
            <Text 
              className="text-[#A63D2B] mr-2"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              +¥{option.price}
            </Text>
          )}
          {isSelected && (
            <View 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#EBE3D5' }}
            >
              <Check size={14} color="#fff" />
            </View>
          )}
        </View>
      </View>
    </View>
  )

  return (
    <View className="min-h-screen bg-white">
      {/* 顶部步骤指示器 */}
      <View className="px-4 py-4 border-b border-gray-100">
        <ScrollView scrollX className="whitespace-nowrap">
          <View className="flex flex-row items-center">
            {STEPS.map((step, index) => (
              <View key={step.id} className="flex items-center">
                <View 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? 'bg-[#5D3A1A]' : 'bg-gray-200'
                  }`}
                >
                  <Text 
                    className={currentStep >= step.id ? 'text-white' : 'text-gray-500'}
                    style={{ fontSize: '14px', fontWeight: 400 }}
                  >
                    {step.id}
                  </Text>
                </View>
                <Text 
                  className={`mx-2 ${currentStep >= step.id ? 'text-[#5D3A1A]' : 'text-gray-400'}`}
                  style={{ fontSize: '13px', fontWeight: 400 }}
                >
                  {step.title}
                </Text>
                {index < STEPS.length - 1 && (
                  <View className="w-6 h-px bg-gray-300 mx-1" />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 内容区域 */}
      <ScrollView scrollY className="px-6 py-6" style={{ height: 'calc(100vh - 240px)' }}>
        {/* 步骤1：选择材质 */}
        {currentStep === 1 && (
          <View>
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
            >
              选择手串材质
            </Text>
            <Text 
              className="text-[#8B7355] mb-6"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              不同材质有不同的养生功效，请根据您的喜好选择
            </Text>
            {MATERIAL_OPTIONS.map(option => 
              renderMaterialCard(option, selectedMaterial.id === option.id)
            )}
          </View>
        )}

        {/* 步骤2：珠子大小 */}
        {currentStep === 2 && (
          <View>
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
            >
              选择珠子大小
            </Text>
            <Text 
              className="text-[#8B7355] mb-6"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              珠子大小影响佩戴舒适度和美观度
            </Text>
            {BEAD_SIZE_OPTIONS.map(option => 
              renderOptionCard(option, selectedBeadSize.id === option.id, () => setSelectedBeadSize(option))
            )}
          </View>
        )}

        {/* 步骤3：圈数长度 */}
        {currentStep === 3 && (
          <View>
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
            >
              选择圈数长度
            </Text>
            <Text 
              className="text-[#8B7355] mb-6"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              圈数越多，珠子数量越多，层次感更强
            </Text>
            {STRAND_OPTIONS.map(option => 
              renderOptionCard(option, selectedStrand.id === option.id, () => setSelectedStrand(option))
            )}
          </View>
        )}

        {/* 步骤4：香料配方 */}
        {currentStep === 4 && (
          <View>
            <View className="flex items-center mb-4">
              <Sparkles size={20} color="#5D3A1A" />
              <Text 
                className="text-black ml-2"
                style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
              >
                选择香料配方
              </Text>
            </View>
            <View 
              className="px-4 py-3 rounded-xl mb-6"
              style={{ backgroundColor: '#F5EFE0' }}
            >
              <Text 
                className="text-[#5D4E37]"
                style={{ fontSize: '14px', fontWeight: 300 }}
              >
                根据您的体质（{constitution}质），我们推荐「{SPICE_OPTIONS.find(s => s.id === (constitution === '平和' ? 'calming' : constitution === '气虚' ? 'vitality' : 'calming'))?.name || '安神定志'}」配方
              </Text>
            </View>
            {SPICE_OPTIONS.map(option => 
              renderOptionCard(option, selectedSpice.id === option.id, () => setSelectedSpice(option))
            )}
          </View>
        )}

        {/* 步骤5：配饰选择 */}
        {currentStep === 5 && (
          <View>
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
            >
              选择配饰
            </Text>
            <Text 
              className="text-[#8B7355] mb-6"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              精美配饰，为您的手串增添独特寓意
            </Text>
            {ACCESSORY_OPTIONS.map(option => 
              renderOptionCard(option, selectedAccessory.id === option.id, () => setSelectedAccessory(option))
            )}
          </View>
        )}

        {/* 步骤6：确认定制 */}
        {currentStep === 6 && (
          <View>
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '2px' }}
            >
              确认定制方案
            </Text>
            
            {/* 预览图 */}
            <View 
              className="w-full aspect-square rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: selectedMaterial.color + '20' }}
            >
              <Image
                src={getPreviewImage()}
                className="w-4/5 h-4/5"
                mode="aspectFit"
              />
            </View>

            {/* 定制详情 */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-4">
              <Text 
                className="text-black mb-4"
                style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
              >
                定制详情
              </Text>
              
              <View className="space-y-3">
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>材质</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>{selectedMaterial.name}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>珠子大小</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>{selectedBeadSize.name}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>圈数</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>{selectedStrand.name}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>香料配方</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>{selectedSpice.name}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>配饰</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>{selectedAccessory.name}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>体质适配</Text>
                  <Text className="text-[#5D3A1A]" style={{ fontSize: '14px', fontWeight: 400 }}>{constitution}质</Text>
                </View>
              </View>
            </View>

            {/* 价格明细 */}
            <View className="bg-gray-50 rounded-2xl p-4">
              <View className="flex justify-between mb-2">
                <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>基础价格</Text>
                <Text className="text-black" style={{ fontSize: '14px' }}>¥{basePrice}</Text>
              </View>
              {selectedMaterial.price > 0 && (
                <View className="flex justify-between mb-2">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>材质加价</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>+¥{selectedMaterial.price}</Text>
                </View>
              )}
              {selectedBeadSize.price > 0 && (
                <View className="flex justify-between mb-2">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>珠子加价</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>+¥{selectedBeadSize.price}</Text>
                </View>
              )}
              {selectedStrand.price > 0 && (
                <View className="flex justify-between mb-2">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>圈数加价</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>+¥{selectedStrand.price}</Text>
                </View>
              )}
              {selectedSpice.price > 0 && (
                <View className="flex justify-between mb-2">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>香料加价</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>+¥{selectedSpice.price}</Text>
                </View>
              )}
              {selectedAccessory.price > 0 && (
                <View className="flex justify-between mb-2">
                  <Text className="text-[#8B7355]" style={{ fontSize: '14px' }}>配饰加价</Text>
                  <Text className="text-black" style={{ fontSize: '14px' }}>+¥{selectedAccessory.price}</Text>
                </View>
              )}
              <View className="border-t border-gray-200 mt-3 pt-3">
                <View className="flex justify-between">
                  <Text className="text-black" style={{ fontSize: '16px', fontWeight: 400 }}>总计</Text>
                  <Text className="text-[#5D3A1A]" style={{ fontSize: '20px', fontWeight: 500 }}>¥{totalPrice}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作栏 */}
      <View 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-row items-center"
        style={{ paddingBottom: '60px' }}
      >
        {currentStep > 1 ? (
          <View
            className="flex-1 py-3 rounded-full border border-[#5D3A1A] mr-3 flex items-center justify-center"
            onClick={handlePrevStep}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              上一步
            </Text>
          </View>
        ) : (
          <View
            className="flex-1 py-3 rounded-full border border-gray-300 mr-3 flex items-center justify-center"
            onClick={() => Taro.navigateBack()}
          >
            <Text 
              className="text-gray-500"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              取消
            </Text>
          </View>
        )}

        {currentStep < 6 ? (
          <View
            className="flex-1 py-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#EBE3D5' }}
            onClick={handleNextStep}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              下一步
            </Text>
          </View>
        ) : (
          <View
            className="flex-1 py-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#EBE3D5' }}
            onClick={handleAddToCart}
          >
            <Text 
              className="text-[#5D3A1A]"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              加入购物车 ¥{totalPrice}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default CustomDesignPage
