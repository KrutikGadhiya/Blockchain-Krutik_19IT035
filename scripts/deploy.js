async function main() {
  const Krutik_19IT035 = await ethers.getContractFactory("Krutik_19IT035");
  const TokenSale = await ethers.getContractFactory("TokenSale");
  var tokenPrice = 1000000000000000; // in wei

  // Start deployment, returning a promise that resolves to a contract object
  const krutik19it035 = await Krutik_19IT035.deploy(1000000);
  console.log(
    "[Krutik_19IT035] Contract deployed to address: ",
    krutik19it035.address
  );
  console.log(krutik19it035);

  const tokensale = await TokenSale.deploy(krutik19it035.address, tokenPrice);
  console.log("[TokenSale] Contract deployed to address: ", tokensale.address);
  console.log(tokensale);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/* 
[Krutik_19IT035] Contract deployed to address:  0x176fC30745CfFfe3bbfB31Aa8293d0dF22333A68
[TokenSale] Contract deployed to address:  0xEd358c6ef16661d7fE43257C53B88BCC903fBF5a
*/
