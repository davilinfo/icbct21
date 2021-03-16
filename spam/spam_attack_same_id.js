const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:5011/ws';
const Api = require('./api.js');
const { exception } = require('console');
const accounts = { 
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

/*
{
  address: 'lskg6dncy3xgndwudbdm6c8g5fedtho3xgkcann7w',
  binaryAddress: 'fab471c501f9f57868da2a86ffafd6d4fac407f4',
  passphrase: 'oval amazing fork desert fault question west photo yard seed oval design',
  publicKey: '8d0460099f46c6116034043a86d69c236fa9c4a72140f9d5ca6f98c74ce6e292',
  privateKey: '6c5f6b8d69b9e62d859be22abf1374947d92719d9710780f2b3638a1e86127c08d0460099f46c6116034043a86d69c236fa9c4a72140f9d5ca6f98c74ce6e292'
}
{
  transactionId: 'cde12cf35ed0b3365c71cc434847c531ebe762478d9c0004683effa29e5e6e42'
}
*/

var accountFee = 0.01;

const api = new Api();

const getAccountNonce = async(address) => {
    console.log(address);

    const nonce = await api.getAccountNonce(address);
        return Number(nonce);
}

const createTransaction = async () => {
    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
    const nonce = parseInt(accountNonce);
    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address('lskg6dncy3xgndwudbdm6c8g5fedtho3xgkcann7w');
    var tx = await client.transaction.create({
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows(accountFee.toString())),
        nonce: BigInt(nonce),
        asset: {
            amount: BigInt(300000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    return tx;
}

const postResult = async() => {    
    const newTx = await createTransaction();            
                
    setInterval(async function(){
        const client = await api.getClient();
        const response = await client.transaction.send(newTx); 
        console.log(response);
    }, 500);            
}


postResult();
