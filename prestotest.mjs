import bsv from 'bsv';
//import {Presto, embed} from 'paypresto.js'
//import {PrestoPkg} from 'paypresto.js'
//import {bsv} from bsvPkg;
//import {Presto} from 'paypresto.js'

let privateKey = bsv.PrivKey.fromRandom();
let publicKey = bsv.PubKey.fromPrivKey(privateKey);
let address = bsv.Address.fromPubKey(publicKey);

console.log('PRIVATE KEY: ', privateKey.toWif());
console.log('PUBLIC KEY:  ', publicKey.toHex());
console.log('To ADDRESS:  ', address.toString());