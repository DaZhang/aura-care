import { View, Text, ScrollView } from '@tarojs/components'
import { MessageCircleQuestionMark, Phone, Mail, Clock } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import type { FC } from 'react'

// 常见问题
const FAQ_LIST = [
  {
    id: '1',
    question: '如何测试我的体质？',
    answer: '进入首页点击"开始体质测试"，根据您最近一个月的实际情况回答问题，系统会自动分析您的体质类型。'
  },
  {
    id: '2',
    question: '体质测试结果准确吗？',
    answer: '我们的体质测试基于中医九种体质理论设计，通过专业医师审核。测试结果仅供参考，如需详细诊断请咨询专业中医师。'
  },
  {
    id: '3',
    question: '手串如何根据体质定制？',
    answer: '每款手串都根据九种体质特点，选用对应的中药材进行配方。例如气虚体质选用黄芪、人参等补气药材。'
  },
  {
    id: '4',
    question: '手串可以佩戴多久？',
    answer: '养生手串一般可佩戴3-6个月，药材香气会逐渐变淡。建议定期更换，以保持最佳养生效果。'
  },
  {
    id: '5',
    question: '手串有副作用吗？',
    answer: '我们的手串采用天然中药材，经过专业配方，一般无副作用。如有过敏史，请咨询客服或专业医师。'
  },
  {
    id: '6',
    question: '如何保养手串？',
    answer: '避免沾水、暴晒，不佩戴时可放入密封袋保存。定期用软布擦拭，保持手串清洁。'
  },
  {
    id: '7',
    question: '如何申请退换货？',
    answer: '签收后7天内，如产品有质量问题，可申请退换货。请联系客服处理，我们会在3个工作日内为您解决。'
  },
  {
    id: '8',
    question: '积分如何获取和使用？',
    answer: '购物、签到、分享均可获得积分。积分可在结算时抵扣现金，100积分=1元。'
  }
]

// 联系方式
const CONTACT_INFO = [
  {
    id: 'phone',
    title: '客服电话',
    content: '400-888-8888',
    icon: Phone,
    bgColor: '#F5EFE0',
    iconColor: '#5D4E37'
  },
  {
    id: 'email',
    title: '邮箱',
    content: 'service@huaye.com',
    icon: Mail,
    bgColor: '#E8EEF2',
    iconColor: '#4A6572'
  },
  {
    id: 'time',
    title: '服务时间',
    content: '工作日 9:00-18:00',
    icon: Clock,
    bgColor: '#F5EEF5',
    iconColor: '#8B668B'
  }
]

const HelpPage: FC = () => {
  const handleContactClick = (contactId: string) => {
    if (contactId === 'phone') {
      Taro.makePhoneCall({ phoneNumber: '4008888888' })
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <Text 
          className="text-black"
          style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
        >
          帮助中心
        </Text>
        <Text 
          className="text-[#8B7355] mt-2"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          常见问题解答
        </Text>
      </View>

      {/* 联系方式 */}
      <View className="px-6 py-4">
        <View className="flex justify-between">
          {CONTACT_INFO.map((contact) => (
            <View
              key={contact.id}
              className="w-[32%] p-4 rounded-2xl flex flex-col items-center"
              style={{ backgroundColor: contact.bgColor }}
              onClick={() => handleContactClick(contact.id)}
            >
              <contact.icon size={24} color={contact.iconColor} />
              <Text 
                className="text-black mt-2 text-center"
                style={{ fontSize: '13px', fontWeight: 400 }}
              >
                {contact.title}
              </Text>
              <Text 
                className="text-[#8B7355] mt-1 text-center"
                style={{ fontSize: '11px', fontWeight: 300 }}
              >
                {contact.content}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200 mx-6" />

      {/* 常见问题列表 */}
      <View className="px-6 py-4">
        <Text 
          className="text-black mb-4"
          style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
        >
          常见问题
        </Text>
        
        {FAQ_LIST.map((faq, index) => (
          <View
            key={faq.id}
            className="py-4 border-b border-gray-100"
          >
            <View className="flex items-start">
              <View 
                className="w-6 h-6 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: '#F5EFE0' }}
              >
                <Text 
                  className="text-[#5D3A1A]"
                  style={{ fontSize: '12px', fontWeight: 400 }}
                >
                  {index + 1}
                </Text>
              </View>
              <View className="flex-1">
                <Text 
                  className="text-black"
                  style={{ fontSize: '15px', fontWeight: 400, letterSpacing: '1px' }}
                >
                  {faq.question}
                </Text>
                <Text 
                  className="text-[#8B7355] mt-2"
                  style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.6 }}
                >
                  {faq.answer}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 在线客服按钮 */}
      <View className="px-6 py-4">
        <View
          className="flex items-center justify-center py-4 rounded-full"
          style={{ backgroundColor: '#EBE3D5' }}
        >
          <MessageCircleQuestionMark size={18} color="#5D3A1A" style={{ marginRight: 8 }} />
          <Text 
            className="text-[#5D3A1A]"
            style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '2px' }}
          >
            在线客服
          </Text>
        </View>
      </View>

      {/* 底部留白 */}
      <View className="h-8" />
    </ScrollView>
  )
}

export default HelpPage
