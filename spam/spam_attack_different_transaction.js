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

var accountFee = 0.01;

const createAccount = async () => {
    const account = new Account();
    var newCredential = await account.newCredentials();
    console.log(newCredential);

    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address(newCredential.address);
    var tx = await client.transaction.create({ 
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows(accountFee.toString())),
        asset: {
            amount: BigInt(15000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    console.log(await client.transaction.send(tx)); 

    return newCredential;
}

const createTransaction = async (credential) => {
    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address('lsk539sfkahe9gdptcn3agn6bjmfw7ozo6dcnpnax');
    const tx = await client.transaction.create({ 
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows(transactionFee.toString())),
        asset: {
            amount: BigInt(0),
            recipientAddress: address,
            data: 'ok',
        },
    }, credential.passphrase);
    //console.log(tx);
    return tx;
}

var listCredentials = [];
var count = 0;

const preResult = async() => {            
    while (count < 99) {        
        var credential = await createAccount();
        listCredentials.push(credential);
        accountFee = accountFee + 0.01;
        accountFee = parseFloat(accountFee.toPrecision(2));
        console.log(accountFee);
        count ++;
    }
    console.log("concluded accounts preparation");    
    console.log("preparang to spam transactions");    

    var objTimeout = setTimeout(() => {            
        waitToExecuteTransactions();
        }, 500000);

    objTimeout.ref();
}

var transactionFee = 0.01;

const waitToExecuteTransactions = () =>{
    var countTransactions = 0;
    var countAccounts = 0;
    console.log("accounts: ".concat(countAccounts));    
    while (countAccounts < listCredentials.length -1){        
        var objTransactionTimeout = setTimeout(() => { 
            while (countTransactions < 50){
                postResult(listCredentials[countAccounts]);
                countTransactions++;
                transactionFee = transactionFee + 0.01;
                transactionFee = parseFloat(transactionFee.toPrecision(2));
                console.log(transactionFee);
            }
        }, 5000);
        objTransactionTimeout.ref();
        countTransactions = 0;
        countAccounts++;
    }
}

const postResult = async(credential) => {    
    const client = await api.getClient();            

    const newTx = await createTransaction(credential);
    const response = await client.transaction.send(newTx); 
    console.log(response);
}

preResult();
