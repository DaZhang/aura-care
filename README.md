# 东方养生·华烨尚医

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Taro](https://img.shields.io/badge/Taro-4.1.9-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

**基于中医九种体质辨证的个性化养生手串电商小程序**

一人一方 · 一串一养生

</div>

---

## 📖 项目简介

东方养生·华烨尚医是一款基于中医九种体质理论的个性化养生手串定制电商小程序。通过科学的体质测试，为用户推荐专属的养生手串，实现"一人一方，一串一养生"的健康理念。

### 核心特色

- 🎯 **精准体质辨识** - 基于中医九大体质理论，通过专业测试精准识别用户体质
- 📿 **个性化定制** - 支持香料配方、材质、刻字等多维度定制
- 🏺 **新中式设计** - 传统中式配色与现代UI设计完美融合
- 🛒 **完整电商流程** - 浏览、搜索、定制、下单、支付一体化体验

---

## 🏗️ 技术架构

### 前端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Taro | 4.1.9 | 多端开发框架 |
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| lucide-react-taro | - | 图标库 |

### 后端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| NestJS | 10.x | Node.js 框架 |
| TypeScript | 5.x | 类型安全 |

### 支持平台

- 微信小程序
- H5 网页
- 支付宝小程序（可扩展）

---

## 📁 项目结构

```
├── src/                          # 前端源码
│   ├── pages/                    # 页面
│   │   ├── index/                # 首页
│   │   ├── search/               # 搜索页
│   │   ├── test/                 # 体质测试
│   │   │   ├── index.tsx         # 测试页
│   │   │   └── result.tsx        # 测试结果页
│   │   ├── product/              # 商品
│   │   │   └── detail.tsx        # 商品详情页
│   │   ├── customize/            # 定制页
│   │   ├── order/                # 订单
│   │   │   └── confirm.tsx       # 订单确认页
│   │   └── profile/              # 个人中心
│   │       ├── index.tsx         # 个人中心主页
│   │       ├── orders.tsx        # 我的订单
│   │       └── records.tsx       # 养生档案
│   ├── components/               # 组件
│   │   └── ui/                   # UI 组件库
│   ├── network/                  # 网络请求封装
│   ├── app.config.ts             # 应用配置
│   └── app.tsx                   # 应用入口
│
├── server/                       # 后端源码
│   └── src/
│       ├── modules/              # 业务模块
│       │   ├── constitution/     # 体质模块
│       │   ├── product/          # 商品模块
│       │   ├── order/            # 订单模块
│       │   └── storage/          # 存储模块
│       └── main.ts               # 服务入口
│
├── docs/                         # 文档
│   ├── FEATURES.md               # 功能文档
│   └── DEPLOYMENT.md             # 部署文档
│
└── dist-weapp/                   # 小程序构建产物
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x
- 微信开发者工具（小程序开发）

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动开发服务器（H5 + 后端）
coze dev

# 或分别启动
pnpm dev:web      # H5 开发
pnpm dev:server   # 后端开发
pnpm dev:weapp    # 小程序开发
```

### 构建生产版本

```bash
# 构建所有平台
pnpm build

# 单独构建
pnpm build:web    # H5
pnpm build:weapp  # 小程序
pnpm build:server # 后端
```

---

## 📚 文档目录

- [功能文档](./docs/FEATURES.md) - 详细功能说明
- [部署文档](./docs/DEPLOYMENT.md) - 部署指南

---

## 🎨 设计规范

### 配色方案

| 名称 | 色值 | 用途 |
|------|------|------|
| 墨色 | #5D3A1A | 主色调 |
| 赭石 | #8B2500 | 强调色 |
| 米黄 | #F7F4ED | 背景色 |
| 宣纸白 | #FDF9F3 | 卡片背景 |

### 九大体质配色

| 体质 | 颜色 | 背景 |
|------|------|------|
| 平和质 | #5D4E37 | #F5EFE0 |
| 气虚质 | #CC7722 | #FAF0DC |
| 阳虚质 | #A63D2B | #F5E6E0 |
| 阴虚质 | #4A6572 | #E8EEF2 |
| 痰湿质 | #5C6B4E | #EEF2E8 |
| 湿热质 | #B85C38 | #F8EDE4 |
| 血瘀质 | #7D4E5D | #F2E8EC |
| 气郁质 | #4A5568 | #EAEFF5 |
| 特禀质 | #6B7B5E | #F0F4EC |

---

## 🔧 开发规范

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

### 代码规范

- 使用 ESLint + Prettier 进行代码格式化
- 使用 TypeScript 强类型
- 遵循 React Hooks 规范
- Tailwind CSS 原子化样式

---

## 📄 License

MIT License © 2024 华烨尚医

---

<div align="center">

**东方养生 · 华烨尚医**

传承中医智慧 · 守护健康生活

</div>
