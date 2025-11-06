"use client";

import { useState } from "react";

type TabKey = "getting-started" | "examples" | "advanced";

export default function Docs() {
  const [tab, setTab] = useState<TabKey>("getting-started");

  return (
    <div className="hero">
      <h1 className="hero-title">Documentation</h1>
      <p className="hero-subtitle">Learn how to use OmniPay to move USDT cross‑chain with optimized routes.</p>

      <div className="section" style={{ display: "flex", gap: 10 }}>
        <button
          className="secondary-btn"
          style={{ background: tab === "getting-started" ? "var(--glass)" : "transparent" }}
          onClick={() => setTab("getting-started")}
        >
          Getting Started
        </button>
        <button
          className="secondary-btn"
          style={{ background: tab === "examples" ? "var(--glass)" : "transparent" }}
          onClick={() => setTab("examples")}
        >
          Examples
        </button>
        <button
          className="secondary-btn"
          style={{ background: tab === "advanced" ? "var(--glass)" : "transparent" }}
          onClick={() => setTab("advanced")}
        >
          Advanced
        </button>
      </div>

      {tab === "getting-started" && (
        <div className="section card">
          <div className="card-inner">
            <h2 style={{ marginTop: 0 }}>Getting Started</h2>
            <ol>
              <li style={{ marginBottom: 16 }}>
                <strong>Connect your wallet</strong>
                <div style={{ color: "var(--muted)" }}>Click "Connect Wallet" on the homepage form to authorize your account.</div>
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Choose amount and recipient</strong>
                <div style={{ color: "var(--muted)" }}>Enter the USDT amount and the destination address on the target chain.</div>
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong>Review route estimate</strong>
                <div style={{ color: "var(--muted)" }}>OmniPay queries the backend to forecast best route, ETA, and fees.</div>
              </li>
              <li>
                <strong>Send cross‑chain</strong>
                <div style={{ color: "var(--muted)" }}>Confirm the transaction to execute via the selected bridge/route.</div>
              </li>
            </ol>
          </div>
        </div>
      )}

      {tab === "examples" && (
        <div className="section" style={{ display: "grid", gap: 16 }}>
          <div className="card"><div className="card-inner">
            <h3 style={{ marginTop: 0 }}>Basic Transfers</h3>
            <ul>
              <li>
                <code>Send 10 USDT to 0xabc... on Polygon</code>
                <div style={{ color: "var(--muted)" }}>Set amount to 10 and recipient to the Polygon address, then send.</div>
              </li>
              <li>
                <code>Estimate route for 25 USDT</code>
                <div style={{ color: "var(--muted)" }}>Use the homepage to preview ETA and fees before sending.</div>
              </li>
            </ul>
          </div></div>

          <div className="card"><div className="card-inner">
            <h3 style={{ marginTop: 0 }}>Token & Network</h3>
            <ul>
              <li>
                <code>Switch destination to Polygon</code>
                <div style={{ color: "var(--muted)" }}>Current demo supports Ethereum → Polygon for USDT.</div>
              </li>
              <li>
                <code>Preview fees</code>
                <div style={{ color: "var(--muted)" }}>Fees are dynamic based on route, bridge cost, and gas conditions.</div>
              </li>
            </ul>
          </div></div>
        </div>
      )}

      {tab === "advanced" && (
        <div className="section card">
          <div className="card-inner">
            <h2 style={{ marginTop: 0 }}>Advanced Features</h2>
            <h4>Batch Transfers (Roadmap)</h4>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>Send to multiple recipients in one flow.</div>
            <code>Send 5 USDT to Alice, 10 USDT to Bob, and 3 USDT to Charlie</code>

            <h4 style={{ marginTop: 24 }}>Smart Routing</h4>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>Automatically choose the best bridge based on fees and ETA.</div>

            <h4 style={{ marginTop: 24 }}>Security Best Practices</h4>
            <ul>
              <li>Verify transaction details before confirming</li>
              <li>Never share seed phrases or private keys</li>
              <li>Use hardware wallets for large balances</li>
              <li>Enable 2FA where supported</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


