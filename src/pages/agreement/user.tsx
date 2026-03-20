import { View, Text, ScrollView } from '@tarojs/components'
import type { FC } from 'react'

const UserAgreementPage: FC = () => {
  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      <ScrollView scrollY className="p-4">
        <Text className="text-xl font-bold text-[#2C1810] mb-4 block">用户协议</Text>
        
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-medium text-[#2C1810] mb-2 block">一、服务条款</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            欢迎您使用东方养生·华烨尚医小程序服务。在使用本服务前，请您仔细阅读以下条款。使用本服务即表示您同意遵守本协议的所有条款和条件。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">二、用户注册</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 用户在使用本服务前需要注册账号。注册时请您提供真实、准确、完整的个人信息。{'\n'}
            2. 用户应妥善保管账号和密码，因账号密码泄露造成的损失由用户自行承担。{'\n'}
            3. 用户不得将账号转让、出借给他人使用。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">三、服务内容</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 本平台提供中医体质测试、养生手串定制、商品购买等服务。{'\n'}
            2. 体质测试结果仅供参考，不作为医疗诊断依据。{'\n'}
            3. 平台有权根据运营需要调整服务内容。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">四、用户行为规范</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 用户应遵守国家法律法规和平台规则。{'\n'}
            2. 禁止发布违法、违规、侵权信息。{'\n'}
            3. 禁止利用平台进行商业推广、诈骗等活动。{'\n'}
            4. 禁止恶意下单、刷单等扰乱平台秩序的行为。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">五、交易规则</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 用户下单即表示认可商品信息和服务条款。{'\n'}
            2. 订单支付后，平台将按照承诺时间发货。{'\n'}
            3. 定制商品一经制作不支持退换。{'\n'}
            4. 退换货按照国家相关法律法规执行。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">六、知识产权</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 平台所有内容（包括但不限于文字、图片、视频、音频、软件等）的知识产权归平台所有。{'\n'}
            2. 未经授权，用户不得复制、传播、修改平台内容。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">七、免责声明</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 因不可抗力导致的服务中断，平台不承担责任。{'\n'}
            2. 体质测试结果仅供参考，不构成医疗建议。{'\n'}
            3. 因用户自身原因导致的损失，平台不承担责任。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">八、协议修改</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            平台有权修改本协议，修改后的协议将在平台公布。继续使用本服务即表示您接受修改后的协议。
          </Text>

          <Text className="text-sm text-[#6B5D52] block text-right">
            东方养生·华烨尚医{'\n'}
            更新日期：2024年1月1日
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserAgreementPage
