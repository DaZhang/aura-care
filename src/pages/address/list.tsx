import { View, Text, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { MapPin, Plus, Trash2, Check, Pencil } from 'lucide-react-taro'
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

const AddressListPage: FC = () => {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectMode, setSelectMode] = useState(false)

  useEffect(() => {
    // 检查是否是选择模式
    if (router.params.select === 'true') {
      setSelectMode(true)
    }
    loadAddresses()
  }, [router.params])

  // 页面显示时重新加载
  Taro.useDidShow(() => {
    loadAddresses()
  })

  const loadAddresses = () => {
    const savedAddresses = Taro.getStorageSync('addresses')
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses))
      } catch (e) {
        console.error('加载地址失败:', e)
        setAddresses([])
      }
    }
  }

  const saveAddresses = (list: Address[]) => {
    Taro.setStorageSync('addresses', JSON.stringify(list))
    setAddresses(list)
  }

  const handleAddAddress = () => {
    Taro.navigateTo({ url: '/pages/address/edit' })
  }

  const handleEditAddress = (id: string) => {
    Taro.navigateTo({ url: `/pages/address/edit?id=${id}` })
  }

  const handleDeleteAddress = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      success: (res) => {
        if (res.confirm) {
          const newList = addresses.filter(a => a.id !== id)
          // 如果删除的是默认地址，设置第一个为默认
          if (newList.length > 0 && !newList.some(a => a.isDefault)) {
            newList[0].isDefault = true
          }
          saveAddresses(newList)
          Taro.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }

  const handleSetDefault = (id: string) => {
    const newList = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }))
    saveAddresses(newList)
    Taro.showToast({ title: '已设为默认', icon: 'success' })
  }

  const handleSelectAddress = (address: Address) => {
    if (selectMode) {
      // 选择模式，返回选中的地址
      Taro.setStorageSync('selectedAddress', JSON.stringify(address))
      Taro.navigateBack()
    }
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      <ScrollView scrollY className="h-[calc(100vh-120px)] p-4">
        {addresses.length === 0 ? (
          <View className="flex flex-col items-center justify-center pt-32">
            <View 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#F5EFE0' }}
            >
              <MapPin size={40} color="#5D3A1A" />
            </View>
            <Text 
              className="text-black mt-6"
              style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
            >
              暂无收货地址
            </Text>
            <Text 
              className="text-[#8B7355] mt-2"
              style={{ fontSize: '14px', fontWeight: 300 }}
            >
              添加地址后即可下单购买
            </Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View 
              key={address.id}
              className="bg-white rounded-2xl p-4 mb-4"
              onClick={() => handleSelectAddress(address)}
            >
              <View className="flex items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex items-center mb-2">
                    <Text 
                      className="text-black"
                      style={{ fontSize: '16px', fontWeight: 400 }}
                    >
                      {address.name}
                    </Text>
                    <Text 
                      className="text-[#666666] ml-4"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    >
                      {address.phone}
                    </Text>
                  </View>
                  <Text 
                    className="text-[#666666]"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  >
                    {address.province}{address.city}{address.district}{address.detail}
                  </Text>
                </View>
              </View>
              
              <View className="flex items-center justify-between border-t border-gray-100 pt-3">
                <View 
                  className="flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSetDefault(address.id)
                  }}
                >
                  <View 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                      address.isDefault ? 'border-[#5D3A1A] bg-[#5D3A1A]' : 'border-gray-300'
                    }`}
                  >
                    {address.isDefault && <Check size={12} color="#fff" />}
                  </View>
                  <Text 
                    className={address.isDefault ? 'text-[#5D3A1A]' : 'text-[#999999]'}
                    style={{ fontSize: '13px', fontWeight: 300 }}
                  >
                    {address.isDefault ? '默认地址' : '设为默认'}
                  </Text>
                </View>
                
                <View className="flex items-center">
                  <View 
                    className="flex items-center px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditAddress(address.id)
                    }}
                  >
                    <Pencil size={14} color="#8B7355" />
                    <Text className="text-[#8B7355] ml-1" style={{ fontSize: '13px' }}>编辑</Text>
                  </View>
                  <View 
                    className="flex items-center px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteAddress(address.id)
                    }}
                  >
                    <Trash2 size={14} color="#A63D2B" />
                    <Text className="text-[#A63D2B] ml-1" style={{ fontSize: '13px' }}>删除</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* 底部添加按钮 */}
      <View 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
        style={{ paddingBottom: '60px' }}
      >
        <View
          className="py-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#EBE3D5' }}
          onClick={handleAddAddress}
        >
          <Plus size={20} color="#5D3A1A" />
          <Text 
            className="text-[#5D3A1A] ml-2"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            添加收货地址
          </Text>
        </View>
      </View>
    </View>
  )
}

export default AddressListPage
