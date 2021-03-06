const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const configLoader = require('./config/index');
const protoLoader = require('@grpc/proto-loader');

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const config = configLoader.getConfig();

const packageDefinition = protoLoader.loadSync(
  __dirname + '/protofile/lightning.proto',
  loaderOptions
);
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
const macaroon = fs
  .readFileSync(config.lightning.macaroon_path)
  .toString('hex');
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
const lndCert = fs.readFileSync(config.lightning.tls_path);
const sslCreds = grpc.credentials.createSsl(lndCert);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function (
  args,
  callback
) {
  let metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});
let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
let lightning = new lnrpc.Lightning(config.lightning.url, creds);
const lnBaseURL = config.lnd_rest.base_url;
module.exports = {
    lightning,
    lnBaseURL,
    macaroon
}
