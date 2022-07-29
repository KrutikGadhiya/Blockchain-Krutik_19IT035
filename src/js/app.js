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

const id = (_id) => {
  return document.getElementById(_id);
};

const App = {
  web3Provider: null,
  web3: null,
  account: "0x0",
  contracts: {},
  init: () => {
    console.log("App initialized...");
    return App.initWeb3();
  },
  initWeb3: () => {
    if (typeof window.ethereum !== "undefined") {
      App.web3Provider = window.ethereum;
      App.web3 = new Web3(window.ethereum);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
      App.web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: () => {
    readTextFile("TokenSale.json", async function (text) {
      // console.log(JSON.parse(text));
      App.contracts.TokenSale = TruffleContract(JSON.parse(text));
      App.contracts.TokenSale.setProvider(App.web3Provider);

      let data = await App.contracts.TokenSale.deployed();
      console.log(`TokenSale Address: ${data.address}`);
      // let tokenPrice = await data.tokenPrice();
      // console.log(`Token Price: ${tokenPrice}`);
    });
    readTextFile("Krutik_19IT035.json", async function (text) {
      // console.log(JSON.parse(text));
      App.contracts.Krutik_19IT035 = TruffleContract(JSON.parse(text));
      App.contracts.Krutik_19IT035.setProvider(App.web3Provider);

      let data = await App.contracts.Krutik_19IT035.deployed();
      console.log(`Krutik_19IT035 Address: ${data.address}`);
      App.render();
    });
  },

  render: () => {
    App.account = App.web3Provider.selectedAddress;
    console.log(`your Account: ${App.account}`);
    id("accountAddress").innerText = App.account;
  },
};

window.addEventListener("load", () => {
  App.init();
});
