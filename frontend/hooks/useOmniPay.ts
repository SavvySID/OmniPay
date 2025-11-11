import { useMemo, useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract, useChainId, usePublicClient } from "wagmi";
import { injected } from "@wagmi/connectors";
import { isAddress } from "viem";
import { polygonAmoy, sepolia } from "viem/chains";

const routerAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint32", name: "destChainId", type: "uint32" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "sendCrossChainUSDT",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
] as const;

const erc20Abi = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Helper function to check if an address is the zero address
const isZeroAddress = (address: string | null | undefined): boolean => {
  if (!address) return true;
  return address.toLowerCase() === "0x0000000000000000000000000000000000000000";
};

// Resolve env var to a safe hex address (falls back to zero address if invalid/missing)
const resolveEnvAddress = (envVar: string | undefined, fallback?: `0x${string}`): `0x${string}` => {
	if (envVar && isAddress(envVar)) {
		return envVar as `0x${string}`;
	}
	if (fallback) {
		return fallback;
	}
	return "0x0000000000000000000000000000000000000000";
};

// USDT addresses for testnets (read from env so we can test on Amoy/Sepolia)
// - NEXT_PUBLIC_USDT_ADDRESS_80002 for Polygon Amoy
// - NEXT_PUBLIC_USDT_ADDRESS_11155111 for Sepolia
const USDT_ADDRESSES: Record<number, `0x${string}`> = {
	80002: resolveEnvAddress(process.env.NEXT_PUBLIC_USDT_ADDRESS_80002),
	11155111: resolveEnvAddress(
		process.env.NEXT_PUBLIC_USDT_ADDRESS_11155111,
		// Keep existing mock as default if none provided
		"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"
	),
};

