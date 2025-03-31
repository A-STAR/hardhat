import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");

const salt = vars.get("DEPLOY_SALT", "DEFAULT_VALUE");
const accounts = vars.has("TEST_PK") ? [vars.get("TEST_PK")] : [];

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts
    }
  },
  solidity: "0.8.28"
};

export default config;
