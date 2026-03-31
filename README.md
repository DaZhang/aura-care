<div align="center">

# 🌿 东方养生·华烨尚医

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?style=for-the-badge)
![Taro](https://img.shields.io/badge/Taro-4.1.9-6190E8.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

**基于中医九种体质辨证的个性化养生手串电商小程序**

### ✨ 一人一方 · 一串一养生 ✨

[快速开始](#-快速开始) · [功能特性](#-功能特性) · [技术架构](#-技术架构) · [项目结构](#-项目结构) · [开发指南](#-开发指南)

---

<img src="https://img.shields.io/badge/微信小程序-支持-brightgreen" alt="微信小程序"/> <img src="https://img.shields.io/badge/H5-支持-brightgreen" alt="H5"/> <img src="https://img.shields.io/badge/支付宝小程序-可扩展-yellow" alt="支付宝小程序"/>

</div>

---

## 📖 项目简介

**东方养生·华烨尚医** 是一款融合传统中医智慧与现代电商体验的养生手串定制小程序。通过科学的体质测试，为用户精准推荐专属的养生手串，实现个性化的健康管理方案。

### 🎯 核心理念

- **中医体质辨识** - 基于王琦院士九种体质理论，科学识别用户体质特征
- **个性化定制** - 根据体质推荐专属配方，支持材质、尺寸、刻字定制
- **东方美学设计** - 元古风格 UI，水墨书法字体，传承东方韵味
- **完整电商体验** - 浏览、搜索、定制、下单、支付一站式服务

---

## ✨ 功能特性

### 🧬 体质测试系统

| 功能 | 描述 |
|------|------|
| 科学问卷 | 基于《中医体质分类与判定》标准设计问卷 |
| 智能分析 | 33道题目精准判断九种体质倾向 |
| 详细报告 | 提供体质特征、养生建议、饮食指南 |
| 历史记录 | 保存测试记录，追踪体质变化 |

### 📿 手串定制系统

| 功能 | 描述 |
|------|------|
| 体质推荐 | 根据体质自动推荐适合的手串配方 |
| 材质选择 | 檀香木、黄花梨、紫檀等多种天然材质 |
| 尺寸定制 | 支持多种尺寸和款式选择 |
| 刻字服务 | 支持个性化刻字，赠送精美礼盒 |

### 🛒 电商系统

| 功能 | 描述 |
|------|------|
| 商品浏览 | 分类浏览、体质筛选、搜索功能 |
| 购物车 | 本地持久化存储、批量操作、结算预览 |
| 订单管理 | 订单创建、支付、物流跟踪、历史查询 |
| 地址管理 | 多地址管理、默认地址、快捷选择 |

### 👤 用户中心

| 功能 | 描述 |
|------|------|
| 养生档案 | 体质记录、健康数据、养生建议 |
| 积分系统 | 购物积分、签到奖励、积分兑换 |
| 优惠券 | 领取优惠券、使用抵扣、过期提醒 |
| 消息通知 | 订单状态、促销活动、系统公告 |

---

## 🏗️ 技术架构

### 前端技术栈

<table>
<tr>
<td width="120"><b>技术</b></td>
<td width="100"><b>版本</b></td>
<td><b>说明</b></td>
</tr>
<tr>
<td><a href="https://taro.zone/">Taro</a></td>
<td>4.1.9</td>
<td>多端统一开发框架，一套代码多端运行</td>
</tr>
<tr>
<td><a href="https://react.dev/">React</a></td>
<td>18.x</td>
<td>声明式 UI 框架，组件化开发</td>
</tr>
<tr>
<td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
<td>5.x</td>
<td>类型安全，提升代码质量</td>
</tr>
<tr>
<td><a href="https://tailwindcss.com/">Tailwind CSS</a></td>
<td>4.x</td>
<td>原子化 CSS 框架，快速样式开发</td>
</tr>
<tr>
<td><a href="https://lucide.dev/">lucide-react-taro</a></td>
<td>1.3.0</td>
<td>轻量级图标库，支持多端</td>
</tr>
<tr>
<td><a href="https://zustand-demo.pmnd.rs/">Zustand</a></td>
<td>5.x</td>
<td>轻量级状态管理</td>
</tr>
</table>

### 后端技术栈

<table>
<tr>
<td width="120"><b>技术</b></td>
<td width="100"><b>版本</b></td>
<td><b>说明</b></td>
</tr>
<tr>
<td><a href="https://nestjs.com/">NestJS</a></td>
<td>10.x</td>
<td>企业级 Node.js 框架</td>
</tr>
<tr>
<td>TypeScript</td>
<td>5.x</td>
<td>类型安全</td>
</tr>
</table>

### 支持平台

| 平台 | 状态 | 说明 |
|------|------|------|
| 微信小程序 | ✅ 完整支持 | 主要目标平台 |
| H5 网页 | ✅ 完整支持 | 移动端网页 |
| 支付宝小程序 | 🔧 可扩展 | 需配置适配 |
| 抖音小程序 | 🔧 可扩展 | 需配置适配 |

---

## 📁 项目结构

```
aura-care/
├── 📂 src/                          # 前端源码
│   ├── 📂 pages/                    # 页面
│   │   ├── 📂 index/                # 首页
│   │   ├── 📂 search/               # 搜索页
│   │   ├── 📂 test/                 # 体质测试
│   │   │   ├── 📄 index.tsx         # 测试问卷
│   │   │   └── 📄 result.tsx        # 测试结果
│   │   ├── 📂 product/              # 商品
│   │   │   └── 📄 detail.tsx        # 商品详情
│   │   ├── 📂 customize/            # 手串定制
│   │   │   ├── 📄 index.tsx         # 定制首页
│   │   │   └── 📄 design.tsx        # 定制设计
│   │   ├── 📂 cart/                 # 购物车
│   │   ├── 📂 order/                # 订单
│   │   │   ├── 📄 confirm.tsx       # 订单确认
│   │   │   └── 📄 list.tsx          # 订单列表
│   │   ├── 📂 address/              # 地址管理
│   │   │   ├── 📄 list.tsx          # 地址列表
│   │   │   └── 📄 edit.tsx          # 地址编辑
│   │   ├── 📂 profile/              # 个人中心
│   │   │   ├── 📄 index.tsx         # 个人主页
│   │   │   ├── 📄 orders.tsx        # 我的订单
│   │   │   ├── 📄 records.tsx       # 养生档案
│   │   │   └── 📄 edit.tsx          # 编辑资料
│   │   ├── 📂 coupon/               # 优惠券
│   │   ├── 📂 points/               # 积分中心
│   │   ├── 📂 knowledge/            # 养生知识
│   │   ├── 📂 help/                 # 帮助中心
│   │   └── 📂 settings/             # 设置
│   │
│   ├── 📂 components/               # 组件
│   │   └── 📂 ui/                   # UI 组件库 (shadcn/ui)
│   │       ├── 📄 button.tsx        # 按钮
│   │       ├── 📄 card.tsx          # 卡片
│   │       ├── 📄 dialog.tsx        # 弹窗
│   │       ├── 📄 tabs.tsx          # 标签页
│   │       └── ...                  # 更多组件
│   │
│   ├── 📂 network/                  # 网络请求
│   │   └── 📄 index.ts              # Network 封装
│   │
│   ├── 📄 app.config.ts             # 应用配置
│   ├── 📄 app.tsx                   # 应用入口
│   └── 📄 app.css                   # 全局样式
│
├── 📂 server/                       # 后端源码
│   └── 📂 src/
│       ├── 📂 modules/              # 业务模块
│       │   ├── 📂 constitution/     # 体质测试
│       │   ├── 📂 product/          # 商品管理
│       │   ├── 📂 order/            # 订单管理
│       │   └── 📂 storage/          # 文件存储
│       └── 📄 main.ts               # 服务入口
│
├── 📂 dist-weapp/                   # 微信小程序构建产物
├── 📂 dist-web/                     # H5 构建产物
│
├── 📄 package.json                  # 项目配置
├── 📄 README.md                     # 项目文档
├── 📄 CHANGELOG.md                  # 更新日志
└── 📄 design_guidelines.md          # 设计指南
```

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | >= 18.x | 运行环境 |
| pnpm | >= 9.0.0 | 包管理器 |
| 微信开发者工具 | 最新版 | 小程序开发调试 |

### 克隆项目

```bash
git clone https://github.com/DaZhang/aura-care.git
cd aura-care
```

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动完整开发环境（H5 + 后端，支持热更新）
coze dev

# 或分别启动各端
pnpm dev:web      # H5 开发服务器 (端口 5000)
pnpm dev:server   # 后端 API 服务 (端口 3000)
pnpm dev:weapp    # 微信小程序开发（需配合开发者工具）
```

### 构建生产版本

```bash
# 构建所有平台
pnpm build

# 单独构建
pnpm build:web      # 构建 H5
pnpm build:weapp    # 构建微信小程序
pnpm build:server   # 构建后端服务
```

### 小程序预览

1. 使用微信开发者工具打开 `dist-weapp` 目录
2. 配置 AppID（需在微信公众平台注册）
3. 点击「预览」或「真机调试」

---

## 🎨 设计规范

### 品牌色彩

<div align="center">

| 颜色名称 | 色值 | 预览 | 用途 |
|---------|------|------|------|
| 清新米色 | `#EBE3D5` | ![#EBE3D5](https://via.placeholder.com/60x24/EBE3D5/EBE3D5) | 按钮背景 |
| 元古浅卡其 | `#C9B78F` | ![#C9B78F](https://via.placeholder.com/60x24/C9B78F/C9B78F) | 主色调 |
| 墨色 | `#5D3A1A` | ![#5D3A1A](https://via.placeholder.com/60x24/5D3A1A/FFFFFF) | 文字、边框 |
| 赭石 | `#8B2500` | ![#8B2500](https://via.placeholder.com/60x24/8B2500/FFFFFF) | 强调色 |
| 米黄背景 | `#F7F4ED` | ![#F7F4ED](https://via.placeholder.com/60x24/F7F4ED/F7F4ED) | 页面背景 |

</div>

### 九大体质配色

<div align="center">

| 体质 | 主色 | 背景 | 特征 |
|------|------|------|------|
| 平和质 | `#5D4E37` | `#F5EFE0` | 阴阳调和，精力充沛 |
| 气虚质 | `#CC7722` | `#FAF0DC` | 气短乏力，易疲劳 |
| 阳虚质 | `#A63D2B` | `#F5E6E0` | 畏寒怕冷，手足不温 |
| 阴虚质 | `#4A6572` | `#E8EEF2` | 口燥咽干，手足心热 |
| 痰湿质 | `#5C6B4E` | `#EEF2E8` | 体形肥胖，胸闷痰多 |
| 湿热质 | `#B85C38` | `#F8EDE4` | 面垢油光，易生痤疮 |
| 血瘀质 | `#7D4E5D` | `#F2E8EC` | 肤色晦暗，易有瘀斑 |
| 气郁质 | `#4A5568` | `#EAEFF5` | 情绪低落，易郁易怒 |
| 特禀质 | `#6B7B5E` | `#F0F4EC` | 过敏体质，易患鼻炎 |

</div>

### 设计原则

- **极度留白** - 营造东方禅意空间感
- **纤细笔画** - 300 字重体现优雅轻盈
- **纯白背景** - 纯净的视觉体验
- **浅卡其主色** - 温暖的中性色调

---

## 🔧 开发指南

### Git 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具变更
```

**提交示例：**

```bash
feat: 新增体质测试问卷功能
fix: 修复购物车数量计算错误
docs: 更新部署文档
style: 调整按钮颜色为浅色系
```

### 代码规范

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 强类型约束
- **Tailwind CSS** - 原子化样式优先

### 目录规范

```
pages/
├── feature/           # 功能模块
│   ├── index.tsx      # 页面组件
│   ├── index.config.ts # 页面配置
│   └── components/    # 页面专属组件
```

---

## 📋 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新详情。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目采用 [MIT](./LICENSE) 许可证。

---

## 📞 联系方式

- 项目主页: [https://github.com/DaZhang/aura-care](https://github.com/DaZhang/aura-care)
- 问题反馈: [Issues](https://github.com/DaZhang/aura-care/issues)

---

<div align="center">

**🌿 东方养生 · 华烨尚医 🌿**

传承中医智慧 · 守护健康生活

*v2.0.0 | Made with ❤️*

</div>
