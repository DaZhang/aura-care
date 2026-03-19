# 部署文档

## 目录

- [环境要求](#环境要求)
- [本地开发](#本地开发)
- [生产构建](#生产构建)
- [微信小程序部署](#微信小程序部署)
- [H5 部署](#h5-部署)
- [后端部署](#后端部署)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)

---

## 环境要求

### 开发环境

| 软件 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | >= 18.x | 运行环境 |
| pnpm | >= 8.x | 包管理器 |
| Git | >= 2.x | 版本控制 |

### 微信小程序

| 软件 | 说明 |
|------|------|
| 微信开发者工具 | 用于小程序预览和上传 |

---

## 本地开发

### 1. 克隆项目

```bash
git clone https://github.com/DaZhang/huaye-shangyi.git
cd huaye-shangyi
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
# 方式一：使用 coze CLI（推荐）
coze dev

# 方式二：分别启动
pnpm dev:web      # H5 前端 (端口 5000)
pnpm dev:server   # 后端服务 (端口 3000)
pnpm dev:weapp    # 小程序开发模式
```

### 4. 访问服务

| 服务 | 地址 |
|------|------|
| H5 前端 | http://localhost:5000 |
| 后端 API | http://localhost:3000 |
| API 文档 | http://localhost:3000/api |

---

## 生产构建

### 构建命令

```bash
# 构建所有平台
pnpm build

# 单独构建
pnpm build:web    # H5 构建
pnpm build:weapp  # 小程序构建
pnpm build:server # 后端构建
```

### 构建产物

| 平台 | 输出目录 |
|------|----------|
| H5 | dist-web/ |
| 小程序 | dist-weapp/ |
| 后端 | server/dist/ |

---

## 微信小程序部署

### 1. 配置 AppID

修改 `project.config.json`：

```json
{
  "appid": "你的微信小程序AppID",
  "miniprogramRoot": "./dist-weapp/"
}
```

### 2. 构建小程序

```bash
pnpm build:weapp
```

### 3. 微信开发者工具

1. 打开微信开发者工具
2. 导入项目，选择项目根目录
3. 确认 `miniprogramRoot` 指向 `./dist-weapp/`
4. 点击"预览"或"真机调试"测试

### 4. 上传发布

1. 点击"上传"按钮
2. 填写版本号和项目备注
3. 登录微信公众平台提交审核
4. 审核通过后点击发布

### 注意事项

- 确保小程序 AppID 已正确配置
- 检查 `dist-weapp/` 目录内容完整
- 测试所有功能正常后提交审核

---

## H5 部署

### 1. 构建产物

```bash
pnpm build:web
```

产物目录：`dist-web/`

### 2. 部署方式

#### 方式一：静态文件托管

将 `dist-web/` 目录上传至：
- 腾讯云 COS
- 阿里云 OSS
- 七牛云存储
- Vercel / Netlify

#### 方式二：Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/huaye-shangyi/dist-web;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 方式三：Docker 部署

```dockerfile
# Dockerfile
FROM nginx:alpine

COPY dist-web/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

```bash
docker build -t huaye-shangyi-web .
docker run -d -p 80:80 huaye-shangyi-web
```

---

## 后端部署

### 1. 构建产物

```bash
pnpm build:server
```

产物目录：`server/dist/`

### 2. 部署方式

#### 方式一：PM2 部署（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
cd server
pm2 start dist/main.js --name huaye-api

# 查看状态
pm2 status

# 查看日志
pm2 logs huaye-api
```

#### 方式二：Docker 部署

```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

```bash
# 构建
cd server
docker build -t huaye-shangyi-api .

# 运行
docker run -d -p 3000:3000 huaye-shangyi-api
```

#### 方式三：Serverless 部署

支持部署到：
- 腾讯云云函数 SCF
- 阿里云函数计算 FC
- AWS Lambda

---

## 环境变量配置

### 前端环境变量

创建 `.env.local` 文件：

```env
# 项目域名（用于 API 请求）
PROJECT_DOMAIN=https://your-domain.com

# API 地址
API_BASE_URL=https://your-domain.com/api
```

### 后端环境变量

创建 `server/.env` 文件：

```env
# 服务端口
PORT=3000

# 数据库配置（如需使用）
DB_HOST=localhost
DB_PORT=5432
DB_NAME=huaye_shangyi
DB_USER=postgres
DB_PASSWORD=your_password

# 微信小程序配置
WEAPP_APPID=your_appid
WEAPP_SECRET=your_secret

# 存储配置
STORAGE_TYPE=cos  # cos / oss / qiniu
STORAGE_BUCKET=your_bucket
STORAGE_REGION=ap-guangzhou
STORAGE_SECRET_ID=your_secret_id
STORAGE_SECRET_KEY=your_secret_key
```

---

## 常见问题

### Q1: 小程序预览白屏

**原因**：构建产物未正确生成或路径配置错误

**解决方案**：
```bash
# 重新构建
pnpm build:weapp

# 检查 project.config.json
# 确保 miniprogramRoot: "./dist-weapp/"
```

### Q2: API 请求跨域

**原因**：后端未配置 CORS

**解决方案**：
后端已配置 CORS，如仍有问题，检查：
```typescript
// server/src/main.ts
app.enableCors({
  origin: '*',
  credentials: true,
});
```

### Q3: 图片资源加载失败

**原因**：图片链接不可访问

**解决方案**：
- 确保图片 URL 可公开访问
- 小程序需配置 downloadFile 合法域名

### Q4: 热更新不生效

**原因**：开发服务未正确启动

**解决方案**：
```bash
# 重启开发服务
coze dev
```

### Q5: 样式在 H5 和小程序不一致

**原因**：跨端样式兼容问题

**解决方案**：
- 使用 Tailwind CSS 原子类
- 避免使用 `px` 硬编码，使用 Tailwind 单位
- 参考 `docs/CROSS_PLATFORM.md`（如有）

---

## 性能优化

### 小程序优化

1. **分包加载**
```typescript
// app.config.ts
export default defineAppConfig({
  subPackages: [
    {
      root: 'pages/order',
      pages: ['confirm'],
    },
  ],
});
```

2. **图片优化**
- 使用 WebP 格式
- 图片懒加载
- 压缩图片大小

3. **代码优化**
- 减少首屏数据
- 使用骨架屏
- 避免频繁 setData

### H5 优化

1. **资源优化**
- 开启 Gzip 压缩
- 使用 CDN 加速
- 图片懒加载

2. **代码优化**
- 路由懒加载
- 组件按需加载
- 合理使用缓存

---

## 监控与日志

### 日志查看

```bash
# 开发日志
tail -f /tmp/coze-logs/dev.log

# 后端日志
tail -f server/logs/app.log
```

### 错误监控

推荐接入：
- Sentry - 错误追踪
- 腾讯云监控 - 性能监控
- 阿里云 ARMS - 应用监控

---

## 安全建议

1. **API 安全**
   - 启用 HTTPS
   - 添加请求签名
   - 限制请求频率

2. **数据安全**
   - 敏感数据加密
   - 用户信息脱敏
   - 定期备份数据

3. **代码安全**
   - 不提交敏感信息
   - 使用环境变量
   - 定期更新依赖

---

## 技术支持

如有问题，请提交 Issue 或联系开发团队。
