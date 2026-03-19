# 快速开始指南

## 📦 安装步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置 WalletConnect Project ID**
   
   打开 `app/wagmi.ts`，将 `YOUR_PROJECT_ID` 替换为您的实际 Project ID
   
   获取地址：https://cloud.walletconnect.com/

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   访问：http://localhost:3000

## 🔧 PowerShell 命令注意事项

在 Windows PowerShell 中，请使用分号 `;` 而不是 `&&` 来连接命令：

✅ 正确：
```powershell
cd base-nft-miniapp; npm run dev
```

❌ 错误：
```bash
cd base-nft-miniapp && npm run dev
```

## 📝 项目配置信息

- **App ID**: app-001
- **App Name**: Base Free Mint NFT
- **Build Code**: bc_qyd3sdtd
- **Encoded String**: 0x62635f71796433736474640b0080218021802180218021802180218021
- **Contract Address**: 0x0cc6283d724f448244824b2a1b5912813ab54388
- **Mint Price**: 0.00001 ETH
- **Network**: Base

## 🎯 核心功能

1. ✅ 钱包连接（RainbowKit）
2. ✅ NFT 铸造（0.00001 ETH）
3. ✅ 交易状态显示
4. ✅ 交易归因追踪（自动上报到 Dashboard）
5. ✅ Base Builder Code 集成

## 🚀 部署

```bash
npm run build
npm start
```

## 📱 测试

1. 连接钱包（需要 Base 网络）
2. 点击 "Mint NFT" 按钮
3. 确认交易（支付 0.00001 ETH + Gas）
4. 等待交易确认
5. 查看交易哈希链接

## 🔗 相关链接

- Base Scan: https://basescan.org/
- WalletConnect: https://cloud.walletconnect.com/
- Dashboard API: https://base-dashboard-zeta.vercel.app/api/track
