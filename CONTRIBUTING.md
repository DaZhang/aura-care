# 贡献指南

感谢您对「东方养生·华烨尚医」项目的兴趣！我们欢迎各种形式的贡献，包括但不限于 bug 修复、功能开发、文档改进等。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境](#开发环境)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [Git 提交规范](#git-提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题反馈](#问题反馈)

---

## 行为准则

参与本项目即表示您同意遵守我们的行为准则。我们致力于打造一个友好、包容的社区。

- ✅ 使用友好和包容的语言
- ✅ 尊重不同的观点和经验
- ✅ 建设性地接受建设性的批评
- ✅ 关注社区整体利益
- ❌ 人身攻击或侮辱性评论
- ❌ 公开或私下骚扰
- ❌ 未经明确许可发布他人私人信息

---

## 如何贡献

### 🐛 报告 Bug

在报告 bug 之前，请：

1. 搜索现有 [Issues](https://github.com/DaZhang/aura-care/issues) 确保问题未被报告
2. 更新到最新版本确认问题仍然存在
3. 收集相关信息（操作系统、Node.js 版本、复现步骤等）

Bug 报告应包含：
- 清晰简洁的标题
- 问题详细描述
- 复现步骤（1. 2. 3. ...）
- 预期行为 vs 实际行为
- 环境信息（操作系统、Node.js 版本等）
- 相关截图或日志

### 💡 提出新功能

我们很高兴听到您的新功能想法！请通过 [Discussions](https://github.com/DaZhang/aura-care/discussions) 提出：

1. 清晰描述功能目标和用途
2. 解释为什么这个功能对项目有价值
3. 提供可能的实现方案或参考
4. 考虑对现有功能的影响

### 🔧 提交代码

#### 适合贡献的场景

- ✅ Bug 修复
- ✅ 新功能开发（请先提出 Discussion 讨论）
- ✅ 文档改进
- ✅ 代码重构（保持功能不变）
- ✅ 性能优化
- ✅ 测试覆盖率提升

## 🖥️ 开发环境

### 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | >= 18.x |
| pnpm | >= 9.0.0 |
| Git | 最新版 |

### 快速开始

```bash
# 1. Fork 项目到您的 GitHub 账户

# 2. 克隆您 Fork 的仓库
git clone https://github.com/YOUR_USERNAME/aura-care.git
cd aura-care

# 3. 添加上游仓库
git remote add upstream https://github.com/DaZhang/aura-care.git

# 4. 安装依赖
pnpm install

# 5. 启动开发环境
pnpm dev
```

### 开发工具

推荐使用以下工具以保持代码风格一致：

- **VS Code** - 主要开发编辑器
- **ESLint** - 代码检查
- **Prettier** - 代码格式化（已在项目中配置）

## 🔄 开发流程

### 1. 创建分支

从 `main` 分支创建功能分支：

```bash
# 确保本地 main 是最新的
git checkout main
git pull upstream main

# 创建新分支（使用合适的分支前缀）
git checkout -b feature/member-points-system
# 或
git checkout -b fix/cart-calculation-bug
```

### 2. 分支命名规范

| 前缀 | 用途 | 示例 |
|------|------|------|
| `feature/` | 新功能开发 | `feature/member-system` |
| `fix/` | Bug 修复 | `fix/login-redirect` |
| `docs/` | 文档更新 | `docs/api-reference` |
| `style/` | 代码格式调整 | `style/button-colors` |
| `refactor/` | 代码重构 | `refactor/user-module` |
| `test/` | 测试相关 | `test/order-service` |
| `chore/` | 构建/工具变更 | `chore/update-deps` |

### 3. 开发代码

```bash
# 启动开发服务器
pnpm dev

# 开发过程中实时检查
pnpm validate  # 提交前必须通过
```

### 4. 提交代码

```bash
# 查看修改状态
git status

# 添加修改的文件
git add .

# 提交（使用规范的提交信息）
git commit -m 'feat: 新增会员积分签到功能'
```

### 5. 保持分支同步

在推送代码之前，建议从上游仓库拉取最新代码：

```bash
git fetch upstream
git rebase upstream/main
```

### 6. 推送并创建 PR

```bash
# 推送分支到您的 Fork
git push origin feature/member-points-system

# 在 GitHub 上创建 Pull Request
```

## 📝 代码规范

### TypeScript

- 使用强类型定义，避免使用 `any`
- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型、交叉类型
- 导出需要被其他模块使用的类型

```typescript
// ✅ 推荐
interface User {
  id: string
  name: string
  points: number
}

// ❌ 避免
const user: any = { ... }
```

### React/Taro 组件

- 使用函数组件 + Hooks
- 组件文件使用 PascalCase：`UserProfile.tsx`
- Props 接口使用 `Props` 后缀：`interface UserCardProps {}`
- 组件放在 `components/` 目录，页面放在 `pages/` 目录

```tsx
// ✅ 推荐
interface ButtonProps {
  type?: 'primary' | 'secondary'
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ type = 'primary', onClick }) => {
  // ...
}
```

### Tailwind CSS

- 优先使用 Tailwind 类名，减少内联样式
- 颜色使用设计规范中的定义
- 避免硬编码 `px` 值，使用 Tailwind 预设
- 跨端兼容注意：禁止使用 opacity 简写（如 `bg-primary/10`）

```tsx
// ✅ 推荐
<View className="p-4 bg-primary bg-opacity-20">

// ❌ 避免
<View className="p-4 bg-primary/20">
```

### 文件命名

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| 页面 | kebab-case | `user-profile.tsx` |
| 组件 | PascalCase | `UserCard.tsx` |
| 工具函数 | camelCase | `formatDate.ts` |
| 常量 | UPPER_SNAKE_CASE | `MAX_POINTS` |
| 类型/接口 | PascalCase | `UserInfo` |

## 🏷️ Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具变更 |
| `ci` | CI/CD 配置 |

### Scope 范围（可选）

| Scope | 说明 |
|-------|------|
| `user` | 用户/会员/积分模块 |
| `product` | 商品模块 |
| `order` | 订单模块 |
| `test` | 体质测试模块 |
| `ui` | UI 组件 |
| `config` | 配置相关 |
| `deps` | 依赖更新 |

### 提交示例

```bash
# 功能开发
git commit -m 'feat(user): 新增会员签到积分功能'

# Bug 修复
git commit -m 'fix(points): 修复积分页面重复声明错误'

# 文档更新
git commit -m 'docs: 更新 README v2.1.0 新特性说明'

# 代码重构
git commit -m 'refactor(order): 重构订单确认流程'

# 样式调整
git commit -m 'style(ui): 调整会员卡片渐变背景'

# 依赖更新
git commit -m 'chore(deps): 升级 Taro 到 4.1.9'
```

### 提交规则

- ✅ 使用中文描述（项目主要语言）
- ✅ 标题不超过 72 字符
- ✅ 标题以动词开头（新增、修复、优化等）
- ✅ 不添加句号
- ❌ 不要提交无关紧要的修改

## 🔀 Pull Request 流程

### 创建 PR

1. 在 GitHub 上点击 **New Pull Request**
2. 选择您的分支与 `main` 进行比较
3. 填写 PR 标题和描述：

```markdown
## 描述
简要说明本次修改的内容和目的

## 修改类型
- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 文档更新 (docs)
- [ ] 代码重构 (refactor)

## 相关 Issue
Fixes #XXX

## 测试说明
描述您是如何测试这些修改的
```

### PR 检查清单

在提交 PR 之前，请确保：

- [ ] 代码通过 `pnpm validate` 检查
- [ ] 所有新增功能都有适当的测试
- [ ] 文档已更新（如有必要）
- [ ] `CHANGELOG.md` 已更新（如有必要）
- [ ] 分支名称符合规范
- [ ] 提交信息符合规范

### 代码审查

PR 创建后，项目维护者会进行代码审查。请：

- ✅ 积极响应审查意见
- ✅ 及时更新代码
- ✅ 保持讨论建设性

## 📧 问题反馈

如果您有任何问题或建议：

- 🐛 **Bug 报告**: [GitHub Issues](https://github.com/DaZhang/aura-care/issues)
- 💡 **功能建议**: [GitHub Discussions](https://github.com/DaZhang/aura-care/discussions)
- 📧 **其他问题**: 通过 PR 或 Issue 反馈

---

再次感谢您的贡献！🙏

*「东方养生·华烨尚医」项目团队*
