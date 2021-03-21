const { cryptography, transactions } = require('@liskhq/lisk-client');
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
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

const createAccount = async (nonce) => {
    const account = new Account();
    var newCredential = await account.newCredentials();
    console.log(newCredential);
    const client = await api.getClient();
    const address = cryptography.getAddressFromBase32Address(newCredential.address);

    var tx = await client.transaction.create({
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows(accountFee.toString())),
        nonce: BigInt(nonce),
        asset: {
            amount: BigInt(100000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    console.log(await client.transaction.send(tx));

    return newCredential;
}

const getAccountNonce = async(address) => {
    console.log(address);

    const nonce = await api.getAccountNonce(address);
        return Number(nonce);
}

const createTransaction = async (address) => {    
    const nonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
    const client = await api.getClient();    

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

const getTransaction = async(transactionId) => {

    const transaction = await api.getTransactionByid(transactionId);
    console.log(transaction);
}

const postResult = async() => {
    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
    var credential = await createAccount(accountNonce);
    const address = cryptography.getAddressFromBase32Address(credential.address);
    var objTimeout = setTimeout(async () => {
        const newTx = await createTransaction(address);  
        var response;
        var interval = setInterval(async function(){
            const client = await api.getClient();

            try{
                response = await client.transaction.send(newTx);
                console.log(response);
            }catch (message){
                console.log('Error: The current transaction nonce is lower than account nonce! This way is not possible to perform such spam attack!');
                                
                await getTransaction(response.transactionId.toString());                
                
            }            

        }, 500);

        }, 20000);

    objTimeout.ref();      

    
}


postResult();
