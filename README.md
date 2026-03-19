# Base Free Mint NFT - Mini App

一个基于 Next.js 的 Base 链 NFT 铸造应用。

## 项目信息

- **App ID**: app-001
- **App Name**: Base Free Mint NFT
- **Build Code**: bc_qyd3sdtd
- **Contract Address**: 0x0cc6283d724f448244824b2a1b5912813ab54388
- **Mint Price**: 0.00001 ETH

## 技术栈

- Next.js 15 (App Router)
- wagmi + RainbowKit
- TypeScript
- Viem
- Base Network

## 功能特性

✅ 钱包连接（RainbowKit）
✅ NFT 铸造功能
✅ 交易状态追踪
✅ 交易归因埋点
✅ Base Builder Code 集成

## 安装依赖

\`\`\`bash
npm install
\`\`\`

## 运行开发服务器

\`\`\`bash
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

\`\`\`bash
npm run build
npm start
\`\`\`

## 配置

在 `app/wagmi.ts` 中修改 `projectId`，从 [WalletConnect Cloud](https://cloud.walletconnect.com/) 获取。

## 项目结构

\`\`\`
base-nft-miniapp/
├── app/
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 主页面
│   ├── providers.tsx    # Web3 Providers
│   ├── wagmi.ts         # Wagmi 配置
│   └── globals.css      # 全局样式
├── utils/
│   └── track.js         # 交易追踪
├── package.json
├── next.config.js
└── tsconfig.json
\`\`\`

## 交易归因

每次成功铸造 NFT 后，会自动调用交易追踪 API，记录：
- App ID
- App Name
- 用户地址
- 交易哈希
- 时间戳

## License

MIT
