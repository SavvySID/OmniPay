import axios from "axios";

const GAS_ORACLE_URLS = {
  ethereum: process.env.ETH_GAS_API || "https://api.etherscan.io/api?module=gastracker&action=gasoracle",
  polygon: process.env.POLYGON_GAS_API || "https://api.polygonscan.com/api?module=gastracker&action=gasoracle",
};

export async function estimateRoute({ sourceChain, destChain, amountUSDT }) {
  const gasSource = await fetchGas(sourceChain).catch(() => ({ standard: 25 }));
  const gasDest = await fetchGas(destChain).catch(() => ({ standard: 25 }));

  const bridgeFee = 0.25; // mock USDT bridge fee
  const gasFeeUSDT = 0.15; // mock conversion to USDT
  const totalFee = bridgeFee + gasFeeUSDT;
  const amount = Number(amountUSDT);

  return {
    best_route: `MockAxelar → ${destChain}`,
    estimated_time: "45s",
    total_fee_usdt: totalFee.toFixed(2),
    expected_output_usdt: (amount - totalFee).toFixed(2),
    gas_data: { source: gasSource, dest: gasDest },
    explorer_hints: {
      source: sourceChain,
      dest: destChain,
    },
  };
}

async function fetchGas(chain) {
  const url = GAS_ORACLE_URLS[chain];
  if (!url) return { standard: 25 };
  const { data } = await axios.get(url);
  return { standard: 25, raw: data };
}


