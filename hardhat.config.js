require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00";

const polygonAmoyRpc = process.env.POLYGON_AMOY_RPC || "https://rpc-amoy.polygon.technology";

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    polygonAmoy: {
      url: polygonAmoyRpc,
      chainId: 80002,
      accounts: PRIVATE_KEY !== "0x00" ? [PRIVATE_KEY] : [],
    },
    // Legacy name for backward compatibility (deprecated - use polygonAmoy instead)
    polygonMumbai: {
      url: polygonAmoyRpc,
      chainId: 80002,
      accounts: PRIVATE_KEY !== "0x00" ? [PRIVATE_KEY] : [],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC || "https://rpc.sepolia.org",
      accounts: PRIVATE_KEY !== "0x00" ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
  },
};


