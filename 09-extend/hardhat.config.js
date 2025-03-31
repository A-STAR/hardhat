require("@nomicfoundation/hardhat-toolbox");

const { Web3 } = require("web3");
const { extendEnvironment } = require("hardhat/config");

extendEnvironment((hre) => {
  hre.Web3 = Web3;

  // hre.network.provider is an EIP1193-compatible provider.
  hre.web3 = new Web3(hre.network.provider);
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28"
};
