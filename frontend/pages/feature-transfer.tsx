"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import RouteDetails from "../components/RouteDetails";

const SendUSDTForm = dynamic(() => import("../components/SendUSDTForm"), { ssr: false });

export default function FeatureTransfer() {
  const [estimate, setEstimate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = useMemo(() => process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000", []);

  async function fetchEstimate() {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/route/estimate`, {
        sourceChain: "ethereum",
        destChain: "polygon",
        amountUSDT: "10",
      });
      setEstimate(data);
    } catch (error) {
      // Silently handle network errors - backend may not be running
      console.warn("Could not fetch route estimate:", error);
      setEstimate(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstimate();
  }, []);

  return (
    <div className="hero">
      <h1 className="hero-title">OmniTransfer</h1>
      <h2 style={{ fontSize: 24, fontWeight: 600, margin: "0 0 16px", color: "var(--secondary)" }}>The USDT Cross-Chain Payment Hub</h2>
      <p className="hero-subtitle">
        Handles frictionless, gas-optimized USDT transfers across multiple blockchains using automated route optimization and bridge aggregation.
      </p>

      <div className="section card">
        <div className="card-inner">
          <h3 style={{ marginTop: 0 }}>Try It</h3>
          <p style={{ color: "var(--muted)" }}>Connect a wallet, enter an amount and destination address, then send.</p>
          <SendUSDTForm />
          <RouteDetails estimate={estimate} loading={loading} />
        </div>
      </div>
    </div>
  );
}


