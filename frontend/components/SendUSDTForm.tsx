"use client";

import { useState, useMemo } from "react";
import { useChainId } from "wagmi";
import { useOmniPay } from "../hooks/useOmniPay";
import { formatUnits } from "viem";

export default function SendUSDTForm() {
  const { 
    isConnected, 
    address, 
    connect, 
    disconnect, 
    sendUSDT, 
    isPending, 
    txLoading,
    error,
    txHash,
    balance,
    decimals,
    allowance,
    usdtAddress,
    routerAddress,
  } = useOmniPay();
  const [amount, setAmount] = useState("10");
  const [recipient, setRecipient] = useState("");
  const chainId = useChainId();

  const balanceDisplay = balance && decimals 
    ? Number(formatUnits(balance, decimals)).toFixed(2)
    : "0.00";

  // Calculate if approval is needed for the current amount
  const needsApproval = useMemo(() => {
    if (!amount || !decimals || allowance === undefined || !usdtAddress || !routerAddress) {
      return false;
    }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return false;
    }
    const amountWei = BigInt(Math.floor(amountNum * 10 ** Number(decimals)));
    return allowance < amountWei;
  }, [amount, decimals, allowance, usdtAddress, routerAddress]);

  return (
    <div className="form-grid">
      {/* Configuration Status */}
      {!routerAddress && (
        <div style={{ 
          padding: "12px", 
          background: "#fee", 
          border: "1px solid #fcc", 
          borderRadius: "8px",
          color: "#c33",
          marginBottom: "16px"
        }}>
          ⚠️ Router address not configured. Set NEXT_PUBLIC_ROUTER_ADDRESS in your .env file.
        </div>
      )}

      {!usdtAddress && isConnected && (
        <div style={{ 
          padding: "12px", 
          background: "#ffe", 
          border: "1px solid #ffc", 
          borderRadius: "8px",
          color: "#993",
          marginBottom: "16px"
        }}>
          ⚠️ USDT not configured for this network. Please switch to Polygon Amoy or Sepolia.
        </div>
      )}

      {/* Wallet Connection */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isConnected ? (
          <>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>Connected</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace", fontSize: "12px" }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <button className="secondary-btn" onClick={() => disconnect()}>Disconnect</button>
            </div>
          </>
        ) : (
          <button className="primary-btn" onClick={connect}>Connect Wallet</button>
        )}
      </div>

      {/* Balance Display */}
      {isConnected && usdtAddress && (
        <div style={{ 
          padding: "8px 12px", 
          background: "var(--bg-secondary)", 
          borderRadius: "6px",
          fontSize: "14px"
        }}>
          <span style={{ color: "var(--muted)" }}>Balance: </span>
          <strong>{balanceDisplay} USDT</strong>
        </div>
      )}

      {/* Amount Input */}
      <label className="label">
        <span>Amount (USDT)</span>
        <input 
          className="input" 
          type="number"
          step="0.01"
          min="0"
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          disabled={txLoading || !isConnected}
        />
      </label>

      {/* Recipient Input */}
      <label className="label">
        <span>Recipient Address</span>
        <input 
          className="input" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
          placeholder="0x..."
          disabled={txLoading || !isConnected}
        />
      </label>

      {/* Error Display */}
      {error && (
        <div style={{ 
          padding: "12px", 
          background: "#fee", 
          border: "1px solid #fcc", 
          borderRadius: "8px",
          color: "#c33",
          fontSize: "14px"
        }}>
          ❌ {error}
        </div>
      )}

      {/* Success Display */}
      {txHash && (
        <div style={{ 
          padding: "12px", 
          background: "#efe", 
          border: "1px solid #cfc", 
          borderRadius: "8px",
          color: "#3c3",
          fontSize: "14px"
        }}>
          ✅ Transaction submitted! Hash: {txHash.slice(0, 10)}...{txHash.slice(-8)}
          <div style={{ marginTop: 6 }}>
            <a 
              href={`${chainId === 80002 ? "https://amoy.polygonscan.com" : chainId === 11155111 ? "https://sepolia.etherscan.io" : ""}/tx/${txHash}`}
              target="_blank" 
              rel="noreferrer" 
              style={{ color: "#2b7" }}
            >
              View on explorer
            </a>
          </div>
        </div>
      )}

      {/* Approval Notice */}
      {needsApproval && isConnected && amount && Number(amount) > 0 && (
        <div style={{ 
          padding: "8px 12px", 
          background: "#eef", 
          border: "1px solid #ccf", 
          borderRadius: "6px",
          color: "#33c",
          fontSize: "13px"
        }}>
          ℹ️ You'll need to approve USDT spending first (one-time per amount)
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button 
          className="primary-btn" 
          onClick={() => sendUSDT({ amount, recipient })}
          disabled={txLoading || isPending || !isConnected || !routerAddress || !usdtAddress}
        >
          {txLoading || isPending ? "Processing..." : "Send Cross‑Chain"}
        </button>
        <button 
          className="secondary-btn" 
          onClick={() => { setAmount("10"); setRecipient(""); }}
          disabled={txLoading}
        >
          Reset
        </button>
      </div>
    </div>
  );
}


