import { View, Text, ScrollView, Input, Button } from '@tarojs/components'
import { ChevronRight } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'

const ProfileEditPage: FC = () => {
  const [nickname, setNickname] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')

  const handleSave = () => {
    if (!nickname.trim()) {
      Taro.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    
    // 保存用户信息
    const userInfo = { nickname, phone, gender }
    Taro.setStorageSync('userInfo', JSON.stringify(userInfo))
    
    Taro.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleChooseAvatar = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: () => {
        Taro.showToast({ title: '头像已更新', icon: 'success' })
      }
    })
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          个人资料
        </Text>
      </View>

      {/* 头像 */}
      <View 
        className="flex items-center justify-center py-6 border-b border-gray-100"
        onClick={handleChooseAvatar}
      >
        <View 
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F5EFE0' }}
        >
          <Text style={{ fontSize: '32px' }}>👤</Text>
        </View>
        <Text 
          className="text-[#5D3A1A] mt-2"
          style={{ fontSize: '14px', fontWeight: 400 }}
        >
          点击更换头像
        </Text>
      </View>

      {/* 表单 */}
      <View className="px-6 py-4">
        {/* 昵称 */}
        <View className="flex items-center py-4 border-b border-gray-100">
          <Text 
            className="text-black w-16"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            昵称
          </Text>
          <Input
            className="flex-1 text-right"
            style={{ fontSize: '15px' }}
            placeholder="请输入昵称"
            value={nickname}
            onInput={(e) => setNickname(e.detail.value)}
          />
        </View>

        {/* 手机号 */}
        <View className="flex items-center py-4 border-b border-gray-100">
          <Text 
            className="text-black w-16"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            手机号
          </Text>
          <Input
            className="flex-1 text-right"
            style={{ fontSize: '15px' }}
            type="number"
            placeholder="请输入手机号"
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
          />
        </View>

        {/* 性别 */}
        <View 
          className="flex items-center py-4 border-b border-gray-100"
          onClick={() => {
            Taro.showActionSheet({
              itemList: ['男', '女', '保密'],
              success: (res) => {
                const genders = ['男', '女', '保密']
                setGender(genders[res.tapIndex])
              }
            })
          }}
        >
          <Text 
            className="text-black w-16"
            style={{ fontSize: '15px', fontWeight: 400 }}
          >
            性别
          </Text>
          <Text 
            className="flex-1 text-right text-[#999999]"
            style={{ fontSize: '15px' }}
          >
            {gender || '请选择'}
          </Text>
          <ChevronRight size={18} color="#D4D4D4" />
        </View>
      </View>

      {/* 保存按钮 */}
      <View className="px-6 py-8">
        <Button
          className="w-full py-4 rounded-full"
          style={{ backgroundColor: '#C9B78F' }}
          onClick={handleSave}
        >
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            保存
          </Text>
        </Button>
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default ProfileEditPage
