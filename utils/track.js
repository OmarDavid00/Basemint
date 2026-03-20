const DASHBOARD_API = 'https://base-dashboard-zeta.vercel.app/api/track'

export async function trackTransaction(appId, appName, userAddress, txHash) {
  try {
    const res = await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        tx_hash: txHash,
        timestamp: new Date().toISOString(),
      }),
    })

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
}
