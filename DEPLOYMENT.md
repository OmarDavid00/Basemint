# 部署指南

## ✅ 已完成

### 1. GitHub 仓库
- ✅ 仓库已创建：https://github.com/AtwoodDavid/Basemint
- ✅ 代码已推送到 main 分支
- ✅ 所有文件已上传

### 2. Vercel 项目
- ✅ Vercel 项目已创建：base-nft-miniapp
- ✅ 已连接到 GitHub 仓库
- ⚠️ 构建失败（需要配置环境变量）

## ⚠️ 部署失败原因

构建失败是因为缺少 **WalletConnect Project ID**。

## 🔧 解决方案

### 方法 1：在 Vercel Dashboard 中配置（推荐）

1. 访问 Vercel Dashboard：https://vercel.com/atwood-davids-projects/base-nft-miniapp

2. 进入项目设置：
   - 点击 "Settings"
   - 选择 "Environment Variables"

3. 添加环境变量：
   ```
   Name: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
   Value: [您的 WalletConnect Project ID]
   ```

4. 获取 WalletConnect Project ID：
   - 访问：https://cloud.walletconnect.com/
   - 注册/登录
   - 创建新项目
   - 复制 Project ID

5. 重新部署：
   - 在 Vercel Dashboard 中点击 "Redeploy"
   - 或者推送新的 commit 到 GitHub

### 方法 2：修改代码并推送

1. 打开 `app/wagmi.ts`

2. 将 `YOUR_PROJECT_ID` 替换为实际的 Project ID：
   ```typescript
   export const config = getDefaultConfig({
     appName: 'Base Free Mint NFT',
     projectId: 'your_actual_project_id_here', // 替换这里
     chains: [base],
     ssr: true,
     dataSuffix: DATA_SUFFIX,
   })
   ```

3. 提交并推送：
   ```bash
   git add app/wagmi.ts
   git commit -m "Add WalletConnect Project ID"
   git push origin main
   ```

4. Vercel 会自动重新部署

## 📋 部署信息

- **GitHub 仓库**：https://github.com/AtwoodDavid/Basemint
- **Vercel 项目**：https://vercel.com/atwood-davids-projects/base-nft-miniapp
- **预期生产 URL**：https://base-nft-miniapp-atwood-davids-projects.vercel.app

## 🚀 手动部署命令

如果需要手动部署，可以使用：

```bash
# 使用 Vercel CLI
vercel --token YOUR_VERCEL_TOKEN

# 或者部署到生产环境
vercel --prod --token YOUR_VERCEL_TOKEN
```

## 📝 下一步

1. ✅ 获取 WalletConnect Project ID
2. ✅ 配置环境变量或修改代码
3. ✅ 重新部署
4. ✅ 测试应用功能
5. ✅ 连接钱包并测试 NFT 铸造

## 🔗 相关链接

- **WalletConnect Cloud**：https://cloud.walletconnect.com/
- **Vercel 文档**：https://vercel.com/docs
- **Next.js 部署**：https://nextjs.org/docs/deployment
