'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useState } from 'react'
import { trackTransaction } from '../utils/track'

const CONTRACT_ADDRESS = '0x0cc6283d724f448244824b2a1b5912813ab54388'
const MINT_PRICE = '0.00001' // 0.00001 ETH - 极低价格

export default function Home() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const [txHash, setTxHash] = useState<string>('')

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleMint = async () => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'payable',
            inputs: [],
            outputs: [],
          },
        ],
        functionName: 'mint',
        value: parseEther(MINT_PRICE),
      })

      // 不阻塞 UI，异步追踪
      if (result && address) {
        setTxHash(result)
        trackTransaction('app-001', 'Base Free Mint NFT', address, result)
      }
    } catch (err) {
      console.error('Mint error:', err)
    }
  }

  return (
    <main className="container">
      <div className="card">
        <h1>🎨 Base Free Mint NFT</h1>
        <p className="subtitle">Mint your NFT on Base Network</p>

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
                <strong>Price:</strong> {MINT_PRICE} ETH
              </p>
              <p>
                <strong>Contract:</strong> {CONTRACT_ADDRESS.slice(0, 6)}...
                {CONTRACT_ADDRESS.slice(-4)}
              </p>
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
                : `Mint NFT - ${MINT_PRICE} ETH`}
            </button>

            {error && (
              <div className="error">
                <p>Error: {error.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="success">
                <p>✅ Mint Successful!</p>
                {txHash && (
                  <p className="tx-hash">
                    <strong>TX Hash:</strong>{' '}
                    <a
                      href={`https://basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {txHash.slice(0, 10)}...{txHash.slice(-8)}
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
        <p>App ID: app-001 | Build Code: bc_qyd3sdtd</p>
      </footer>
    </main>
  )
}
