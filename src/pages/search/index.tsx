import { View, Text, Input, ScrollView, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Search, X, TrendingUp, Clock, ChevronRight } from 'lucide-react-taro'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import type { FC } from 'react'

// 热门搜索
const HOT_SEARCHES = [
  { id: 1, text: '气虚', hot: true },
  { id: 2, text: '阳虚', hot: false },
  { id: 3, text: '檀香', hot: true },
  { id: 4, text: '沉香', hot: false },
  { id: 5, text: '补气', hot: false },
  { id: 6, text: '安神', hot: true },
  { id: 7, text: '养生手串', hot: false },
  { id: 8, text: '体质测试', hot: false },
]

// 历史搜索（本地存储）
const HISTORY_KEY = 'search_history'

// 搜索结果类型
interface SearchResult {
  products: Array<{
    id: string
    name: string
    price: number
    image: string
    constitution: string
    sales: number
  }>
  constitutions: Array<{
    id: string
    name: string
    color: string
    bg: string
    desc: string
  }>
  spices: Array<{
    id: string
    name: string
    effect: string
    constitution: string
  }>
}

const SearchPage: FC = () => {
  const [keyword, setKeyword] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const saved = Taro.getStorageSync(HISTORY_KEY)
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch (e) {
      console.error('加载历史记录失败', e)
    }
  }

  const saveHistory = (text: string) => {
    const newHistory = [text, ...history.filter(h => h !== text)].slice(0, 10)
    setHistory(newHistory)
    Taro.setStorageSync(HISTORY_KEY, JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    Taro.showModal({
      title: '提示',
      content: '确定清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          setHistory([])
          Taro.removeStorageSync(HISTORY_KEY)
        }
      }
    })
  }

  const handleSearch = async (text: string) => {
    const searchKey = text || keyword.trim()
    if (!searchKey) {
      Taro.showToast({ title: '请输入搜索内容', icon: 'none' })
      return
    }

    setIsSearching(true)
    saveHistory(searchKey)

    try {
      const res = await Network.request({
        url: '/api/product/search',
        method: 'GET',
        data: { keyword: searchKey }
      })
      console.log('搜索结果:', res.data)
      setResults(res.data.data || { products: [], constitutions: [], spices: [] })
    } catch (error) {
      console.error('搜索失败:', error)
      Taro.showToast({ title: '搜索失败', icon: 'none' })
    } finally {
      setIsSearching(false)
    }
  }

  const handleClear = () => {
    setKeyword('')
    setResults(null)
  }

  const handleProductClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleConstitutionClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/product/detail?id=${id}` })
  }

  const handleSpiceClick = (name: string) => {
    // 跳转到定制页面并带上香料参数
    Taro.switchTab({ url: '/pages/customize/index' })
    Taro.showToast({ title: `已选择香料: ${name}`, icon: 'none' })
  }

  return (
    <View className="min-h-screen bg-[#F7F4ED]">
      {/* 搜索头部 */}
      <View className="bg-white px-4 py-3 flex items-center gap-3 border-b border-[#E5DDD3]">
        <View className="flex-1 bg-[#F7F4ED] rounded-full px-4 py-2 flex items-center">
          <Search size={18} color="#8B7355" />
          <Input
            className="flex-1 ml-2 text-sm text-[#2C1810]"
            placeholder="搜索体质、商品、香料..."
            placeholderClass="text-[#8B7355]"
            value={keyword}
            onInput={(e) => setKeyword(e.detail.value)}
            onConfirm={() => handleSearch('')}
            confirmType="search"
          />
          {keyword && (
            <View className="p-1" onClick={handleClear}>
              <X size={16} color="#8B7355" />
            </View>
          )}
        </View>
        <View
          className="px-3 py-2 rounded-full bg-[#EBE3D5]"
          onClick={() => handleSearch('')}
        >
          <Text className="text-sm text-[#5D3A1A]">搜索</Text>
        </View>
      </View>

      {/* 内容区域 */}
      <ScrollView scrollY className="h-[calc(100vh-60px)]">
        {results ? (
          /* 搜索结果 */
          <View className="p-4">
            {/* 商品结果 */}
            {results.products.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-bold text-[#2C1810] mb-3">商品</Text>
                <View className="space-y-3">
                  {results.products.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <View className="w-20 h-20 rounded-lg bg-[#F7F4ED] overflow-hidden mr-3">
                          <Image
                            src={product.image}
                            className="w-full h-full"
                            mode="aspectFill"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-medium text-[#2C1810] mb-1">{product.name}</Text>
                          <Text className="text-xs text-[#6B5D52] mb-2">{product.constitution}</Text>
                          <View className="flex items-baseline">
                            <Text className="text-xs text-[#8B2500]">¥</Text>
                            <Text className="text-lg font-bold text-[#8B2500]">{product.price}</Text>
                            <Text className="text-xs text-[#6B5D52]/70 ml-2">已售{product.sales}</Text>
                          </View>
                        </View>
                        <ChevronRight size={20} color="#8B7355" />
                      </CardContent>
                    </Card>
                  ))}
                </View>
              </View>
            )}

            {/* 体质结果 */}
            {results.constitutions.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-bold text-[#2C1810] mb-3">体质</Text>
                <View className="flex flex-wrap gap-2">
                  {results.constitutions.map((constitution) => (
                    <View
                      key={constitution.id}
                      className="px-4 py-2 rounded-full"
                      style={{ backgroundColor: constitution.bg }}
                      onClick={() => handleConstitutionClick(constitution.id)}
                    >
                      <Text className="text-sm" style={{ color: constitution.color }}>
                        {constitution.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* 香料结果 */}
            {results.spices.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-bold text-[#2C1810] mb-3">香料</Text>
                <View className="space-y-2">
                  {results.spices.map((spice) => (
                    <Card
                      key={spice.id}
                      className="bg-white rounded-xl"
                      onClick={() => handleSpiceClick(spice.name)}
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <View>
                          <Text className="text-sm font-medium text-[#2C1810]">{spice.name}</Text>
                          <Text className="text-xs text-[#6B5D52]">{spice.effect}</Text>
                        </View>
                        <View className="px-2 py-1 bg-[#F7F4ED] rounded">
                          <Text className="text-xs text-[#8B2500]">{spice.constitution}</Text>
                        </View>
                      </CardContent>
                    </Card>
                  ))}
                </View>
              </View>
            )}

            {/* 无结果 */}
            {results.products.length === 0 && results.constitutions.length === 0 && results.spices.length === 0 && (
              <View className="flex flex-col items-center justify-center py-20">
                <Text className="text-4xl mb-4">🔍</Text>
                <Text className="text-sm text-[#6B5D52]">未找到相关结果</Text>
                <Text className="text-xs text-[#8B7355] mt-1">换个关键词试试吧</Text>
              </View>
            )}
          </View>
        ) : (
          /* 默认状态：热门搜索 + 历史记录 */
          <View className="p-4">
            {/* 历史搜索 */}
            {history.length > 0 && (
              <View className="mb-6">
                <View className="flex items-center justify-between mb-3">
                  <View className="flex items-center">
                    <Clock size={16} color="#6B5D52" />
                    <Text className="text-sm text-[#2C1810] ml-2">历史搜索</Text>
                  </View>
                  <View onClick={clearHistory}>
                    <Text className="text-xs text-[#8B7355]">清空</Text>
                  </View>
                </View>
                <View className="flex flex-wrap gap-2">
                  {history.map((item, index) => (
                    <View
                      key={index}
                      className="px-3 py-2 bg-white rounded-full"
                      onClick={() => {
                        setKeyword(item)
                        handleSearch(item)
                      }}
                    >
                      <Text className="text-sm text-[#3D2B1F]">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* 热门搜索 */}
            <View>
              <View className="flex items-center mb-3">
                <TrendingUp size={16} color="#8B2500" />
                <Text className="text-sm text-[#2C1810] ml-2">热门搜索</Text>
              </View>
              <View className="flex flex-wrap gap-2">
                {HOT_SEARCHES.map((item) => (
                  <View
                    key={item.id}
                    className="px-3 py-2 bg-white rounded-full flex items-center"
                    onClick={() => {
                      setKeyword(item.text)
                      handleSearch(item.text)
                    }}
                  >
                    {item.hot && (
                      <Text className="text-xs text-[#8B2500] mr-1">🔥</Text>
                    )}
                    <Text className="text-sm text-[#3D2B1F]">{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 搜索提示 */}
            <View className="mt-8 p-4 bg-white rounded-xl">
              <Text className="text-sm text-[#2C1810] mb-2">搜索提示</Text>
              <Text className="text-xs text-[#6B5D52] block">• 输入体质名称查看相关商品</Text>
              <Text className="text-xs text-[#6B5D52] block mt-1">• 输入香料名称了解功效</Text>
              <Text className="text-xs text-[#6B5D52] block mt-1">• 输入商品关键词直接购买</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 搜索中状态 */}
      {isSearching && (
        <View className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <View className="bg-white rounded-xl px-6 py-4 flex items-center">
            <Text className="text-sm text-[#2C1810] ml-2">搜索中...</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchPage
