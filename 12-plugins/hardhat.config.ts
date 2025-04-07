import { HardhatUserConfig, extendEnvironment, extendProvider, task } from "hardhat/config";
import { EIP1193Provider, HardhatConfig, HardhatRuntimeEnvironment, RequestArguments } from "hardhat/types";
import { ProviderWrapper } from 'hardhat/plugins'
import "@nomicfoundation/hardhat-toolbox";

extendEnvironment((hre) => {
  (hre as HardhatRuntimeEnvironment & { hi: string }).hi = "Hello, Hardhat!";
});

task("envtest", async (args, hre) => {
  console.log((hre as HardhatRuntimeEnvironment & { hi: string }).hi);
});


class FixedGasProvider extends ProviderWrapper {
  constructor(
    public readonly gasPrice: bigint,
    protected readonly _wrappedProvider: EIP1193Provider
  ) {
    super(_wrappedProvider);
  }

  public async request(args: RequestArguments) {
    if (args.method === "eth_estimateGas") {
      return this.gasPrice;
    } else if (args.method === "eth_sendTransaction") {
      const params = this._getParams(args);
      const tx = params[0];

      // let's pretend that EIP-1559 never happened
      tx.gasPrice = this.gasPrice;
    }

    return this._wrappedProvider.request(args);
  }
}

extendProvider(async (provider, config, network) => {
  // We fix the gas price to be set by the config or to a random high value
  const gasPrice = (config as HardhatConfig & { fixedGasPrice: bigint }).fixedGasPrice || BigInt("0x1000000")
  const newProvider = new FixedGasProvider(gasPrice, provider);
  return newProvider;
});

task("request", async (args, hre) => {
  await hre.network.provider.request({ method: "eth_estimateGas" }); // this will run `FixedGasProvider` request method above
});

const config: HardhatUserConfig = {
  solidity: "0.8.28"
};

export default config;
