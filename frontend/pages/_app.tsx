import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, http } from "wagmi";
import { polygonMumbai, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import Layout from "../components/Layout";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [polygonMumbai, sepolia],
  transports: {
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WagmiConfig>
  );
}


