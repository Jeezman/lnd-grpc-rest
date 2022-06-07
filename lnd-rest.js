const { lnBaseURL, macaroon } = require("./lightning");
const request = require('request-promise')

const getInfo = async () => {
    let options = {
      url: `${lnBaseURL}/getinfo`,
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
    };
    const response = await request.get(options).then(data => {
        return data;
    })
    console.log(response)
  };

  const listChannels = async () => {
    let options = {
      url: `${lnBaseURL}/channels`,
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
    };
  
    const response = await request.get(options).then(data => {
        return data;
    })
    console.log(response)
  };

  const listPayments = async () => {
    let options = {
      url: `${lnBaseURL}/payments`,
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': macaroon,
      },
    };
  
    const response = await request.get(options).then(data => {
        return data;
    })
    console.log(response)
  };