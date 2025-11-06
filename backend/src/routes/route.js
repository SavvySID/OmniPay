import { Router } from "express";
import { estimateRoute } from "../services/axelarMock.js";

const router = Router();

router.post("/estimate", async (req, res) => {
  try {
    const { sourceChain = "ethereum", destChain = "polygon", amountUSDT = "10" } = req.body || {};
    const estimate = await estimateRoute({ sourceChain, destChain, amountUSDT });
    res.json(estimate);
  } catch (e) {
    res.status(500).json({ error: "route_estimation_failed", details: String(e) });
  }
});

export default router;


