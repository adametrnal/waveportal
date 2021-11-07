const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    //compile the contract
    const contractFactory = await hre.ethers.getContractFactory("MyStreamContract");

    //deploy
    const contract = await contractFactory.deploy();

    //notify when deploy is finished 
    await contract.deployed();

    console.log("Deployed! Address:", contract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await contract.getTotalWaves();

    let waveTxn = await contract.wave();
    await waveTxn.wait();
    waveCount = await contract.getTotalWaves();

    waveTxn = await contract.connect(randomPerson).wave();
    await waveTxn.wait();
    waveCount = await contract.getTotalWaves();

};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();