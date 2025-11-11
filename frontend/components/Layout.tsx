"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <Link href="/" className="brand">
            <span style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              boxShadow: "0 0 24px rgba(34,211,238,0.6)",
            }} />
            <span style={{ fontSize: "20px", fontWeight: 700 }}>OmniPay</span>
            <span className="brand-badge">Cross-Chain</span>
          </Link>
          <div className="nav-links">
            <Link className="nav-link" href="/feature-transfer">OmniTransfer</Link>
            <Link className="nav-link" href="/feature-converter">OmniConvert</Link>
            <Link className="nav-link" href="/docs">Docs</Link>
            <Link className="nav-link" href="/about">About</Link>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="container">
        {children}
      </main>

      <footer className="footer">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>© 2025 OmniPay. All rights reserved.</div>
          <div style={{ display: "flex", gap: 12 }}>
            <a className="nav-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a className="nav-link" href="https://x.com" target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </footer>
    </>
  );
}


