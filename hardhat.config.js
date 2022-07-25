require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-waffle")

require("dotenv").config()
// 验证 Solidity 合约的源代码
require("@nomiclabs/hardhat-etherscan")

require("./tasks/block-number")
// 显示测试报告 gas花费
require("hardhat-gas-reporter")
// 测试覆盖率
require("solidity-coverage")



/** @type import('hardhat/config').HardhatUserConfig */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const RINKEBY_PRIVATR_KEY = process.env.RINKEBY_PRIVATR_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY


module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.9",

    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            chainId: 4,
            accounts: [RINKEBY_PRIVATR_KEY],
        },
        local: {
          url: "http://127.0.0.1:8545",
          chainId: 1337,
      },
    },
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
      enabled: true,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
    }
}
