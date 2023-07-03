/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

// Test deployment key !!
const ALCHEMY_API_KEY = "_xCNKqI0VI1YiPhwUtTR4DsNnQzQim8s";

// Pkey of test metamask account on sepolia network 
const SEPOLIA_PRIVATE_KEY =
  "d9f7973dbfbf4836bde69cb3c818aff8cb1cd7a1ff74423240599b83f94839c0";

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
