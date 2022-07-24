var TokenSale = artifacts.require("./TokenSale.sol");

contract("TokenSale", async (accounts) => {
  var contract;
  var tokenPrice = 1000000000000000; // in wei
  it("initialize the contract with the correct values", async () => {
    contract = await TokenSale.deployed();
    let address = await contract.address;
    assert.notEqual(address, 0x0, "has contract address");

    let address2 = await contract.tokenContract();
    assert.notEqual(address2, 0x0, "has token contract address");

    let price = await contract.tokenPrice();
    assert.equal(price, tokenPrice, "token price is correct");
  });
});
