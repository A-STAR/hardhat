import { HardhatUserConfig, scope, subtask, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
  });


task("hello", "Prints 'Hello, World!'", async function (taskArguments, hre, runSuper) {
  console.log("Hello, World!");
});

task("delayed-hello", "Prints 'Hello, World!' after a second", async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log("Hello, World!");
      resolve();
    }, 1000);
  });
});

task("hello", "Prints a greeting")
  .addOptionalParam("greeting", "The greeting to print", "Hello, World!")
  .setAction(async ({ greeting }) => console.log(greeting));

task("hello", "Prints 'Hello' multiple times")
  .addOptionalParam("times", "The number of times to print 'Hello'", 1, types.int)
  .setAction(async ({ times }) => {
    for (let i = 0; i < times; i++) {
      console.log("Hello");
    }
  });


task("hello-world", "Prints a hello world message").setAction(async (taskArgs, hre) => {
  await hre.run("print", { message: "Hello, World!" });
});

subtask("print", "Prints a message")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log(taskArgs.message);
  });


const myScope = scope("my-scope", "Scope description");

myScope.task("my-task", "Do something")
  .setAction(async () => {
    console.log("Do something");
  });

myScope.task("my-other-task", "Do something else")
  .setAction(async () => {
    console.log("Do something else");
  });

myScope.task("my-both-tasks", "Run both tasks")
  .setAction(async (taskArgs, hre) => {
    await hre.run({
      scope: "my-scope",
      task: "my-task"
    });

    await hre.run({
      scope: "my-scope",
      task: "my-other-task"
    });
  });

const config: HardhatUserConfig = {
  solidity: "0.8.28"
};

export default config;
