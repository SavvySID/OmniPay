OmniPay — Wave 1–2 Foundation (USDT Cross-Chain Payment Hub)

Monorepo structure:

- contracts/ — Solidity (Hardhat). Deploys `OmniPayRouter` + `MockAxelarBridge` to Polygon Mumbai.
- backend/ — Node.js Express mock routing engine. `/route/estimate` returns route/fee JSON.
- frontend/ — Next.js + wagmi demo UI to send cross-chain USDT (mock bridge).

Quick start

1) Contracts

- cd contracts
- Copy `.env` with: `PRIVATE_KEY`, `POLYGON_MUMBAI_RPC`, `USDT_ADDRESS` (testnet USDT or mock)
- npm i
- npm run build
- npm run deploy:mumbai
- Capture the `Router` address and set it to NEXT_PUBLIC_ROUTER_ADDRESS in frontend.

2) Backend

- cd backend
- npm i
- npm run dev
- POST http://localhost:4000/route/estimate { sourceChain, destChain, amountUSDT }

3) Frontend

- cd frontend
- npm i
- set env: NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_POLYGON_MUMBAI_RPC, NEXT_PUBLIC_ROUTER_ADDRESS
- npm run dev

MVP flow (mocked)

- Connect wallet.
- Enter amount + recipient.
- See estimation (from backend).
- Submit `sendCrossChainUSDT` to `OmniPayRouter` which uses `MockAxelarBridge` to simulate delivery.

Notes

- The bridge is mocked: it immediately calls `receiveUSDT` locally to simulate cross-chain.
- Replace `MockAxelarBridge` with real Axelar/LayerZero in later waves.


