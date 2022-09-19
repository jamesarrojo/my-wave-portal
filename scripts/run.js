const main = async () => {
    const heartContractFactory = await hre.ethers.getContractFactory("SendLove");
    const heartContract = await heartContractFactory.deploy();
    await heartContract.deployed();
    console.log("Contract deployed to:", heartContract.address);

    let heartCount;
    heartCount = await heartContract.getTotalHearts();
    console.log(heartCount.toNumber());

    // sending love
    let heartTxn = await heartContract.sendLove("A message!");
    await heartTxn.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();

    // heartCount = await heartContract.getTotalHearts();

    heartTxn = await heartContract.connect(randomPerson).sendLove("Another message!");
    await heartTxn.wait();

    // heartCount = await heartContract.getTotalHearts();

    let allHearts = await heartContract.getAllHearts();
    console.log(allHearts);
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