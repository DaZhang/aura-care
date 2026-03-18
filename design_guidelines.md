# 东方养生·华烨尚医 设计指南

## 一、品牌定位

- **品牌名称**：东方养生·华烨尚医
- **品牌Slogan**：一人一方，一串一养生
- **设计风格**：新中式 · 现代简约 · 呼吸感
- **目标用户**：25-40岁新白领，追求品质生活但受亚健康困扰

## 二、配色方案

### 主色调
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 黛青 | #1D3A4C | `text-[#1D3A4C]` `bg-[#1D3A4C]` | 主色，代表专业与底蕴 |
| 朱砂红 | #E54B4B | `text-[#E54B4B]` `bg-[#E54B4B]` | 强调色，代表能量与传承 |

### 辅助色
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 月白 | #F5F5F5 | `bg-gray-100` | 背景色 |
| 浅金 | #D4AF37 | `text-[#D4AF37]` `bg-[#D4AF37]` | 高级感点缀 |
| 雅灰 | #E0E0E0 | `border-gray-200` | 分割线 |
| 墨黑 | #1A1A1A | `text-gray-900` | 主要文字 |
| 烟灰 | #666666 | `text-gray-600` | 次要文字 |

### 语义色
| 状态 | 色值 | Tailwind 类名 |
|-----|------|--------------|
| 成功 | #10B981 | `text-green-500` |
| 警告 | #F59E0B | `text-amber-500` |
| 错误 | #EF4444 | `text-red-500` |

## 三、字体规范

| 层级 | 字号 | 字重 | 用途 |
|-----|------|------|------|
| H1 | 28px | Bold | 页面主标题 |
| H2 | 24px | Semibold | 模块标题 |
| H3 | 20px | Semibold | 卡片标题 |
| Body | 16px | Regular | 正文内容 |
| Caption | 14px | Regular | 辅助说明 |
| Small | 12px | Regular | 标签、提示 |

## 四、间距系统

| 类型 | 数值 | Tailwind 类名 |
|-----|------|--------------|
| 页面边距 | 16px | `px-4` |
| 卡片内边距 | 16px | `p-4` |
| 列表间距 | 12px | `gap-3` |
| 组件间距 | 8px | `gap-2` |

## 五、组件规范

### 按钮样式
```tsx
// 主按钮 - 黛青色
<Button className="bg-[#1D3A4C] text-white rounded-full px-6 py-3">
  开始测试
</Button>

// 次按钮 - 边框样式
<Button className="border border-[#1D3A4C] text-[#1D3A4C] rounded-full px-6 py-3">
  了解更多
</Button>

// 强调按钮 - 朱砂红
<Button className="bg-[#E54B4B] text-white rounded-full px-6 py-3">
  立即定制
</Button>
```

### 卡片样式
```tsx
// 商品卡片
<Card className="bg-white rounded-2xl shadow-sm overflow-hidden">
  <CardContent className="p-4">
    {/* 内容 */}
  </CardContent>
</Card>
```

### 输入框样式
```tsx
// 搜索框
<View className="bg-gray-50 rounded-full px-4 py-3 flex items-center">
  <Search size={20} color="#999" />
  <Input className="ml-2 text-sm" placeholder="搜索体质或商品..." />
</View>
```

### 列表项样式
```tsx
<View className="flex items-center p-4 bg-white border-b border-gray-100">
  <Image src={avatar} className="w-12 h-12 rounded-full" />
  <View className="ml-3 flex-1">
    <Text className="text-base font-medium text-gray-900">标题</Text>
    <Text className="text-sm text-gray-500 mt-1">描述</Text>
  </View>
  <ChevronRight size={20} color="#999" />
</View>
```

## 六、导航结构

### TabBar 配置
```typescript
// app.config.ts
tabBar: {
  color: '#999999',
  selectedColor: '#1D3A4C',
  backgroundColor: '#ffffff',
  borderStyle: 'white',
  list: [
    { pagePath: 'pages/index/index', text: '首页', iconPath: './assets/tabbar/home.png', selectedIconPath: './assets/tabbar/home-active.png' },
    { pagePath: 'pages/test/index', text: '体质测试', iconPath: './assets/tabbar/test.png', selectedIconPath: './assets/tabbar/test-active.png' },
    { pagePath: 'pages/customize/index', text: '定制', iconPath: './assets/tabbar/customize.png', selectedIconPath: './assets/tabbar/customize-active.png' },
    { pagePath: 'pages/profile/index', text: '我的', iconPath: './assets/tabbar/user.png', selectedIconPath: './assets/tabbar/user-active.png' }
  ]
}
```

### 页面路由
- `pages/index/index` - 首页（九大体质分类展示）
- `pages/test/index` - 体质测试
- `pages/test/result` - 测试结果
- `pages/product/detail` - 商品详情
- `pages/customize/index` - 个性化定制
- `pages/profile/index` - 个人中心
- `pages/profile/orders` - 订单列表
- `pages/profile/records` - 养生档案

## 七、空状态/加载态

### 加载中
```tsx
<View className="flex items-center justify-center py-12">
  <ActivityIndicator size="large" color="#1D3A4C" />
  <Text className="mt-3 text-gray-500">加载中...</Text>
</View>
```

### 空状态
```tsx
<View className="flex flex-col items-center justify-center py-16">
  <Image src={emptyIcon} className="w-24 h-24 opacity-50" />
  <Text className="mt-4 text-gray-500">暂无数据</Text>
  <Button className="mt-4 bg-[#1D3A4C] text-white rounded-full px-6 py-2 text-sm">
    去逛逛
  </Button>
</View>
```

## 八、九大体质配色

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

## 九、设计要点

### 新中式元素
1. **水墨扩散动画** - 用于测试页面背景
2. **卷轴展开效果** - 用于结果展示
3. **印章标识** - 品牌Logo及认证标记
4. **金色点缀** - 高级感与仪式感

### 交互体验
1. **卡片化问答** - 测试题以卡片形式呈现，滑动切换
2. **实时预览** - 定制时实时预览手串效果
3. **手势操作** - 滑动、长按等自然交互
4. **微动效** - 按钮点击、页面切换的流畅过渡

### 性能优化
1. **图片懒加载** - 商品列表图片按需加载
2. **分页加载** - 列表数据分页请求
3. **骨架屏** - 加载时展示内容占位
