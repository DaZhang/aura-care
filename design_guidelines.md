# 东方养生·华烨尚医 设计指南（元古风格）

## 一、品牌定位

- **品牌名称**：华烨尚医
- **品牌Slogan**：一人一方，一串一养生
- **设计风格**：东方侘寂风 + 极简质感
- **核心调性**：安静、治愈、贴近本真、质朴、雅致
- **目标用户**：25-40岁新白领，追求品质生活但受亚健康困扰

## 二、配色方案

### 主色调
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 浅卡其 | #CBBE9C | `text-[#CBBE9C]` `bg-[#CBBE9C]` | 主色，品牌核心识别色，传递自然温暖 |

### 辅助色
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 暖黄 | #D4A84B | `text-[#D4A84B]` | 价格、强调信息 |
| 墨黑 | #1A1A1A | `text-gray-900` | 标题、品牌标识 |
| 深灰 | #666666 | `text-gray-600` | 说明文字 |
| 浅灰 | #999999 | `text-gray-500` | 次要文字、未选中态 |
| 背景白 | #FDF9F3 | `bg-[#FDF9F3]` | 页面背景 |
| 分割灰 | #E5E5E5 | `border-gray-200` | 分割线 |

### 中性色
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 纯白 | #FFFFFF | `bg-white` | 卡片背景、按钮文字 |
| 纯黑 | #000000 | `text-black` | 强对比文字 |

### 语义色
| 状态 | 色值 | Tailwind 类名 |
|-----|------|--------------|
| 成功 | #10B981 | `text-green-500` |
| 警告 | #F59E0B | `text-amber-500` |
| 错误 | #EF4444 | `text-red-500` |

## 三、字体规范

| 层级 | 字号 | 字重 | 用途 |
|-----|------|------|------|
| 品牌标识 | 32px | 手写书法字体 | Logo、品牌名 |
| H1 | 24px | Bold | 页面主标题 |
| H2 | 20px | Semibold | 模块标题 |
| H3 | 18px | Semibold | 卡片标题 |
| Body | 16px | Regular | 正文内容 |
| Caption | 14px | Regular | 辅助说明 |
| Small | 12px | Regular | 标签、提示 |

### 字体选择
- **品牌标识**：手写书法字体，传递东方禅意和艺术感
- **正文**：无衬线字体（苹方/思源黑体），笔画简洁，阅读舒适
- **英文**：纤细的无衬线字体，增加精致感

## 四、间距系统

| 类型 | 数值 | Tailwind 类名 |
|-----|------|--------------|
| 页面边距 | 20px | `px-5` |
| 卡片内边距 | 16px | `p-4` |
| 列表间距 | 16px | `gap-4` |
| 组件间距 | 12px | `gap-3` |

## 五、组件规范

### 按钮样式
```tsx
// 线框按钮 - 浅卡其色细边框
<View className="border border-[#CBBE9C] rounded-full px-8 py-3">
  <Text className="text-[#CBBE9C] text-base">去逛逛</Text>
</View>

// 圆形图标按钮 - 极简风格
<View className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
  <ShoppingCart size={20} color="#666" />
</View>

// 纯文字按钮
<Text className="text-[#CBBE9C] text-sm">查看全部</Text>
```

### 卡片样式
```tsx
// 白色圆角卡片
<View className="bg-white rounded-2xl p-4">
  {/* 内容 */}
</View>

// 商品卡片 - 无框极简
<View className="flex items-start py-4 border-b border-gray-100">
  <Image src={productImage} className="w-24 h-24 rounded-lg" />
  <View className="ml-4 flex-1">
    <Text className="text-base font-medium text-gray-900">{title}</Text>
    <Text className="text-sm text-gray-500 mt-1">{desc}</Text>
    <Text className="text-lg font-bold text-[#D4A84B] mt-2">¥{price}</Text>
  </View>
</View>
```

### 导航栏样式
```tsx
// 顶部标题栏 - 浅卡其色
<View className="bg-[#CBBE9C] h-12 flex items-center justify-center">
  <Text className="text-base font-medium text-white">购物车</Text>
</View>

// 底部导航栏 - 白色背景
// 选中态：浅卡其色文字
// 未选中态：浅灰色文字
```

### 空状态样式
```tsx
<View className="flex flex-col items-center justify-center py-24">
  <Image src={emptyIcon} className="w-32 h-32 opacity-60" />
  <Text className="mt-6 text-gray-500 text-lg">购物车还是空的</Text>
  <View className="mt-6 border border-[#CBBE9C] rounded-full px-8 py-3">
    <Text className="text-[#CBBE9C]">去逛逛</Text>
  </View>
</View>
```

