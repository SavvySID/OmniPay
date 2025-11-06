export default function About() {
  return (
    <div className="hero">
      <h1 className="hero-title">About OmniPay</h1>
      <p className="hero-subtitle">
        OmniPay is a cross‑chain payment router designed to make moving assets across chains feel native.
        We focus on route optimization, predictable UX, and transparent costs.
      </p>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Vision</h2>
          <p>
            OmniPay is a universal cross‑chain USDT gateway that lets users send or receive USDT across different 
            blockchains effortlessly. We optimize for the lowest gas, fastest bridge route, and best swap rates, 
            making cross‑chain payments as simple as a single click.
          </p>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Problems We Solve</h2>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <strong>USDT fragmentation across chains</strong>
              <div style={{ color: "var(--muted)" }}>
                USDT exists on multiple blockchains, but users can't easily transfer between them. 
                OmniPay bridges USDT automatically between chains.
              </div>
            </div>
            <div>
              <strong>Complex bridging & swapping</strong>
              <div style={{ color: "var(--muted)" }}>
                Bridging and swapping tokens is complex and costly. OmniPay automates routing, 
                bridging, and swapping in one click.
              </div>
            </div>
            <div>
              <strong>Multi‑chain payment acceptance</strong>
              <div style={{ color: "var(--muted)" }}>
                Merchants and dApps struggle to accept multi‑chain payments. OmniPay provides 
                a unified USDT payment API and QR system.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Core Features</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <strong>Cross‑Chain USDT Payments</strong>
              <div style={{ color: "var(--muted)" }}>
                Send and receive USDT between Ethereum, Polygon, BSC, Arbitrum, and more.
              </div>
            </div>
            <div>
              <strong>Any Token → USDT Conversion</strong>
              <div style={{ color: "var(--muted)" }}>
                Pay with tokens like $ROSE, $APT, or $MATIC — receiver gets USDT on their chosen chain.
              </div>
            </div>
            <div>
              <strong>Auto Route Optimization</strong>
              <div style={{ color: "var(--muted)" }}>
                Finds the cheapest and fastest combination of bridge and DEX automatically.
              </div>
            </div>
            <div>
              <strong>Bridge Aggregation</strong>
              <div style={{ color: "var(--muted)" }}>
                Integrates Axelar, LayerZero, Wormhole, and Celer for fallback and reliability.
              </div>
            </div>
            <div>
              <strong>Merchant Mode</strong>
              <div style={{ color: "var(--muted)" }}>
                Create QR codes or payment links for receiving cross‑chain USDT payments.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>How It Works</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 12 }}>
              <strong>Connect your wallet</strong> on the source chain (e.g., Ethereum)
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Enter amount and recipient</strong> address on the destination chain
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>OmniPay analyzes routes</strong> across multiple bridges, comparing fees and estimated time
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Select optimal route</strong> — we show you the best path with transparent fee breakdown
            </li>
            <li>
              <strong>Execute transaction</strong> — USDT is locked, bridged, and delivered to the recipient
            </li>
          </ol>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Supported Chains</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            <div className="kpi">
              <div className="label">Current Demo</div>
              <div className="value">Ethereum → Polygon</div>
            </div>
            <div className="kpi">
              <div className="label">Coming Soon</div>
              <div className="value">BSC, Arbitrum</div>
            </div>
            <div className="kpi">
              <div className="label">Asset</div>
              <div className="value">USDT</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Roadmap</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <strong>Phase 1 (MVP) — Current</strong>
              <div style={{ color: "var(--muted)" }}>
                USDT Cross‑Chain Payments (Ethereum ↔ Polygon ↔ BSC), Live demo UI, Axelar integration
              </div>
            </div>
            <div>
              <strong>Phase 2 (Bonus)</strong>
              <div style={{ color: "var(--muted)" }}>
                Add Token→USDT Swap (ROSE, APT), DEX integration, QR Payment feature
              </div>
            </div>
            <div>
              <strong>Phase 3 (Future)</strong>
              <div style={{ color: "var(--muted)" }}>
                AI‑based route optimizer, $OMNI token, Merchant API, Automation workflows
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <h2 style={{ marginTop: 0 }}>Technology Stack</h2>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <strong>Smart Contracts:</strong> Solidity, Hardhat, OmniPayRouter.sol
            </div>
            <div>
              <strong>Bridges:</strong> Axelar, LayerZero, Wormhole, Celer
            </div>
            <div>
              <strong>Frontend:</strong> Next.js, React, Wagmi, Ethers.js
            </div>
            <div>
              <strong>Backend:</strong> Node.js routing engine with gas oracle and DEX aggregation
            </div>
            <div>
              <strong>APIs:</strong> Chainlink Gas Oracle, CoinGecko, Uniswap/PancakeSwap SDKs
            </div>
          </div>
        </div>
      </div>

      <div className="section card">
        <div className="card-inner">
          <p style={{ margin: 0, color: "var(--muted)" }}>
            <strong>Note:</strong> This demo routes USDT from Ethereum → Polygon via a mocked bridge, 
            showcasing the UI and data flow. Production integration with real bridges is in development.
          </p>
        </div>
      </div>
    </div>
  );
}


