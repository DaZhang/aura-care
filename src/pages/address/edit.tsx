import { View, Text, ScrollView, Input, Textarea, Picker } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { MapPin, User, Phone, Check } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import type { FC } from 'react'

interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

// 省份列表（简化版）
const PROVINCES = ['北京', '上海', '天津', '重庆', '广东', '浙江', '江苏', '四川', '湖北', '湖南', '河南', '河北', '山东', '山西', '陕西', '福建', '安徽', '辽宁', '吉林', '黑龙江', '江西', '云南', '贵州', '甘肃', '青海', '海南', '内蒙古', '新疆', '西藏', '广西', '宁夏', '香港', '澳门', '台湾']

const AddressEditPage: FC = () => {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [address, setAddress] = useState<Address>({
    id: '',
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  })

  useEffect(() => {
    if (router.params.id) {
      setIsEdit(true)
      loadAddress(router.params.id)
    }
  }, [router.params])

  const loadAddress = (id: string) => {
    const savedAddresses = Taro.getStorageSync('addresses')
    if (savedAddresses) {
      try {
        const addresses: Address[] = JSON.parse(savedAddresses)
        const found = addresses.find(a => a.id === id)
        if (found) {
          setAddress(found)
        }
      } catch (e) {
        console.error('加载地址失败:', e)
      }
    }
  }

  const handleSave = () => {
    // 验证
    if (!address.name.trim()) {
      Taro.showToast({ title: '请输入收货人姓名', icon: 'none' })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(address.phone)) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    if (!address.province || !address.city) {
      Taro.showToast({ title: '请选择所在地区', icon: 'none' })
      return
    }
    if (!address.detail.trim()) {
      Taro.showToast({ title: '请输入详细地址', icon: 'none' })
      return
    }

    // 保存
    const savedAddresses = Taro.getStorageSync('addresses')
    let addresses: Address[] = []
    try {
      addresses = savedAddresses ? JSON.parse(savedAddresses) : []
    } catch (e) {
      addresses = []
    }

    if (isEdit) {
      // 编辑模式
      const index = addresses.findIndex(a => a.id === address.id)
      if (index >= 0) {
        // 如果设为默认，取消其他默认
        if (address.isDefault) {
          addresses = addresses.map(a => ({ ...a, isDefault: false }))
        }
        addresses[index] = address
      }
    } else {
      // 新增模式
      address.id = `addr_${Date.now()}`
      // 如果是第一个地址或设为默认
      if (addresses.length === 0 || address.isDefault) {
        addresses = addresses.map(a => ({ ...a, isDefault: false }))
        address.isDefault = true
      }
      addresses.push(address)
    }

    Taro.setStorageSync('addresses', JSON.stringify(addresses))
    Taro.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleProvinceChange = (e) => {
    const province = PROVINCES[e.detail.value] || ''
    setAddress({ ...address, province, city: '', district: '' })
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      <ScrollView scrollY className="h-[calc(100vh-100px)] p-4">
        {/* 收货人 */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <View className="flex items-center mb-4 pb-4 border-b border-gray-100">
            <User size={18} color="#6B5D52" />
            <View className="flex-1 ml-3">
              <Input
                className="w-full bg-transparent"
                style={{ fontSize: '15px' }}
                placeholder="收货人姓名"
                value={address.name}
                onInput={(e) => setAddress({ ...address, name: e.detail.value })}
              />
            </View>
          </View>
          
          <View className="flex items-center">
            <Phone size={18} color="#6B5D52" />
            <View className="flex-1 ml-3">
              <Input
                className="w-full bg-transparent"
                style={{ fontSize: '15px' }}
                placeholder="手机号码"
                type="number"
                maxlength={11}
                value={address.phone}
                onInput={(e) => setAddress({ ...address, phone: e.detail.value })}
              />
            </View>
          </View>
        </View>

        {/* 所在地区 */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <View className="flex items-center mb-4 pb-4 border-b border-gray-100">
            <MapPin size={18} color="#6B5D52" />
            <Text 
              className="ml-3 text-black"
              style={{ fontSize: '15px', fontWeight: 400 }}
            >
              所在地区
            </Text>
          </View>
          
          <View className="flex gap-2">
            <Picker 
              mode="selector" 
              range={PROVINCES} 
              onChange={handleProvinceChange}
            >
              <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
                <Text 
                  className={address.province ? 'text-black' : 'text-gray-400'}
                  style={{ fontSize: '14px' }}
                >
                  {address.province || '省'}
                </Text>
              </View>
            </Picker>
            
            <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
              <Input
                className="w-full bg-transparent"
                style={{ fontSize: '14px' }}
                placeholder="市"
                value={address.city}
                onInput={(e) => setAddress({ ...address, city: e.detail.value })}
              />
            </View>
            
            <View className="flex-1 bg-[#F7F4ED] rounded-xl px-4 py-3">
              <Input
                className="w-full bg-transparent"
                style={{ fontSize: '14px' }}
                placeholder="区"
                value={address.district}
                onInput={(e) => setAddress({ ...address, district: e.detail.value })}
              />
            </View>
          </View>
        </View>

        {/* 详细地址 */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text 
            className="text-black mb-3"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            详细地址
          </Text>
          <View className="bg-[#F7F4ED] rounded-xl p-4">
            <Textarea
              style={{ width: '100%', minHeight: '80px', backgroundColor: 'transparent', fontSize: '14px' }}
              placeholder="街道、楼栋、门牌号等"
              value={address.detail}
              onInput={(e) => setAddress({ ...address, detail: e.detail.value })}
              maxlength={100}
            />
          </View>
        </View>

        {/* 设为默认 */}
        <View 
          className="bg-white rounded-2xl p-4 flex items-center justify-between"
          onClick={() => setAddress({ ...address, isDefault: !address.isDefault })}
        >
          <Text 
            className="text-black"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            设为默认地址
          </Text>
          <View 
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              address.isDefault ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-gray-300'
            }`}
          >
            {address.isDefault && <Check size={14} color="#fff" />}
          </View>
        </View>
      </ScrollView>

      {/* 底部保存按钮 */}
      <View 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
        style={{ paddingBottom: '60px' }}
      >
        <View
          className="py-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#EBE3D5' }}
          onClick={handleSave}
        >
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            保存地址
          </Text>
        </View>
      </View>
    </View>
  )
}

export default AddressEditPage