## 六、导航结构

### TabBar 配置
```typescript
// app.config.ts
tabBar: {
  color: '#999999',
  selectedColor: '#CBBE9C',
  backgroundColor: '#FFFFFF',
  borderStyle: 'white',
  list: [
    { 
      pagePath: 'pages/index/index', 
      text: '首页', 
      iconPath: './assets/tabbar/home.png', 
      selectedIconPath: './assets/tabbar/home-active.png' 
    },
    { 
      pagePath: 'pages/customize/index', 
      text: '全部商品', 
      iconPath: './assets/tabbar/grid.png', 
      selectedIconPath: './assets/tabbar/grid-active.png' 
    },
    { 
      pagePath: 'pages/cart/index', 
      text: '购物车', 
      iconPath: './assets/tabbar/cart.png', 
      selectedIconPath: './assets/tabbar/cart-active.png' 
    },
    { 
      pagePath: 'pages/profile/index', 
      text: '我的', 
      iconPath: './assets/tabbar/meditation.png', 
      selectedIconPath: './assets/tabbar/meditation-active.png' 
    }
  ]
}
```

### 页面路由
- `pages/index/index` - 首页（品牌意境图+极度留白）
- `pages/customize/index` - 全部商品（商品列表）
- `pages/cart/index` - 购物车
- `pages/profile/index` - 个人中心
- `pages/product/detail` - 商品详情
- `pages/test/index` - 体质测试
- `pages/profile/orders` - 订单列表

## 七、图标规范

### 图标风格
- **类型**：极简线性图标
- **颜色**：黑/灰/浅卡其色
- **特点**：弱化处理，无鲜艳颜色，保持页面沉静感

### 底部导航图标
- 首页：小房子剪影图标（复古屋顶细节）
- 全部商品：方块网格图标
- 购物车：经典购物车线性图标
- 我的：盘腿静坐人物剪影（传递禅意）

### 功能图标
- 订单状态：纤细线性图标（钱包、包裹、时钟等）
- 空状态：极简线条画（空盒子、小树等）
- 箭头：极简灰色右箭头

## 八、页面设计要点

### 首页设计
1. **极度留白** - 大量留白营造呼吸感
2. **品牌意境图** - 中下部展示，视觉重心
3. **品牌拼音** - 右侧纵向排列
4. **异形导航** - 中间品牌按钮上浮突出

### 商品列表页
1. **浅卡其标题栏** - 顶部通栏
2. **排序标签栏** - 横向排列（销量/新品/综合）
3. **左图右文布局** - 经典商品展示
4. **价格暖黄色** - 形成视觉重点

### 购物车页
1. **空状态设计** - 居中对齐，视觉动线清晰
2. **极简插画** - 浅灰色空盒子+小树
3. **线框按钮** - 浅卡其色细边框

### 个人中心页
1. **黑色用户区** - 顶部突出身份
2. **资产数据区** - 卡余额、积分、优惠券
3. **订单区** - 5种状态横向排列
4. **功能列表** - 左文右箭头布局

## 九、交互体验

### 动效规范
1. **页面切换** - 流畅过渡，无突兀感
2. **按钮反馈** - 轻微缩放，自然响应
3. **滚动效果** - 平滑滚动，自然减速

### 手势操作
1. **下拉刷新** - 列表页支持下拉
2. **滑动切换** - 卡片式问答
3. **长按操作** - 删除、编辑等

## 十、性能优化

1. **图片懒加载** - 商品列表按需加载
2. **分页加载** - 列表数据分页请求
3. **骨架屏** - 加载时展示占位
4. **缓存策略** - 合理使用本地缓存

## 十一、九大体质配色（保持原有）

| 体质 | 主色 | 辅色 | 特点 |
|-----|------|------|------|
| 平和质 | #10B981 | #D1FAE5 | 绿色，平衡和谐 |
| 气虚质 | #F59E0B | #FEF3C7 | 橙色，温和补气 |
| 阳虚质 | #EF4444 | #FEE2E2 | 红色，温阳散寒 |
| 阴虚质 | #8B5CF6 | #EDE9FE | 紫色，滋阴润燥 |
| 痰湿质 | #6B7280 | #F3F4F6 | 灰色，化痰祛湿 |
| 湿热质 | #F97316 | #FFEDD5 | 深橙，清热利湿 |
| 血瘀质 | #DC2626 | #FEE2E2 | 深红，活血化瘀 |
| 气郁质 | #6366F1 | #E0E7FF | 靛蓝，疏肝解郁 |
| 特禀质 | #EC4899 | #FCE7F3 | 粉色，益气固表 |
