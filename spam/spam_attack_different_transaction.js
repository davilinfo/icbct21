const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:5011/ws';
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const { exception } = require('console');
const accounts = { 
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();

const createAccount = async () => {
    const account = new Account();
    var newCredential = await account.newCredentials();
    console.log(newCredential);

    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address(newCredential.address);
    var tx = await client.transaction.create({ 
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows('0.01')),
        asset: {
            amount: BigInt(5000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    console.log(await client.transaction.send(tx)); 

    return newCredential;
}

const createTransaction = async (credential) => {
    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address(credential.address);
    const tx = await client.transaction.create({ 
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows('0.01')),
        asset: {
            amount: BigInt(0),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    return tx;
}

var listCredentials = [];
var count = 0;

const preResult = async() => {            
    while (count < 200) {        
        var credential = await createAccount();
        listCredentials.push(credential);
        count ++;
    }
}

const postResult = async() => {    
    const client = await api.getClient(); 
    
    await preResult();    

    const newTx = await createTransaction(credential);
    const response = await client.transaction.send(newTx); 
    console.log(response);
}

preResult();

var countTransactions = 0;
var countAccounts = listCredentials.length-1;

while (countAccounts > 0){
    while (countTransactions < 50){
        postResult(listCredentials[countAccounts]);
        countTransactions++;
    }
    countTransactions = 0;
    countAccounts--;
}
