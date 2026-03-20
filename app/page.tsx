'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState, useEffect } from 'react'
import { trackTransaction } from '../utils/track'

const CONTRACT_ADDRESS = '0x0cc6283d724f448244824b2a1b5912813ab54388'
const DEFAULT_TOKEN_URI = 'ipfs://QmYourDefaultMetadataHash' // 默认的 NFT metadata URI

export default function Home() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const [trackedHashes, setTrackedHashes] = useState<string[]>([])
  const [tokenUri, setTokenUri] = useState<string>(DEFAULT_TOKEN_URI)

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleMint = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              {
                name: '_uri',
                type: 'string',
              },
            ],
            outputs: [],
          },
        ],
        functionName: 'mint',
        args: [tokenUri],
      })
    } catch (err) {
      console.error('Mint error:', err)
    }
  }

  // 当交易成功确认后追踪，支持多笔交易
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

  return (
    <main className="container">
      <div className="card">
        <h1>🎨 Base Free Mint NFT</h1>
        <p className="subtitle">Mint your NFT on Base Network - FREE!</p>

        <div className="connect-section">
          <ConnectButton />
        </div>

        {isConnected && (
          <div className="mint-section">
            <div className="info">
              <p>
                <strong>Connected:</strong> {address?.slice(0, 6)}...
                {address?.slice(-4)}
              </p>
              <p>
                <strong>Price:</strong> FREE (只需 Gas 费)
              </p>
              <p>
                <strong>Contract:</strong> {CONTRACT_ADDRESS.slice(0, 6)}...
                {CONTRACT_ADDRESS.slice(-4)}
              </p>
            </div>

            <div className="uri-input">
              <label htmlFor="tokenUri">
                <strong>Token URI (可选):</strong>
              </label>
              <input
                id="tokenUri"
                type="text"
                value={tokenUri}
                onChange={(e) => setTokenUri(e.target.value)}
                placeholder="ipfs://..."
                className="uri-field"
              />
              <p className="hint">输入你的 NFT metadata URI，或使用默认值</p>
            </div>

            <button
              onClick={handleMint}
              disabled={isPending || isConfirming}
              className="mint-button"
            >
              {isPending
                ? 'Confirming...'
                : isConfirming
                ? 'Minting...'
                : 'Mint NFT - FREE'}
            </button>

            {error && (
              <div className="error">
                <p>Error: {error.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="success">
                <p>✅ Mint Successful!</p>
                {hash && (
                  <p className="tx-hash">
                    <strong>TX Hash:</strong>{' '}
                    <a
                      href={`https://basescan.org/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hash.slice(0, 10)}...{hash.slice(-8)}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {!isConnected && (
          <div className="not-connected">
            <p>👆 Please connect your wallet to mint</p>
          </div>
        )}
      </div>

      <footer>
        <p>App ID: 69ba5ee0e3869312452b6bdf | Build Code: bc_qyd3sdtd</p>
      </footer>
    </main>
  )
}
