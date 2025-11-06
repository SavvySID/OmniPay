export default function FeatureConverter() {
  return (
    <div className="hero">
      <h1 className="hero-title">OmniConvert</h1>
      <h2 style={{ fontSize: 24, fontWeight: 600, margin: "0 0 16px", color: "var(--secondary)" }}>The Cross-Chain Token-to-USDT Bridge (Coming Soon)</h2>
      <p className="hero-subtitle">
        Enables users to pay with any token and seamlessly convert it into USDT on their chosen chain.
      </p>

      <div className="section card">
        <div className="card-inner">
          <h3 style={{ marginTop: 0 }}>What it does</h3>
          <ul>
            <li>Accepts tokens like ROSE, APT, or MATIC on their native chains</li>
            <li>Bridges value cross‑chain using interoperable messaging</li>
            <li>Swaps to USDT on the destination chain and sends to the recipient</li>
          </ul>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h3 style={{ marginTop: 0 }}>How it works (high level)</h3>
          <ol>
            <li>User selects input token and destination chain</li>
            <li>We quote the best path using bridge + DEX pricing</li>
            <li>Funds are bridged, swapped to USDT on arrival, and delivered</li>
          </ol>
          <div style={{ color: "var(--muted)" }}>
            Planned integrations include Axelar or LayerZero for messaging and Uniswap or Curve for
            destination swaps. Exact providers may vary per route based on fees and liquidity.
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h3 style={{ marginTop: 0 }}>Status</h3>
          <p>
            Under active design. This is the second pillar of OmniPay and will follow after the
            Cross-Chain Transfer feature. Feedback on priority tokens and chains is welcome.
          </p>
        </div>
      </div>
    </div>
  );
}

