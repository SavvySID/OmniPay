import axios from "axios";

const GAS_ORACLE_URLS = {
  ethereum: process.env.ETH_GAS_API || "https://api.etherscan.io/api?module=gastracker&action=gasoracle",
  polygon: process.env.POLYGON_GAS_API || "https://api.polygonscan.com/api?module=gastracker&action=gasoracle",
};

export async function getGasData(chain) {
  const url = GAS_ORACLE_URLS[chain];
  if (!url) return { standard: 25 };
  const { data } = await axios.get(url);
  return { standard: 25, raw: data };
}


