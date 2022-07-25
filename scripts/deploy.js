const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")

    const simpleStorage = await SimpleStorageFactory.deploy()

    await simpleStorage.deployed()

    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // 在rinkeby网络才校验
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    let currentValue = await simpleStorage.retrieve()
    console.log(
        "🚀 ~ file: deploy.js ~ line 23 ~ main ~ currentValue",
        currentValue
    )

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then((res) => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
