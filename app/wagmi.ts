import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'
import { Hex } from 'viem'

// Base Builder Code 集成
const DATA_SUFFIX: Hex = '0x62635f71796433736474640b0080218021802180218021802180218021'

export const config = getDefaultConfig({
  appName: 'Base Free Mint NFT',
  projectId: 'c5a7f123456789abcdef0123456789ab', // 临时 demo ID，请替换为真实的 Project ID
  chains: [base],
  ssr: true,
  dataSuffix: DATA_SUFFIX,
})
