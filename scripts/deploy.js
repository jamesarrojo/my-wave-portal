const { run } = require("hardhat");

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const heartContractFactory = await hre.ethers.getContractFactory("SendLove");
    const heartContract = await heartContractFactory.deploy();
    await heartContract.deployed();

    console.log("SendLove address: ", heartContract.address)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();