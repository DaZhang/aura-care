import { View, Text, ScrollView } from '@tarojs/components'
import { BookOpen, Leaf, Heart, Moon, Sun, Droplets, ChevronRight } from 'lucide-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'

// 养生知识分类
const KNOWLEDGE_CATEGORIES = [
  {
    id: 'season',
    title: '四季养生',
    desc: '顺应四时，调养身心',
    icon: Sun,
    bgColor: '#F5E6E0',
    iconColor: '#A63D2B'
  },
  {
    id: 'constitution',
    title: '体质调理',
    desc: '九种体质，九种养生',
    icon: Leaf,
    bgColor: '#E8F0E8',
    iconColor: '#4A5D4A'
  },
  {
    id: 'sleep',
    title: '睡眠养生',
    desc: '安神助眠，睡出健康',
    icon: Moon,
    bgColor: '#E8EEF2',
    iconColor: '#4A6572'
  },
  {
    id: 'emotion',
    title: '情志养生',
    desc: '调畅情志，身心和谐',
    icon: Heart,
    bgColor: '#F5EEF5',
    iconColor: '#8B668B'
  },
  {
    id: 'diet',
    title: '饮食养生',
    desc: '药食同源，食养身心',
    icon: Droplets,
    bgColor: '#FBF5E6',
    iconColor: '#B8860B'
  },
  {
    id: 'classic',
    title: '中医典籍',
    desc: '传承经典，智慧养生',
    icon: BookOpen,
    bgColor: '#F5EFE0',
    iconColor: '#5D4E37'
  }
]

