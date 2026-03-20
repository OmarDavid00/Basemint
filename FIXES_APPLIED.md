# 修复总结 - Basemint 项目

## 修复日期
2026-03-20

## 修复的问题

### 1. ✅ 手机 App / 移动端点击 Connect Wallet 没反应
**原因**: 使用旧的 `createConfig` 方法，缺少 SSR 支持和完整的 RainbowKit 配置

**修复**:
- 将 `app/wagmi.ts` 从 `createConfig` 改为 `getDefaultConfig`
- 启用 `ssr: true` 支持服务端渲染
- 添加 `appName` 和 `projectId` 配置
- 支持 base 和 mainnet 两条链
- 保留 Builder Code attribution (`bc_qyd3sdtd`)

### 2. ✅ 多次交易只记录一笔的问题
**原因**: 使用单个 `txHash` 状态变量阻止后续交易记录

**修复**:
- 将 `app/page.tsx` 中的 `txHash` 改为 `trackedHashes: string[]` 数组
- 每个成功的交易 hash 都会被记录
- 只在交易成功确认后 (`isSuccess`) 才调用 tracking
- 使用 `includes()` 检查避免重复记录同一笔交易

### 3. ✅ offchain 没有数据记录的问题
**原因**: tracking 函数静默吞错，没有错误日志

**修复**:
- 修改 `utils/track.js` 添加完整的错误处理
- 检查 `response.ok` 状态
- 失败时输出详细的 `console.error` 日志
- 抛出错误而不是静默失败
- 保留所有必需的 body 字段

### 4. ✅ 统一 app_id
**原因**: 项目中混用 `app-001` 和正确的 app_id

**修复**:
- 全项目统一使用: `69ba5ee0e3869312452b6bdf`
- 更新了以下文件:
  - `app/page.tsx` (tracking 调用和 footer 显示)
  - `README.md`
  - `SETUP.md`
  - `PROJECT_SUMMARY.md`
  - `FINAL_STATUS.md`
- `app/layout.tsx` 已经是正确的值，无需修改

## 修改的文件清单

### 核心代码文件
1. **app/wagmi.ts** - 完全重写
   - 使用 `getDefaultConfig` 替代 `createConfig`
   - 添加环境变量 `NEXT_PUBLIC_REOWN_PROJECT_ID`
   - 启用 SSR
   - 支持 base + mainnet
   - 保留 Builder Code attribution

2. **app/page.tsx** - 重要修改
   - 删除 `txHash` 单一状态
   - 添加 `trackedHashes: string[]` 数组
   - 修改 useEffect 逻辑支持多笔交易追踪
   - 更新 app_id 为 `69ba5ee0e3869312452b6bdf`
   - 只在 `isSuccess` 时才追踪

3. **utils/track.js** - 完全重写
   - 添加 `response.ok` 检查
   - 添加详细的错误日志
   - 抛出错误而不是静默失败
   - 保留所有必需字段

### 文档文件
4. **README.md** - 更新 app_id
5. **SETUP.md** - 更新 app_id
6. **PROJECT_SUMMARY.md** - 更新 app_id
7. **FINAL_STATUS.md** - 更新 app_id

### 新增文件
8. **.env.example** - 新建
   - 添加 `NEXT_PUBLIC_REOWN_PROJECT_ID` 环境变量说明

## 保留的内容

✅ **Builder Code**: `bc_qyd3sdtd` - 已保留在 wagmi.ts 的 dataSuffix 中
✅ **合约地址**: `0x0cc6283d724f448244824b2a1b5912813ab54388` - 未修改
✅ **Mint 主逻辑**: 完全保留，未修改 ABI 和 mint 函数调用
✅ **UI 主体样式**: 未修改，保留原有设计

## 环境变量配置

需要配置以下环境变量（在 Vercel 或本地 .env 文件中）:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id_here
```

获取地址: https://cloud.reown.com/ 或 https://cloud.walletconnect.com/

## 部署建议

1. **清理构建缓存**:
   ```bash
   rm -rf .next
   npm run build
   ```

2. **配置环境变量**: 在 Vercel Dashboard 中添加 `NEXT_PUBLIC_REOWN_PROJECT_ID`

3. **重新部署**: 推送代码到 GitHub 触发自动部署

## 测试建议

### 必须测试的功能:
1. ✅ **手机端钱包连接**
   - 使用手机浏览器访问
   - 点击 Connect Wallet
   - 确认能正常唤起钱包应用

2. ✅ **多次 Mint 测试**
   - 连续 mint 2-3 次 NFT
   - 检查 Dashboard API 是否记录了所有交易
   - 查看浏览器控制台确认没有错误

3. ✅ **Onchain/Offchain Tracking**
   - 检查交易是否成功上链 (BaseScan)
   - 检查 Dashboard 是否有记录
   - 查看控制台日志确认 tracking 调用成功

### 检查点:
- [ ] 手机端能正常连接钱包
- [ ] 多次交易都能被记录
- [ ] Dashboard API 返回成功状态
- [ ] 控制台没有 tracking 错误
- [ ] Builder Code 仍然生效

## 技术细节

### wagmi.ts 变更对比
```typescript
// 旧代码
import { createConfig, http } from 'wagmi'
export const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  dataSuffix: DATA_SUFFIX,
})

// 新代码
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
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
```

### page.tsx 变更对比
```typescript
// 旧代码
const [txHash, setTxHash] = useState<string>('')
useEffect(() => {
  if (hash && address && !txHash) {
    setTxHash(hash)
    trackTransaction('app-001', 'Base Free Mint NFT', address, hash)
  }
}, [hash, address, txHash])

// 新代码
const [trackedHashes, setTrackedHashes] = useState<string[]>([])
useEffect(() => {
  if (!isSuccess || !hash || !address) return
  if (trackedHashes.includes(hash)) return
  
  trackTransaction(
    '69ba5ee0e3869312452b6bdf',
    'Base Free Mint NFT',
    address,
    hash
  ).catch(console.error)
  
  setTrackedHashes((prev) => [...prev, hash])
}, [isSuccess, hash, address, trackedHashes])
```

### track.js 变更对比
```javascript
// 旧代码
try {
  await fetch(DASHBOARD_API, { ... })
} catch {
  // 静默失败
}

// 新代码
try {
  const res = await fetch(DASHBOARD_API, { ... })
  
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error('track failed:', res.status, text)
    throw new Error(`track api failed: ${res.status}`)
  }
  
  return await res.json().catch(() => null)
} catch (err) {
  console.error('trackTransaction error:', err)
  throw err
}
```

## 总结

所有问题已修复，代码已更新。项目现在应该能够:
- ✅ 在手机端正常连接钱包
- ✅ 记录所有成功的交易
- ✅ 提供详细的错误日志用于调试
- ✅ 保留所有 Builder Code attribution
- ✅ 使用统一的 app_id

**下一步**: 配置环境变量并重新部署测试。
