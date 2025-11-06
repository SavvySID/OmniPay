import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, ".env") });

import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00";

const config: import("hardhat/config").HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC || "https://rpc-mumbai.maticvigil.com",
      accounts: PRIVATE_KEY !== "0x00" ? [PRIVATE_KEY] : [],
    },
    // Optionally Sepolia for cross-chain demo later
    sepolia: {
      url: process.env.SEPOLIA_RPC || "https://rpc.sepolia.org",
      accounts: PRIVATE_KEY !== "0x00" ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
  },
};

export default config;


