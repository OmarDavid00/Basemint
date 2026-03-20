import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { Attribution } from 'ox/erc8021'

const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ['bc_qyd3sdtd'],
})

export const config = getDefaultConfig({
  appName: 'Base Free Mint NFT',
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains: [base, mainnet],
  ssr: true,
  transports: {
    [base.id]: http('https://mainnet.base.org'),
    [mainnet.id]: http(),
  },
  dataSuffix: DATA_SUFFIX,
})
