const Krutik_19IT035 = artifacts.require("./Krutik_19IT035.sol");
const TokenSale = artifacts.require("./TokenSale.sol");
// token price is 0.001 ETH
var tokenPrice = 1000000000000000; // in wei

module.exports = async function (deployer) {
  await deployer.deploy(Krutik_19IT035, 1000000);
  await deployer.deploy(TokenSale, Krutik_19IT035.address, tokenPrice);
};
