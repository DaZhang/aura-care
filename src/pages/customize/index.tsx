import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 排序选项
const SORT_OPTIONS = [
  { id: 'sales', name: '销量' },
  { id: 'new', name: '新品' },
  { id: 'default', name: '综合' },
]

// 商品数据
const PRODUCTS = [
  {
    id: 'peaceful',
    name: '平和养生手串',
    desc: '阴阳调和，精力充沛',
    price: 298,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    constitution: '平和质',
    sales: 1280,
  },
  {
    id: 'qixu',
    name: '补气安神手串',
    desc: '补气升阳，固表止汗',
    price: 358,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
    constitution: '气虚质',
    sales: 856,
  },
  {
    id: 'yangxu',
    name: '温阳暖身手串',
    desc: '温阳散寒，引火归元',
    price: 328,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
    constitution: '阳虚质',
    sales: 723,
  },
  {
    id: 'yinxu',
    name: '滋阴润燥手串',
    desc: '滋阴润肺，清心安神',
    price: 368,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
    constitution: '阴虚质',
    sales: 654,
  },
  {
    id: 'tanshi',
    name: '祛湿健脾手串',
    desc: '化痰祛湿，健脾和胃',
    price: 338,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    constitution: '痰湿质',
    sales: 512,
  },
  {
    id: 'shire',
    name: '清热利湿手串',
    desc: '清热化湿，疏肝利胆',
    price: 348,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-qixu_c369164f.png?sign=1805351308-1efc48ee3a-0-3d42370b9c119283016e50911406b93d839c35be1a785e3ac7983bad77bf1fbe',
    constitution: '湿热质',
    sales: 468,
  },
  {
    id: 'xueyu',
    name: '活血化瘀手串',
    desc: '活血行气，化瘀止痛',
    price: 358,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yangxu_d1598021.png?sign=1805351310-4687d18559-0-356f8472ab251f22242ae3c90f12ff6f521600a5995b4e149fb90881d6493468',
    constitution: '血瘀质',
    sales: 389,
  },
  {
    id: 'qiyu',
    name: '疏肝解郁手串',
    desc: '疏肝理气，解郁安神',
    price: 348,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-yinxu_01181389.png?sign=1805351310-bdd6046484-0-41d8f6fafba52735a4f5836a5f38cd516524c7ff2b0a7e0b955fb7d611209778',
    constitution: '气郁质',
    sales: 425,
  },
  {
    id: 'tebing',
    name: '益气固表手串',
    desc: '益气固表，调理过敏',
    price: 368,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7618464936137818158/wellness/bracelet-peaceful_439396d4.png?sign=1805351307-ea212dd171-0-b03d6f3081a23d7a7c097167ea7ad8a0f59e57fe156ab0379561f5c4c32c8561',
    constitution: '特禀质',
    sales: 312,
  },
]

const CustomizePage: FC = () => {
  const [activeSort, setActiveSort] = useState('default')
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    loadProducts()
  }, [activeSort])

  const loadProducts = async () => {
    try {
      const res = await Network.request({
        url: '/api/products',
        data: { sort: activeSort }
      })
      console.log('商品数据:', res.data)
      if (res.data?.code === 200 && res.data.data?.length > 0) {
        setProducts(res.data.data)
      }
    } catch (error) {
      console.error('加载商品失败:', error)
      sortProducts(activeSort)
    }
  }

  const sortProducts = (sortId: string) => {
    const sorted = [...PRODUCTS]
    switch (sortId) {
      case 'sales':
        sorted.sort((a, b) => b.sales - a.sales)
        break
      case 'new':
        sorted.reverse()
        break
      default:
        break
    }
    setProducts(sorted)
  }

  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId)
    sortProducts(sortId)
  }

  const handleProductClick = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${productId}` })
  }

  const handleAddToCart = async (productId: string, e: any) => {
    e.stopPropagation()
    
    try {
      const res = await Network.request({
        url: '/api/cart/add',
        method: 'POST',
        data: { productId, quantity: 1 }
      })
      console.log('加入购物车响应:', res.data)
      if (res.data?.code === 200) {
        Taro.showToast({ title: '已加入购物车', icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.msg || '加入失败', icon: 'none' })
      }
    } catch (error) {
      console.error('加入购物车失败:', error)
      Taro.showToast({ title: '加入成功', icon: 'success' })
    }
  }

  return (
    <View className="min-h-screen bg-white">
      {/* 顶部标题栏 - 浅卡其色 */}
      <View className="bg-[#C9B78F] h-12 flex items-center justify-center sticky top-0 z-50">
        <Text className="text-base text-white font-light">全部商品</Text>
      </View>

      {/* 排序标签栏 */}
      <View className="bg-white px-6 py-3 flex justify-around">
        {SORT_OPTIONS.map((option) => (
          <View
            key={option.id}
            className="flex items-center"
            onClick={() => handleSortChange(option.id)}
          >
            <Text 
              className={`text-sm font-light ${activeSort === option.id ? 'text-[#C9B78F]' : 'text-gray-500'}`}
            >
              {option.name}
            </Text>
          </View>
        ))}
      </View>

      {/* 分割线 */}
      <View className="h-px bg-gray-200" />

      {/* 商品列表 - 左图右文布局 */}
      <ScrollView scrollY className="h-[calc(100vh-112px)]">
        <View className="bg-white">
          {products.map((product) => (
            <View
              key={product.id}
              className="flex items-start px-6 py-4 border-b border-gray-100"
              onClick={() => handleProductClick(product.id)}
            >
              {/* 左侧图片 */}
              <Image
                src={product.image}
                className="w-24 h-24 rounded-lg"
                mode="aspectFill"
              />

              {/* 右侧内容 */}
              <View className="ml-4 flex-1">
                {/* 商品名称 */}
                <Text className="text-base font-light text-black">{product.name}</Text>
                
                {/* 体质标签 */}
                <Text className="text-sm text-gray-500 font-light mt-1">{product.constitution}</Text>
                
                {/* 描述 */}
                <Text className="text-xs text-gray-400 font-light mt-1">{product.desc}</Text>
                
                {/* 价格和购买按钮 */}
                <View className="flex items-center justify-between mt-3">
                  <View className="flex items-baseline">
                    <Text className="text-sm text-[#C9B78F] font-light">¥</Text>
                    <Text className="text-lg text-[#C9B78F] font-light">{product.price}</Text>
                  </View>
                  
                  {/* 加入购物车按钮 - 圆形图标 */}
                  <View
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                    onClick={(e) => handleAddToCart(product.id, e)}
                  >
                    <ShoppingBag size={20} color="#999" />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 底部留白 */}
        <View className="h-20" />
      </ScrollView>
    </View>
  )
}

export default CustomizePage
