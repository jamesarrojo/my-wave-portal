const main = async () => {
    const heartContractFactory = await hre.ethers.getContractFactory("SendLove");
    const heartContract = await heartContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await heartContract.deployed();
    console.log("Contract deployed to:", heartContract.address);

    // get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        heartContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    

    // let heartCount;
    // heartCount = await heartContract.getTotalHearts();
    // console.log(heartCount.toNumber());

    // sending love - 2 sendlove now
    let heartTxn = await heartContract.sendLove("This is message #1");
    await heartTxn.wait();

    let heartTxn2 = await heartContract.sendLove("This is message #2");
    await heartTxn2.wait();

    // const [_, randomPerson] = await hre.ethers.getSigners();

    // heartCount = await heartContract.getTotalHearts();

    // heartTxn = await heartContract.connect(randomPerson).sendLove("Another message!");
    // await heartTxn.wait();

    // heartCount = await heartContract.getTotalHearts();

    // Get Contract balance to see what happened!
    contractBalance = await hre.ethers.provider.getBalance(heartContract.address);
    console.log(
        "Contract balance",
        hre.ethers.utils.formatEther(contractBalance)
    );

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