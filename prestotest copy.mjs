import bsv from 'bsv';
//import {Presto, embed} from 'paypresto.js'
import PrestoPkg from 'paypresto.js'
//import {bsv} from bsvPkg;
//import {Presto} from 'paypresto.js'

let privateKey = bsv.PrivKey.fromRandom();
let publicKey = bsv.PubKey.fromPrivKey(privateKey);
let address = bsv.Address.fromPubKey(publicKey);

console.log('PRIVATE KEY: ', privateKey.toWif());
console.log('PUBLIC KEY:  ', publicKey.toHex());
console.log('To ADDRESS:  ', address.toString());


const Presto = PrestoPkg.Presto;
//const {Presto} = PrestoPkg;
const payment = Presto.create({
  // Provide WIF key, or bsv2 PrivKey or KeyPair instance
  key: privateKey.toWIF(),

  // Short human readable description of payment
  description: 'My Paypresto test payment',

  // An array of outputs, can include simple p2pkh outputs,
  // custom scripts or embedded data
  outputs: [
    { to: '1PqRhzVabqJqnvjNy8nb9CD3amT8NkRmJH', satoshis: 5000 },
    { script: '76a91412ab8dc588ca9d5787dde7eb29569da63c3a238c88ac', satoshis: 5000 },
    { data: [Buffer.from("Hello world!")] }
  ]
});

payment
  .on('invoice', invoice => console.log("Invoiced...") /* fired when invoice created */)
  .on('funded', payment => payment.pushTx())
  .on('success', txid => console.log("*success", txid)/* fired when tx successfully sent */)
  .on('error', err => console.log("*Error ", err)/* fired when error is encountered */)
  