export function useOmniPay() {
  const { connect: rawConnect } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
	const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();
  const [txLoading, setTxLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Compute router address (pure calculation)
  const routerAddress = useMemo(() => {
    const addr = process.env.NEXT_PUBLIC_ROUTER_ADDRESS;
    if (!addr || isZeroAddress(addr)) {
      return null;
    }
    if (!isAddress(addr)) {
      return null;
    }
    return addr as `0x${string}`;
  }, []);

  // Validate router address configuration and set errors
  useEffect(() => {
    const addr = process.env.NEXT_PUBLIC_ROUTER_ADDRESS;
    if (!addr || isZeroAddress(addr)) {
      setError((prev) => {
        // Only set router config error if no other error exists or if previous error was router-related
        if (!prev || prev.includes("Router address") || prev.includes("Invalid router address")) {
          return "Router address not configured. Please set NEXT_PUBLIC_ROUTER_ADDRESS";
        }
        return prev;
      });
    } else if (!isAddress(addr)) {
      setError((prev) => {
        if (!prev || prev.includes("Router address") || prev.includes("Invalid router address")) {
          return "Invalid router address format";
        }
        return prev;
      });
    } else {
      // Clear router-related errors if address is valid
      setError((prev) => {
        if (prev && (prev.includes("Router address") || prev.includes("Invalid router address"))) {
          return null;
        }
        return prev;
      });
    }
  }, []);

  // Validate USDT address configuration and set errors
  useEffect(() => {
    if (isConnected && chainId) {
      const usdtAddr = USDT_ADDRESSES[chainId];
      if (!usdtAddr || isZeroAddress(usdtAddr)) {
        setError((prev) => {
          // Only set USDT config error if no other error exists or if previous error was USDT-related
          if (!prev || prev.includes("USDT not configured") || prev.includes("USDT address")) {
            return `USDT not configured for chain ${chainId} (${chainId === 80002 ? "Polygon Amoy" : "Unknown"}). Please deploy a mock USDT contract or configure a valid USDT address.`;
          }
          return prev;
        });
      } else {
        // Clear USDT-related errors if address is valid
        setError((prev) => {
          if (prev && (prev.includes("USDT not configured") || prev.includes("USDT address"))) {
            return null;
          }
          return prev;
        });
      }
    }
  }, [chainId, isConnected]);

  const usdtAddress = useMemo(() => {
    const address = USDT_ADDRESSES[chainId];
    // Return null if address is not set or is the zero address
    if (!address || isZeroAddress(address)) {
      return null;
    }
    return address;
  }, [chainId]);

  // Check USDT allowance
  const { data: allowance } = useReadContract({
    address: usdtAddress || undefined,
    abi: erc20Abi,
    functionName: "allowance",
    args: routerAddress && address ? [address, routerAddress] : undefined,
    query: {
      enabled: !!usdtAddress && !!routerAddress && !!address && isConnected,
    },
  });

  // Check USDT balance
  const { data: balance } = useReadContract({
    address: usdtAddress || undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!usdtAddress && !!address && isConnected,
    },
  });

  // Get USDT decimals
  const { data: decimals } = useReadContract({
    address: usdtAddress || undefined,
    abi: erc20Abi,
    functionName: "decimals",
    query: {
      enabled: !!usdtAddress,
    },
  });

  // Helper to detect RPC connection errors
  const isRpcError = (error: any): boolean => {
    const msg = (error?.message || error?.shortMessage || "").toLowerCase();
    return (
      msg.includes("rpc endpoint") ||
      msg.includes("not found or unavailable") ||
      msg.includes("network error") ||
      msg.includes("failed to fetch") ||
      msg.includes("connection") ||
      error?.code === "NETWORK_ERROR"
    );
  };

  // Retry wrapper for RPC operations
  const retryRpcOperation = async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 2,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        if (isRpcError(error) && i < maxRetries) {
          // Wait before retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  };

  async function approveUSDT(amount: bigint, manageLoadingState: boolean = true, setTransactionHash: boolean = true) {
    if (!usdtAddress || isZeroAddress(usdtAddress) || !routerAddress) {
      throw new Error("USDT or Router address not configured. Please configure a valid USDT address for this network.");
    }
    if (!address) {
      throw new Error("Wallet not connected");
    }

    setError(null);
    if (manageLoadingState) {
      setTxLoading(true);
    }
    try {
      const hash = await retryRpcOperation(async () => {
        // Estimate gas defensively to avoid providers returning null gasLimit
        let gasEstimate: bigint | undefined = undefined;
        try {
          if (publicClient) {
            gasEstimate = await publicClient.estimateContractGas({
              account: address as `0x${string}`,
              address: usdtAddress,
              abi: erc20Abi,
              functionName: "approve",
              args: [routerAddress, amount],
            });
          }
        } catch {
          // fallback below
        }
        // If estimation failed, use a safe fallback for ERC20 approve
        if (!gasEstimate) {
          gasEstimate = 200000n;
        }
        return await writeContractAsync({
          account: address as `0x${string}`,
          chain: chainId === 80002 ? polygonAmoy : chainId === 11155111 ? sepolia : undefined,
          address: usdtAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [routerAddress, amount],
          gas: gasEstimate,
        });
      });
      if (setTransactionHash) {
        setTxHash(hash);
      }
      return hash;
    } catch (err: any) {
      let errorMsg = err?.message || err?.shortMessage || "Approval failed";
      if (isRpcError(err)) {
        errorMsg = "RPC connection error. Please try again or reconnect your wallet if the issue persists.";
      }
      setError(errorMsg);
      throw err;
    } finally {
      if (manageLoadingState) {
        setTxLoading(false);
      }
    }
  }

  async function sendUSDT({ amount, recipient, destChainId }: { amount: string; recipient: string; destChainId?: number }) {
    // Validation
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!routerAddress) {
      setError("Router address not configured");
      return;
    }

    if (!usdtAddress || isZeroAddress(usdtAddress)) {
      setError(`USDT not configured for chain ${chainId}. Please deploy a mock USDT contract or configure a valid USDT address.`);
      return;
    }

    if (!recipient || !isAddress(recipient)) {
      setError("Please enter a valid recipient address");
      return;
    }

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (!decimals) {
      setError("Loading token decimals...");
      return;
    }

    const amountWei = BigInt(Math.floor(amountNum * 10 ** Number(decimals)));

    if (balance !== undefined && amountWei > balance) {
      setError(`Insufficient balance. You have ${Number(balance) / 10 ** Number(decimals)} USDT`);
      return;
    }

    setError(null);
    setTxLoading(true);
    setTxHash(null);

    try {
      const targetChainId = destChainId ?? chainId ?? 80002; // Polygon Amoy testnet
      // Check if approval is needed
      const currentAllowance = allowance || 0n;
			if (currentAllowance < amountWei) {
				// Need to approve - don't let approveUSDT manage loading state or set txHash
				// We'll only set txHash for the final send transaction
				const approvalHash = await approveUSDT(amountWei, false, false);

				// Wait for approval tx to be confirmed on-chain before proceeding.
				// Fallback: if publicClient is unavailable, wait a conservative delay to avoid race conditions.
				if (publicClient) {
					await publicClient.waitForTransactionReceipt({
						hash: approvalHash as `0x${string}`,
						confirmations: 1,
					});
				} else {
					// Fallback wait (e.g., CI/SSR edge cases): 30s delay to allow the approval to be mined.
					await new Promise((resolve) => setTimeout(resolve, 30000));
				}
			}

      // Send the cross-chain transaction
			// Estimate gas for router call to prevent null gasLimit issues
			let routerGas: bigint | undefined = undefined;
			try {
				if (publicClient) {
					routerGas = await publicClient.estimateContractGas({
						account: address as `0x${string}`,
						address: routerAddress,
						abi: routerAbi,
						functionName: "sendCrossChainUSDT",
						args: [amountWei, targetChainId as number, recipient as `0x${string}`],
						value: 0n,
					});
				}
			} catch {
				// fallback below
			}
			if (!routerGas) {
				routerGas = 300000n;
			}
			const hash = await retryRpcOperation(async () => {
				return await writeContractAsync({
					account: address as `0x${string}`,
					chain: chainId === 80002 ? polygonAmoy : chainId === 11155111 ? sepolia : undefined,
					address: routerAddress,
					abi: routerAbi,
					functionName: "sendCrossChainUSDT",
					args: [amountWei, targetChainId as number, recipient as `0x${string}`],
					value: 0n,
					gas: routerGas,
				});
			});
      
      setTxHash(hash);
      return hash;
    } catch (err: any) {
      let errorMsg = err?.message || err?.shortMessage || "Transaction failed";
      if (isRpcError(err)) {
        errorMsg = "RPC connection error. Please try again or reconnect your wallet if the issue persists.";
      }
      setError(errorMsg);
      // Clear txHash if send transaction fails (approval hash shouldn't be shown)
      setTxHash(null);
      throw err;
    } finally {
      setTxLoading(false);
    }
  }

  const connect = () => rawConnect({ connector: injected() });

  return { 
    isConnected, 
    address, 
    connect, 
    disconnect, 
    sendUSDT, 
    approveUSDT,
    isPending, 
    txLoading,
    error,
    txHash,
    allowance,
    balance,
    decimals,
    usdtAddress,
    routerAddress,
  };
}


