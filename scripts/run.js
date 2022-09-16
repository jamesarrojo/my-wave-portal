const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const heartContractFactory = await hre.ethers.getContractFactory("SendLove");
    const heartContract = await heartContractFactory.deploy();
    await heartContract.deployed();

    console.log("Contract deployed to:", heartContract.address);
    console.log("Contract deployed by:", owner.address);

    let heartCount;
    heartCount = await heartContract.getTotalHearts();

    let heartTxn = await heartContract.sendLove();
    await heartTxn.wait();

    heartCount = await heartContract.getTotalHearts();

    heartTxn = await heartContract.connect(randomPerson).sendLove();
    await heartTxn.wait();

    heartCount = await heartContract.getTotalHearts();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();