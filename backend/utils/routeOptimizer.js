export function optimizeRoute({ amountUSDT, gasSource, gasDest, bridge }) {
  const gasFeeUSDT = 0.15; // mocked conversion
  const totalFee = (bridge.fee || 0) + gasFeeUSDT;
  const expected = Math.max(amountUSDT - totalFee, 0);
  return {
    best_route: `${bridge.name} → ${bridge.destChain}`,
    estimated_time: bridge.ETA || "45s",
    total_fee_usdt: totalFee.toFixed(2),
    expected_output_usdt: expected.toFixed(2),
    gas_data: { source: gasSource, dest: gasDest },
  };
}


