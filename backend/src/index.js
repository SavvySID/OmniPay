import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routeRouter from "./routes/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/route", routeRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`OmniPay backend listening on :${port}`);
});


