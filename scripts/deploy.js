const main = async () => {

    const heartContractFactory = await hre.ethers.getContractFactory("SendLove");
    const heartContract = await heartContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    
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