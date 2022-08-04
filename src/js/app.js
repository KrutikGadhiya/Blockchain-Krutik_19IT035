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

const showLoading = (show) => {
  if (show) {
    id("loader").style.display = "flex";
    id("content").style.display = "none";
  } else {
    id("loader").style.display = "none";
    id("content").style.display = "block";
  }
};

const App = {
  loading: true,
  web3Provider: null,
  web3: null,
  account: "0x0",
  contracts: {},
  tokenPrice: null,
  tokensSold: null,
  tokensAvailable: 750000,
  balance: null,

  init: () => {
    console.log("App initialized...");
    return App.initWeb3();
  },
  initWeb3: () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("metamask found");
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
      App.account = App.web3Provider.selectedAddress;
      console.log(`your Account: ${App.account}`);
      // console.log(JSON.parse(text));
      App.contracts.TokenSale = TruffleContract(JSON.parse(text));
      App.contracts.TokenSale.setProvider(App.web3Provider);

      // let data = await App.contracts.TokenSale.deployed();
      // console.log(`TokenSale Address: ${data.address}`);
      // App.tokenPrice = await data.tokenPrice();
      // console.log(`Token Price: ${App.tokenPrice}`);
      // App.tokensSold = await data.tokensSold();
      // console.log(`Token Sold: ${App.tokensSold}`);

      readTextFile("Krutik_19IT035.json", async function (text) {
        // console.log(JSON.parse(text));
        App.contracts.Krutik_19IT035 = TruffleContract(JSON.parse(text));
        App.contracts.Krutik_19IT035.setProvider(App.web3Provider);

        // let data = await App.contracts.Krutik_19IT035.deployed();
        // console.log(`Krutik_19IT035 Address: ${data.address}`);

        // App.balance = await data.balanceOf(App.account);
        // console.log(`Your Balance: ${App.balance}`);

        App.listenForEvents();

        App.render();
      });
    });
  },

  render: async () => {
    // App.account = App.web3Provider.selectedAddress;
    // console.log(`2. your Account: ${App.account}`);
    let tokensale = await App.contracts.TokenSale.deployed();
    App.tokenPrice = await tokensale.tokenPrice();
    App.tokensSold = await tokensale.tokensSold();
    console.log(`TokenSale Address: ${tokensale.address}`);
    console.log(`Token Price: ${App.tokenPrice}`);
    console.log(`Token Sold: ${App.tokensSold}`);

    let token = await App.contracts.Krutik_19IT035.deployed();
    App.balance = await token.balanceOf(App.account);
    console.log(`Krutik_19IT035 Address: ${token.address}`);
    console.log(`Your Balance: ${App.balance}`);

    id("accountAddress").innerText = App.account;
    id("token-price").innerText = App.web3.fromWei(App.tokenPrice, "ether");
    id("token-sold").innerText = App.tokensSold;
    id("progress-bar").style = `width: ${
      (App.tokensSold / App.tokensAvailable) * 100
    }%`;
    id("balance").innerText = App.balance.toNumber();
    id(
      "avatar"
    ).src = `https://avatars.dicebear.com/api/bottts/${App.account}.svg`;

    App.loading = false;
    showLoading(false);
  },

  listenForEvents: async () => {
    let contract = await App.contracts.TokenSale.deployed();
    contract
      .Sell(
        {},
        {
          fromblock: 0,
          toblock: "latest",
        }
      )
      .watch((err, evnt) => {
        console.log("event triggered", evnt);
        App.render();
        showLoading(false);
      });
  },

  // before buying first we need to transfer tokens to tokensale contract
  buyTokens: async () => {
    showLoading(true);
    try {
      let numberOfTokens = Number(id("numberOfToken").value);
      let contract = await App.contracts.TokenSale.deployed();
      let res = await contract.buyTokens(numberOfTokens, {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
        gas: 500000,
      });
      console.log("Tokens bought...");
      id("form").reset();
    } catch (err) {
      console.log(err);
      showLoading(false);
    }
  },
};

window.addEventListener("load", () => {
  id("content").style.display = "none";
  App.init();
});
