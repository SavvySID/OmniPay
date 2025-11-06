export default function Home() {

  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">What is OmniPay?</h1>
        <p className="hero-subtitle">
          OmniPay is a cross‑chain payments layer. It discovers the best path to move value across
          chains, abstracts bridge complexity, and provides a clean UX for sending assets like USDT.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <a className="cta" href="/feature-transfer">Try OmniTransfer</a>
          <a className="secondary-btn" href="/feature-converter">OmniConvert (Coming Soon)</a>
        </div>
        <div className="kpi-row">
          <div className="kpi"><div className="label">Chains</div><div className="value">Ethereum → Polygon</div></div>
          <div className="kpi"><div className="label">Avg. Time</div><div className="value">~2–5 min</div></div>
          <div className="kpi"><div className="label">Fee Model</div><div className="value">Dynamic</div></div>
          <div className="kpi"><div className="label">Asset</div><div className="value">USDT</div></div>
        </div>
      </section>

      <section className="section" style={{ display: "grid", gap: 16 }}>
        <div className="card">
          <div className="card-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>OmniTransfer</h3>
              <div style={{ color: "var(--muted)" }}>Send USDT between chains with optimized routing and transparent fees.</div>
            </div>
            <a className="cta" href="/feature-transfer">Try</a>
          </div>
        </div>

        <div className="card">
          <div className="card-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>OmniConvert (Coming Soon)</h3>
              <div style={{ color: "var(--muted)" }}>Swap any supported token cross‑chain into USDT on a destination network.</div>
            </div>
            <a className="secondary-btn" href="/feature-converter">Learn More</a>
          </div>
        </div>
      </section>
    </div>
  );
}


