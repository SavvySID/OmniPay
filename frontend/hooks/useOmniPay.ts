import { useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { injected } from "@wagmi/connectors";

const routerAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint16", name: "destChainId", type: "uint16" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "sendCrossChainUSDT",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

export function useOmniPay() {
  const { connect: rawConnect } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync, isPending } = useWriteContract();
  const [txLoading, setTxLoading] = useState(false);

  const routerAddress = useMemo(
    () => (process.env.NEXT_PUBLIC_ROUTER_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`,
    []
  );

  async function sendUSDT({ amount, recipient }: { amount: string; recipient: string }) {
    if (!recipient) return alert("Enter recipient address");
    setTxLoading(true);
    try {
      await writeContractAsync({
        address: routerAddress,
        abi: routerAbi as any,
        functionName: "sendCrossChainUSDT",
        args: [BigInt(Math.floor(Number(amount) * 1e6)), 80001, recipient],
        value: 0n,
      });
      alert("Transaction submitted.");
    } finally {
      setTxLoading(false);
    }
  }

  const connect = () => rawConnect({ connector: injected() });

  return { isConnected, address, connect, disconnect, sendUSDT, isPending, txLoading };
}


