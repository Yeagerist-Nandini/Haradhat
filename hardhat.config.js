require("dotenv").config();
require("@nomiclabs/hardhat-ethers");


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/26gj_RXrjMhntKRxqiQkmCG7JDPre6Jx",
      accounts: [process.env.PRIVATE_KEY.toString()],
    },
  },
};

