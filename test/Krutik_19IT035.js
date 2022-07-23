let Krutik_19IT035 = artifacts.require("./Krutik_19IT035.sol");

contract("Krutik_19IT035", (accounts) => {
  // it("initializes the contract with correct values", async () => {
  //   let contract = await Krutik_19IT035.deployed();
  //   let name = await contract.name();
  //   let symbol = await contract.symbol();
  //   let standard = await contract.standard();

  //   assert.equal(name, "Krutik_19IT035", "Check Name of Token");
  //   assert.equal(symbol, "KG35", "Check Symbol of Token");
  //   assert.equal(standard, "Krutik_19IT035 v1.0", "Check Standard of Token");
  // });

  // it("check/allocates totalSupply onDeployment", async () => {
  //   let contract = await Krutik_19IT035.deployed();
  //   let totalSupply = await contract.totalSupply();

  //   assert.equal(
  //     totalSupply.toNumber(),
  //     1000000,
  //     "check totalSupply onDeployment"
  //   );

  //   let adminAccount = await contract.balanceOf(accounts[0]);
  //   assert.equal(
  //     adminAccount.toNumber(),
  //     1000000,
  //     "allocates initial supply to admin"
  //   );
  // });

  // it("transfer token ownership", async () => {
  //   let contract = await Krutik_19IT035.deployed();
  //   try {
  //     const res = await contract.transfer.call(accounts[1], 999999999999999);
  //     await assert.fail(res);
  //   } catch (error) {
  //     // console.log("[Message]: ", error.message);
  //     assert(
  //       error.message.includes("revert"),
  //       "error message must contain revert"
  //     );
  //   }
  //   const receipt = await contract.transfer(accounts[1], 250000, {
  //     from: accounts[0],
  //   });

  //   let success = await contract.transfer.call(accounts[1], 250000, {
  //     from: accounts[0],
  //   });
  //   assert.equal(success, true, "it returns true");

  //   let balanceOf1 = await contract.balanceOf(accounts[1]);
  //   assert.equal(
  //     balanceOf1.toNumber(),
  //     250000,
  //     "adds amount to the receiving account"
  //   );
  //   let balanceOf0 = await contract.balanceOf(accounts[0]);
  //   assert.equal(
  //     balanceOf0.toNumber(),
  //     750000,
  //     "deducts amount from the sending account"
  //   );

  //   assert.equal(receipt.logs.length, 1, "triggers one event");
  //   assert.equal(
  //     receipt.logs[0].event,
  //     "Transfer",
  //     "should be the transfer event"
  //   );
  //   assert.equal(
  //     receipt.logs[0].args._from,
  //     accounts[0],
  //     "log the account the tokens are trasgerred from"
  //   );
  //   assert.equal(
  //     receipt.logs[0].args._to,
  //     accounts[1],
  //     "log the account the tokens are trasgerred to"
  //   );
  //   assert.equal(
  //     receipt.logs[0].args._value.toNumber(),
  //     250000,
  //     "log the transfer amount"
  //   );
  // });

  it("Approves tokens for delegate transfer", async () => {
    const contract = await Krutik_19IT035.deployed();
    let success = await contract.approve.call(accounts[1], 100);
    assert.equal(success, true, "it return true");

    let receipt = await contract.approve(accounts[1], 100);
    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(
      receipt.logs[0].event,
      "Approval",
      "should be the Approval event"
    );
    assert.equal(
      receipt.logs[0].args._owner,
      accounts[0],
      "log the account the tokens are authorized by"
    );
    assert.equal(
      receipt.logs[0].args._spender,
      accounts[1],
      "log the account the tokens are authorized to"
    );
    assert.equal(
      receipt.logs[0].args._value.toNumber(),
      100,
      "log the Approval amount"
    );

    let allowance = await contract.allowance(accounts[0], accounts[1]);
    assert.equal(
      allowance.toNumber(),
      100,
      "stores the allowance for delegate transfer"
    );
  });
});
