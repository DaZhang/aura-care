import { View, Text, ScrollView } from '@tarojs/components'
import type { FC } from 'react'

const PrivacyPolicyPage: FC = () => {
  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      <ScrollView scrollY className="p-4">
        <Text className="text-xl font-bold text-[#2C1810] mb-4 block">隐私政策</Text>
        
        <View className="bg-white rounded-xl p-4">
          <Text className="text-sm text-[#6B5D52] mb-4 block">
            更新日期：2024年1月1日{'\n'}生效日期：2024年1月1日
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">引言</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            东方养生·华烨尚医（以下简称&ldquo;我们&rdquo;）非常重视用户的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">一、我们收集的信息</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 注册信息：微信昵称、头像、openid等。{'\n'}
            2. 订单信息：收货地址、联系方式、商品信息、支付信息等。{'\n'}
            3. 体质测试数据：您的测试结果和健康偏好。{'\n'}
            4. 设备信息：设备型号、操作系统、唯一设备标识符等。{'\n'}
            5. 日志信息：访问时间、页面浏览记录等。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">二、信息的使用</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 提供、维护、改进我们的服务。{'\n'}
            2. 处理您的订单和提供客户支持。{'\n'}
            3. 发送服务通知和营销信息（经您同意）。{'\n'}
            4. 进行数据分析以改善用户体验。{'\n'}
            5. 保护平台安全和防止欺诈行为。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">三、信息的共享</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            我们不会向第三方出售您的个人信息。以下情况下我们可能会共享您的信息：{'\n'}
            1. 获得您的明确同意。{'\n'}
            2. 与服务提供商共享（如物流公司、支付机构）。{'\n'}
            3. 法律法规要求或司法行政机关要求。{'\n'}
            4. 保护我们或用户的合法权益。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">四、信息的存储</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 我们将在中华人民共和国境内收集和产生的个人信息存储在境内。{'\n'}
            2. 我们将采取合理的安全措施保护您的信息。{'\n'}
            3. 我们将在实现目的所需的最短时间内保留您的信息。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">五、您的权利</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            1. 访问权：您有权访问您的个人信息。{'\n'}
            2. 更正权：您有权更正不准确的信息。{'\n'}
            3. 删除权：您有权要求删除您的个人信息。{'\n'}
            4. 撤回同意：您有权撤回之前给予的同意。{'\n'}
            5. 注销账号：您可以申请注销账号。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">六、Cookie和类似技术</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            我们可能使用Cookie、Web Beacon等技术来提供更好的服务体验。您可以通过浏览器设置管理Cookie。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">七、未成年人保护</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            我们不会故意收集未成年人的个人信息。如果您是未成年人的监护人，请监督未成年人使用我们的服务。
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">八、联系我们</Text>
          <Text className="text-sm text-[#3D2B1F] mb-4 block leading-relaxed">
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：{'\n'}
            客服电话：400-123-4567{'\n'}
            客服邮箱：service@huaye-shangyi.com
          </Text>

          <Text className="text-base font-medium text-[#2C1810] mb-2 block">九、政策更新</Text>
          <Text className="text-sm text-[#3D2B1F] block leading-relaxed">
            我们可能会不时更新本隐私政策。更新后的政策将在平台公布，请定期查阅。
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyPage
