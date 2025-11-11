**OmniPay**

USDT Cross-Chain Payment Hub (demo). Frontend is a Next.js app powered by wagmi/viem. Contracts include a mock bridge and router for local/testing flows. A minimal mock backend can provide route estimates, but the frontend works without it.

**Features**

- Send USDT cross-chain (mocked router/bridge for demo)
- Wallet connect/disconnect (injected connector)
- Auto-approve USDT if allowance is insufficient
- Testnets: Polygon Amoy and Sepolia

**Monorepo**

- contracts/ — Hardhat Solidity: `OmniPayRouter`, `MockAxelarBridge`, optional `MockUSDT`
- backend/ — Optional Express mock: `/route/estimate` returns example route/fee
- frontend/ — Next.js + wagmi demo UI

**Requirements**

- Node.js 18 or 20
- npm (or yarn/pnpm)
- Wallet (e.g., MetaMask) with testnet funds if testing on Amoy/Sepolia

**Environment variables (frontend)**

Create `frontend/.env.local` and set:

```
NEXT_PUBLIC_ROUTER_ADDRESS=0x...            # Deployed OmniPayRouter
NEXT_PUBLIC_USDT_ADDRESS_80002=0x...        # (optional) Amoy USDT
NEXT_PUBLIC_USDT_ADDRESS_11155111=0x...     # (optional) Sepolia USDT
```

If specific USDT addresses are not set, the UI may show a notice to switch network or configure addresses.

**Contracts (optional, for your own deployments)**

```
cd contracts
cp env.example .env   # fill PRIVATE_KEY, RPC URLs, optional USDT
npm i
npm run build
npm run deploy:amoy   # or your target network
```

Note the deployed `OmniPayRouter` address and set it in the frontend env file.

**Frontend dev**

```
cd frontend
npm i
npm run dev
```

Open http://localhost:3000 and:

- Connect wallet
- Enter amount and recipient address
- Click “Send Cross‑Chain” (mock flow)

---

- The demo uses a mocked bridge. Replace with a real bridge (e.g., Axelar/LayerZero) in production.
- Ensure RPC endpoints are reliable and rate-limit friendly for your chosen networks.