// 文章数据
const ARTICLES_BY_CATEGORY: Record<string, Array<{ id: string; title: string; summary: string; readTime: string; content: string }>> = {
  season: [
    {
      id: 's1',
      title: '春季养生：疏肝理气正当时',
      summary: '春季对应肝，肝主疏泄，春季养生重在养肝护肝...',
      readTime: '5分钟',
      content: '春季是万物复苏的季节，中医认为春季对应肝，肝主疏泄，喜条达而恶抑郁。春季养生应顺应春天阳气生发的特点，注意养肝护肝。\n\n【饮食调养】\n春季饮食宜清淡，多食蔬菜水果，少食油腻辛辣。可适当食用辛温发散的食物，如韭菜、葱、蒜等，以助阳气升发。\n\n【起居调养】\n春季应"夜卧早起，广步于庭"，适当增加户外活动，呼吸新鲜空气，晒晒太阳。\n\n【情志调养】\n春季要保持心情舒畅，避免暴怒和抑郁，可多参加户外活动，放松心情。'
    },
    {
      id: 's2',
      title: '夏季养生：养心清热解暑气',
      summary: '夏季对应心，心主血脉，夏季养生重在养心清热...',
      readTime: '6分钟',
      content: '夏季是阳气最盛的季节，中医认为夏季对应心，心主血脉，主神明。夏季养生应重在养心清热，防暑避湿。\n\n【饮食调养】\n夏季宜清淡饮食，多食苦味食物如苦瓜、莲子心等，可清热解暑。适当食用酸味食物，以生津止渴。\n\n【起居调养】\n夏季应"夜卧早起，无厌于日"，但要注意避免长时间暴晒，午间适当休息。\n\n【运动调养】\n夏季运动宜在清晨或傍晚进行，避免剧烈运动，以防大汗伤津。'
    },
    {
      id: 's3',
      title: '秋季养生：养阴润燥防秋燥',
      summary: '秋季对应肺，肺主气，秋季养生重在养阴润燥...',
      readTime: '5分钟',
      content: '秋季是阳气收敛的季节，中医认为秋季对应肺，肺主气，司呼吸。秋季养生应重在养阴润燥。\n\n【饮食调养】\n秋季宜滋阴润燥，多食梨、百合、银耳、蜂蜜等润燥食物，少食辛辣燥热之品。\n\n【起居调养】\n秋季应"早卧早起，与鸡俱兴"，注意添加衣物，避免受凉。\n\n【情志调养】\n秋季易生悲秋之情，要保持心情愉悦，可多参加户外活动，欣赏秋景。'
    },
    {
      id: 's4',
      title: '冬季养生：补肾藏精养真元',
      summary: '冬季对应肾，肾主藏精，冬季养生重在补肾藏精...',
      readTime: '6分钟',
      content: '冬季是阴气最盛、阳气潜藏的季节，中医认为冬季对应肾，肾主藏精，为先天之本。冬季养生应重在补肾藏精。\n\n【饮食调养】\n冬季宜温补，可适当食用羊肉、狗肉、韭菜等温补食物，以及核桃、黑芝麻等补肾食物。\n\n【起居调养】\n冬季应"早卧晚起，必待日光"，注意保暖，避免寒邪侵袭。\n\n【运动调养】\n冬季运动不宜过于剧烈，可在阳光充足时进行散步、太极等缓和运动。'
    }
  ],
  constitution: [
    {
      id: 'c1',
      title: '气虚体质如何调理？',
      summary: '气虚体质的人容易疲乏、气短、自汗，调理应以补气为主...',
      readTime: '8分钟',
      content: '气虚体质的人元气不足，主要表现为容易疲乏、气短懒言、自汗、易感冒等。\n\n【饮食调理】\n宜食补气食物：黄芪、人参、白术、山药、大枣等。可常食黄芪炖鸡、人参乌鸡汤等。\n\n【运动调理】\n宜柔缓运动，如散步、太极拳、八段锦等，避免剧烈运动耗气。\n\n【起居调理】\n注意保暖，避免风寒，保证充足睡眠，避免过度劳累。\n\n【情志调理】\n保持心情平和，避免过度思虑，可听舒缓音乐放松身心。'
    },
    {
      id: 'c2',
      title: '阳虚体质的温补之道',
      summary: '阳虚体质的人畏寒怕冷，调理应以温补阳气为主...',
      readTime: '7分钟',
      content: '阳虚体质的人阳气不足，主要表现为畏寒怕冷、手足不温、面色柔白等。\n\n【饮食调理】\n宜食温补食物：羊肉、狗肉、韭菜、核桃、桂圆等。可常食当归生姜羊肉汤、核桃仁粥等。\n\n【运动调理】\n宜在阳光充足时运动，如慢跑、爬山等，以助阳气升发。\n\n【起居调理】\n注意保暖，多晒太阳，避免久居寒湿之地。\n\n【情志调理】\n保持积极乐观的心态，多参加社交活动。'
    }
  ],
  sleep: [
    {
      id: 'sl1',
      title: '失眠的中医调理方法',
      summary: '失眠多因心神不宁、阴阳失调，可通过中药调理、穴位按摩等方法改善...',
      readTime: '6分钟',
      content: '失眠是现代人常见的睡眠障碍，中医认为失眠多由心神不宁、阴阳失调所致。\n\n【中药调理】\n常用安神药物：酸枣仁、柏子仁、远志、合欢皮、夜交藤等。可煎汤服用或泡茶饮用。\n\n【穴位按摩】\n可按摩神门穴、内关穴、三阴交穴、安眠穴等，每日睡前按摩15-20分钟。\n\n【饮食调理】\n睡前可喝温牛奶、蜂蜜水，或食用莲子百合粥等安神食物。\n\n【生活调理】\n保持规律作息，睡前避免剧烈运动和过度用脑，营造安静舒适的睡眠环境。'
    }
  ],
  emotion: [
    {
      id: 'e1',
      title: '情志养生：调和七情益健康',
      summary: '中医认为七情过激会损伤脏腑，调和情志是养生的重要方面...',
      readTime: '5分钟',
      content: '中医认为喜、怒、忧、思、悲、恐、惊七情与五脏相应，过激的情绪会损伤相应的脏腑。\n\n【七情与五脏】\n喜伤心、怒伤肝、忧伤肺、思伤脾、悲伤肺、恐伤肾、惊伤心。\n\n【情志调养方法】\n1. 保持心态平和，避免过激情绪\n2. 学会情绪疏导，适当表达情感\n3. 培养兴趣爱好，陶冶情操\n4. 多与亲友交流，释放压力\n5. 亲近大自然，放松心情\n\n【食疗养心】\n可食用玫瑰花茶疏肝解郁，百合莲子汤养心安神。'
    }
  ],
  diet: [
    {
      id: 'd1',
      title: '药食同源：食疗养生智慧',
      summary: '中医讲究药食同源，许多食物既是美味佳肴，也是养生良药...',
      readTime: '7分钟',
      content: '中医认为"药食同源"，许多食物既有营养价值，又有药用功效。\n\n【常见食疗食物】\n枸杞：滋补肝肾，益精明目\n红枣：补中益气，养血安神\n山药：健脾益胃，滋肾益精\n莲子：养心安神，健脾止泻\n桂圆：补益心脾，养血安神\n百合：养阴润肺，清心安神\n\n【食疗原则】\n1. 辨证施食：根据体质选择食物\n2. 四季调食：顺应季节调整饮食\n3. 适量均衡：不过食不偏食\n4. 配伍得当：注意食物搭配禁忌'
    }
  ],
  classic: [
    {
      id: 'cl1',
      title: '《黄帝内经》养生智慧',
      summary: '《黄帝内经》是中医养生的基础典籍，蕴含丰富的养生智慧...',
      readTime: '10分钟',
      content: '《黄帝内经》是中国最早的医学典籍，被誉为"医家之宗"，其中蕴含了丰富的养生智慧。\n\n【核心思想】\n"法于阴阳，和于术数，食饮有节，起居有常，不妄作劳"\n\n【养生原则】\n1. 顺应自然：遵循四时变化，春夏养阳，秋冬养阴\n2. 形神兼养：既要保养身体，又要调摄精神\n3. 动静结合：劳逸结合，适度运动\n4. 饮食有节：饮食清淡，定时定量\n5. 起居有常：规律作息，保证睡眠\n\n【原文精粹】\n"恬淡虚无，真气从之，精神内守，病安从来"\n这告诉我们保持心态平和是养生保健的关键。'
    }
  ]
}

