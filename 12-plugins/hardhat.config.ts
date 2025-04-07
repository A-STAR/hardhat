import { HardhatUserConfig, extendEnvironment, task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";

extendEnvironment((hre) => {
  (hre as HardhatRuntimeEnvironment & { hi: string }).hi = "Hello, Hardhat!";
});

task("envtest", async (args, hre) => {
  console.log((hre as HardhatRuntimeEnvironment & { hi: string }).hi);
});

const config: HardhatUserConfig = {
  solidity: "0.8.28"
};

export default config;
