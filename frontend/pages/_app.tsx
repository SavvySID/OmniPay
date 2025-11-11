"use client";

import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { defineChain, http } from "viem";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import Layout from "../components/Layout";

// Define Polygon Amoy testnet (Chain ID 80002)
// Note: polygonMumbai is deprecated, using polygonAmoy instead
const polygonAmoy = defineChain({
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology"],
    },
  },
  blockExplorers: {
    default: {
      name: "Polygonscan",
      url: "https://amoy.polygonscan.com",
    },
  },
  testnet: true,
});

const queryClient = new QueryClient();

const amoyRpc = process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology";

const config = getDefaultConfig({
  appName: "OmniPay",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [polygonAmoy, sepolia],
  transports: {
    [polygonAmoy.id]: http(amoyRpc),
    [sepolia.id]: http("https://rpc.sepolia.org"),
  },
  ssr: false, // Disable SSR to avoid ESM/CommonJS issues with WalletConnect
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