// 推荐文章
const RECOMMENDED_ARTICLES = [
  {
    id: '1',
    title: '春季养生：疏肝理气正当时',
    summary: '春季对应肝，肝主疏泄，春季养生重在养肝护肝...',
    category: '四季养生',
    categoryId: 'season',
    readTime: '5分钟'
  },
  {
    id: '2',
    title: '气虚体质如何调理？',
    summary: '气虚体质的人容易疲乏、气短、自汗，调理应以补气为主...',
    category: '体质调理',
    categoryId: 'constitution',
    readTime: '8分钟'
  },
  {
    id: '3',
    title: '失眠的中医调理方法',
    summary: '失眠多因心神不宁、阴阳失调，可通过中药调理、穴位按摩等方法改善...',
    category: '睡眠养生',
    categoryId: 'sleep',
    readTime: '6分钟'
  },
  {
    id: '4',
    title: '《黄帝内经》养生智慧',
    summary: '《黄帝内经》是中医养生的基础典籍，蕴含丰富的养生智慧...',
    category: '中医典籍',
    categoryId: 'classic',
    readTime: '10分钟'
  }
]

const KnowledgePage: FC = () => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [categoryArticles, setCategoryArticles] = useState<typeof RECOMMENDED_ARTICLES>([])

  useEffect(() => {
    // 检查是否有传入的分类参数
    const category = router.params.category
    if (category && KNOWLEDGE_CATEGORIES.find(c => c.id === category)) {
      handleCategoryClick(category)
    }
  }, [router.params])

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    const articles = ARTICLES_BY_CATEGORY[categoryId] || []
    setCategoryArticles(articles.map(a => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      category: KNOWLEDGE_CATEGORIES.find(c => c.id === categoryId)?.title || '',
      categoryId: categoryId,
      readTime: a.readTime
    })))
  }

  const handleBackToList = () => {
    setActiveCategory(null)
    setCategoryArticles([])
  }

  const handleArticleClick = (article: typeof RECOMMENDED_ARTICLES[0]) => {
    // 获取文章详情内容
    const articleDetail = ARTICLES_BY_CATEGORY[article.categoryId]?.find(a => a.id === article.id)
    if (articleDetail) {
      // 保存文章内容到本地存储，供详情页读取
      Taro.setStorageSync('articleDetail', JSON.stringify({
        ...article,
        content: articleDetail.content
      }))
      Taro.navigateTo({ url: `/pages/knowledge/detail?id=${article.id}` })
    } else {
      Taro.showToast({ title: '文章内容加载中', icon: 'none' })
    }
  }

  const category = activeCategory ? KNOWLEDGE_CATEGORIES.find(c => c.id === activeCategory) : null

  return (
    <ScrollView scrollY className="h-screen bg-white">
      {/* 顶部标题 */}
      <View className="pt-8 pb-4 px-6">
        <View className="flex flex-row items-center">
          {activeCategory && (
            <View 
              className="mr-3"
              onClick={handleBackToList}
            >
              <ChevronRight size={20} color="#5D3A1A" style={{ transform: 'rotate(180deg)' }} />
            </View>
          )}
          <Text 
            className="text-black"
            style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '4px' }}
          >
            {category?.title || '养生知识'}
          </Text>
        </View>
        <Text 
          className="text-[#8B7355] mt-2"
          style={{ fontSize: '14px', fontWeight: 300 }}
        >
          {category?.desc || '中医养生，传承千年智慧'}
        </Text>
      </View>

      {!activeCategory ? (
        /* 分类入口 */
        <>
          <View className="px-6 py-4">
            <View className="flex flex-wrap justify-between">
              {KNOWLEDGE_CATEGORIES.map((cat) => (
                <View
                  key={cat.id}
                  className="w-[48%] mb-4 p-4 rounded-2xl"
                  style={{ backgroundColor: cat.bgColor }}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <cat.icon size={28} color={cat.iconColor} />
                  <Text 
                    className="text-black mt-3"
                    style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
                  >
                    {cat.title}
                  </Text>
                  <Text 
                    className="text-[#8B7355] mt-1"
                    style={{ fontSize: '12px', fontWeight: 300 }}
                  >
                    {cat.desc}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 分割线 */}
          <View className="h-px bg-gray-200 mx-6" />

          {/* 推荐文章 */}
          <View className="px-6 py-4">
            <Text 
              className="text-black mb-4"
              style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '2px' }}
            >
              推荐阅读
            </Text>
            
            {RECOMMENDED_ARTICLES.map((article) => (
              <View
                key={article.id}
                className="py-4 border-b border-gray-100"
                onClick={() => handleArticleClick(article)}
              >
                <Text 
                  className="text-black"
                  style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
                >
                  {article.title}
                </Text>
                <Text 
                  className="text-[#8B7355] mt-2"
                  style={{ fontSize: '13px', fontWeight: 300 }}
                >
                  {article.summary}
                </Text>
                <View className="flex items-center justify-between mt-2">
                  <Text 
                    className="text-[#5D3A1A]"
                    style={{ fontSize: '12px', fontWeight: 400 }}
                  >
                    {article.category}
                  </Text>
                  <Text 
                    className="text-[#999999]"
                    style={{ fontSize: '12px', fontWeight: 300 }}
                  >
                    {article.readTime}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : (
        /* 分类文章列表 */
        <View className="px-6 py-4">
          {categoryArticles.length === 0 ? (
            <View className="flex flex-col items-center justify-center py-20">
              <BookOpen size={48} color="#D4D4D4" />
              <Text 
                className="text-[#8B7355] mt-4"
                style={{ fontSize: '14px', fontWeight: 300 }}
              >
                暂无相关文章
              </Text>
            </View>
          ) : (
            categoryArticles.map((article) => (
              <View
                key={article.id}
                className="py-4 border-b border-gray-100"
                onClick={() => handleArticleClick(article)}
              >
                <Text 
                  className="text-black"
                  style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '1px' }}
                >
                  {article.title}
                </Text>
                <Text 
                  className="text-[#8B7355] mt-2"
                  style={{ fontSize: '13px', fontWeight: 300 }}
                >
                  {article.summary}
                </Text>
                <View className="flex items-center justify-between mt-2">
                  <Text 
                    className="text-[#5D3A1A]"
                    style={{ fontSize: '12px', fontWeight: 400 }}
                  >
                    {article.category}
                  </Text>
                  <Text 
                    className="text-[#999999]"
                    style={{ fontSize: '12px', fontWeight: 300 }}
                  >
                    {article.readTime}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* 底部留白 */}
      <View className="h-24" />
    </ScrollView>
  )
}

export default KnowledgePage
