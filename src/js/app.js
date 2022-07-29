function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

const App = {
  web3Provider: null,
  web3: null,
  accounts: [],
  contracts: {},
  init: () => {
    console.log("App initialized...");
    return App.initWeb3();
  },
  initWeb3: () => {
    // if (typeof web3 !== "undefined") {
    //   App.web3Provider = web3.currentProvider;
    //   App.web3 = new Web3(web3.currentProvider);
    //   console.log(App.web3);
    //   // accounts = App.web3.eth.accounts;
    // } else {
    App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    App.web3 = new Web3(App.web3Provider);
    // accounts = App.web3.eth.accounts;
    // }
    return App.initContracts();
  },

  initContracts: () => {
    readTextFile("TokenSale.json", async function (text) {
      console.log(JSON.parse(text));
      // App.contracts.TokenSale = web3.eth.Contract(
      //   JSON.parse(text).abi,
      //   "0xE02e01FB4aD576B63D1F5D66a1d9D6A9B9Cf1d0E"
      // );
      // App.contracts.TokenSale = App.web3.eth
      //   .contract(JSON.parse(text).abi)
      //   .at("0xE02e01FB4aD576B63D1F5D66a1d9D6A9B9Cf1d0E");
      // console.log(App.contracts.TokenSale);
      // let tokenPrice = await App.contracts.TokenSale.tokenPrice({
      //   from: App.web3.eth.accounts[0],
      // });
      // console.log("tokenPrice", tokenPrice);

      App.contracts.TokenSale = TruffleContract(JSON.parse(text));
      App.contracts.TokenSale.setProvider(App.web3Provider);
      App.contracts.TokenSale.deployed().then(async (data) => {
        console.log(`TokenSale Address: ${data.address}`);
        let tokenPrice = await data.tokenPrice();
        console.log(`Token Price: ${tokenPrice}`);
      });
    });
  },
  // initContracts: function () {

  //   App.contracts.TokenSale = App.web3.eth
  //       .contract(JSON.parse(text).abi)
  //       .at("0x7991b7a125a1BdEB34A5DD47b46b9D8921357797");

  //   //  console.log(App.contracts.TokenSale);
  //     let tokenPrice = await App.contracts.TokenSale.methods.totalSupply.call();
  //     console.log("tokenPrice", tokenPrice);

  //   $.getJSON("TokenSale.json", function (tokenSale) {
  //     App.contracts.TokenSale = TruffleContract(tokenSale);
  //     App.contracts.TokenSale.setProvider(App.web3Provider);
  //     App.contracts.TokenSale.deployed().then(function (tokenSale) {
  //       console.log("Dapp Token Sale Address:", tokenSale.address);
  //     });
  //   }).done(function () {
  //     $.getJSON("Krutik_19IT035.json", function (krutik_19IT035) {
  //       App.contracts.Krutik_19IT035 = TruffleContract(krutik_19IT035);
  //       App.contracts.Krutik_19IT035.setProvider(App.web3Provider);
  //       App.contracts.Krutik_19IT035.deployed().then(function (krutik_19IT035) {
  //         console.log("Dapp Token Address:", krutik_19IT035.address);
  //       });

  //       App.listenForEvents();
  //       return App.render();
  //     });
  //   });
  // },
};

// window.addEventListener("load", () => {
//   App.init();
// });
$(function () {
  $(window).load(function () {
    App.init();
  });
});
