import { ethers } from "hardhat";

async function main() {
  const usdtAddress = process.env.USDT_ADDRESS || "0x0000000000000000000000000000000000000000"; // set mock USDT on testnet

  const Router = await ethers.getContractFactory("OmniPayRouter");
  const MockBridge = await ethers.getContractFactory("MockAxelarBridge");

  // Deploy a placeholder router first with bridge=address(0), then deploy bridge with receiver=router, then update router via constructor redeploy for simplicity in demo
  const tempRouter = await Router.deploy(usdtAddress, ethers.ZeroAddress);
  await tempRouter.waitForDeployment();

  const bridge = await MockBridge.deploy(await tempRouter.getAddress());
  await bridge.waitForDeployment();

  const router = await Router.deploy(usdtAddress, await bridge.getAddress());
  await router.waitForDeployment();

  // Point bridge receiver to final router
  const setTx = await bridge.setReceiver(await router.getAddress());
  await setTx.wait();

  console.log("Router:", await router.getAddress());
  console.log("MockBridge:", await bridge.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


