# 华烨尚医 设计指南（元古风格 100%复刻）

## 一、品牌定位

- **品牌名称**：华烨尚医
- **设计风格**：东方侘寂风 + 纤细典雅
- **核心调性**：纯净、留白、呼吸感、纤细、优雅、中国风
- **目标用户**：25-40岁新白领，追求品质生活

## 二、配色方案

### 主色调
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 元古浅卡其 | #C9B78F | `text-[#C9B78F]` | 选中态、价格 |

### 背景色
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 纯白 | #FFFFFF | `bg-white` | 所有页面背景 |

### 中性色
| 颜色名称 | 色值 | Tailwind 类名 | 用途 |
|---------|------|--------------|------|
| 纯黑 | #000000 | `text-black` | 标题 |
| 深灰 | #666666 | `text-gray-600` | 次要文字 |
| 浅灰 | #999999 | `text-gray-500` | 说明文字 |
| 分割灰 | #E5E5E5 | `border-gray-200` | 分割线 |

## 三、字体规范（像素级复刻）

### 字体风格
- **品牌名**：手写书法字体风格（可用细体字模拟）
- **正文**：纤细无衬线字体
- **整体**：纤细、优雅、轻盈

### 字号规范（精确像素值）
| 层级 | 字号 | Tailwind 类名 | 用途 |
|-----|------|--------------|------|
| 品牌大字 | 48px | `text-5xl` | 品牌主标题 |
| 品牌副标题 | 36px | `text-4xl` | 品牌英文名 |
| 商品标题 | 28px | `text-3xl` | 商品名称 |
| 价格数字 | 26px | `text-2xl` | 商品价格 |
| 筛选栏 | 24px | `text-xl` | 筛选标签 |
| 商品副标题 | 18px | `text-base` | 商品描述 |
| 底部导航 | 20px | `text-lg` | 导航文字 |
| 英文小字 | 14px | `text-sm` | 英文说明 |

### 字重规范
- **所有文字**：300（font-light）- 纤细轻盈
- **价格数字**：400（font-normal）- 稍突出

### 关键实现
```tsx
// 品牌大字（48px，字重300）
<Text className="text-5xl text-black font-light">华烨尚医</Text>

// 商品标题（28px，字重300）
<Text className="text-3xl text-black font-light">平和养生手串</Text>

// 价格（26px，字重400）
<Text className="text-2xl text-[#C9B78F] font-normal">¥298</Text>

// 筛选栏（24px，字重300）
<Text className="text-xl text-gray-500 font-light">销量</Text>

// 商品副标题（18px，字重300）
<Text className="text-base text-gray-500 font-light">阴阳调和，精力充沛</Text>

// 底部导航（20px，字重300）
<Text className="text-lg text-gray-500 font-light">首页</Text>
```

## 四、间距系统

| 类型 | 数值 | Tailwind 类名 |
|-----|------|--------------|
| 页面侧边距 | 24px | `px-6` |
| 元素间距 | 16px | `gap-4` |
| 图标与文字 | 8px | `gap-2` |

## 五、组件规范

### 按钮样式
```tsx
// 主要按钮 - 清新淡雅米色背景 + 深棕色文字
<View
  className="px-6 py-2 rounded-full"
  style={{ backgroundColor: '#EBE3D5' }}
>
  <Text className="text-[#5D3A1A] text-sm font-medium">按钮文字</Text>
</View>

// 次要按钮 - 边框样式
<View
  className="border border-[#5D3A1A] rounded-full px-6 py-2"
>
  <Text className="text-[#5D3A1A] text-sm font-medium">按钮文字</Text>
</View>

// 禁用按钮
<View
  className="px-6 py-2 rounded-full"
  style={{ backgroundColor: '#D4D4D4' }}
>
  <Text className="text-gray-500 text-sm font-medium">禁用按钮</Text>
</View>
```

### 底部导航栏
```typescript
tabBar: {
  color: '#999999',
  selectedColor: '#C9B78F',
  backgroundColor: '#FFFFFF',
  borderStyle: 'white'
}
// 文字字号：20px
// 图标尺寸：24x24px
// 图标与文字间距：8px
```

### 分割线
```tsx
<View className="h-px bg-gray-200" />  // 1px高
```

### 空状态
```tsx
<View className="flex flex-col items-center justify-center pt-32">
  <ShoppingCart size={80} color="#D4D4D4" />
  <Text className="text-xl text-gray-500 font-light mt-8">购物车还是空的</Text>
  <Text className="text-base text-gray-400 font-light mt-3">快去挑选心仪的养生手串吧</Text>
</View>
```

## 六、页面设计要点

### 首页（极度留白）
1. 纯白背景
2. 顶部留白32%屏幕高度
3. 品牌意境图居中
4. 右侧品牌拼音纵向（字间距8px）
5. 文字链接无按钮

### 商品列表页（清新典雅）
1. 纯白背景
2. 浅卡其标题栏
3. 筛选栏字号24px
4. 商品标题28px
5. 价格26px
6. 副标题18px

### 购物车页（极简设计）
1. 纯白背景
2. 空状态字号：标题24px，副标题18px
3. 线框按钮

### 个人中心页（模块化设计）
1. 浅卡其标题栏
2. 黑色用户区
3. 白色模块
4. 灰色图标背景

## 七、中国风体现

### 布局方式
- 极度留白（营造东方禅意）
- 纵向居中对齐
- 对称布局

### 字体风格
- 纤细笔画（体现优雅）
- 手写书法感（品牌名）
- 整体轻盈（呼吸感）

### 配色方案
- 纯白背景（纯净）
- 浅卡其主色（温暖）
- 黑灰文字（雅致）

## 八、关键注意事项

### 字体大小
❌ 错误：使用过大字号（如 text-4xl 用于正文）
✅ 正确：严格按照像素值设置字号

### 字重
❌ 错误：使用粗体（font-bold）
✅ 正确：统一使用 font-light（300）

### 风格统一
❌ 错误：不同页面使用不同字号
✅ 正确：所有页面使用统一字号规范

### 中国风体现
❌ 错误：通过字体颜色或粗细体现
✅ 正确：通过留白、布局、纤细笔画体现
