export async function getBridgeInfo(sourceChain, destChain) {
  // Mocked for Wave 1–2
  return {
    name: "MockAxelar",
    sourceChain,
    destChain,
    fee: 0.25,
    ETA: "45s",
  };
}


