import { Router } from "express";
import { getBridgeInfo } from "../utils/bridgeAPI.js";
import { getGasData } from "../utils/gasOracle.js";
import { optimizeRoute } from "../utils/routeOptimizer.js";

const router = Router();

router.post("/estimate", async (req, res) => {
  try {
    const { sourceChain = "ethereum", destChain = "polygon", amountUSDT = "10" } = req.body || {};

    const [gasSource, gasDest, bridge] = await Promise.all([
      getGasData(sourceChain).catch(() => ({ standard: 25 })),
      getGasData(destChain).catch(() => ({ standard: 25 })),
      getBridgeInfo(sourceChain, destChain).catch(() => ({ name: "MockAxelar", fee: 0.25, destChain })),
    ]);

    const result = optimizeRoute({ amountUSDT: Number(amountUSDT), gasSource, gasDest, bridge });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "route_estimation_failed", details: String(e) });
  }
});

export default router;


