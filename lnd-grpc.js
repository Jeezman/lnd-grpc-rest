const { lightning } = require('./lightning');

const getInfo = async () => {
  lightning.getInfo({}, function (err, response) {
    if (err) console.log(err);
    if (response) {
      console.log(response);
      return response.identity_pubkey;
    }
  });
};

const listChannel = () => {
  lightning.listChannels({}, function (err, response) {
    if (err) console.log(err);
    if (response) {
      console.log(response);
      return response.identity_pubkey;
    }
  });
};

const getNewAddress = () => {
    let request = {
        type: 0 // p2wkh
    }
  lightning.newAddress(request, function(err, response) {
    if (err) console.log(err);
    if (response) {
      console.log(response);
    }
  })
};

const getWalletBalance = () => {
  lightning.walletBalance({}, function(err, response) {
    if (err) console.log(err);
    if (response) {
      console.log(response);
    }
  });
};
