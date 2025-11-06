import { useState } from "react";
import { useOmniPay } from "../hooks/useOmniPay";

export default function SendUSDTForm() {
  const { isConnected, address, connect, disconnect, sendUSDT } = useOmniPay();
  const [amount, setAmount] = useState("10");
  const [recipient, setRecipient] = useState("");

  return (
    <div className="form-grid">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isConnected ? (
          <>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>Connected</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace" }}>
                {address}
              </div>
              <button className="secondary-btn" onClick={disconnect}>Disconnect</button>
            </div>
          </>
        ) : (
          <button className="primary-btn" onClick={connect}>Connect Wallet</button>
        )}
      </div>

      <label className="label">
        <span>Amount (USDT)</span>
        <input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label className="label">
        <span>Recipient (dest address)</span>
        <input className="input" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="primary-btn" onClick={() => sendUSDT({ amount, recipient })}>Send Cross‑Chain</button>
        <button className="secondary-btn" onClick={() => { setAmount("10"); setRecipient(""); }}>Reset</button>
      </div>
    </div>
  );
}


