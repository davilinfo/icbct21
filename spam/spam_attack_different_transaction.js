const { cryptography, transactions } = require('@liskhq/lisk-client');
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const { exception } = require('console');
const { exit } = require('process');
const accounts = {
    "genesis": {
      "passphrase": "elevator favorite unfair layer resist address palm just current inquiry style garage"
    }
};

const api = new Api();

var accountFee = 0.01;

const getAccountNonce = async(address) => {
    console.log(address);

    const nonce = await api.getAccountNonce(address);
        return Number(nonce);
}

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
            amount: BigInt(950000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    console.log(await client.transaction.send(tx));

    return newCredential;
}

const createTransaction = async (credential, transactionFee, nonce) => {
    const client = await api.getClient();
    const address = cryptography.getAddressFromPassphrase(accounts.genesis.passphrase);
    const tx = await client.transaction.create({
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows(transactionFee.toString())),
        nonce: BigInt(nonce),
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
var totalAccounts = 64;

const preResult = async() => {
    while (count < totalAccounts) {
        const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
        console.log('account nonce:'.concat(accountNonce));
        const nonce = parseInt(accountNonce) + count;
        console.log('transaction nonce:'.concat(nonce));
        console.log(accountFee);
        var credential = await createAccount(nonce);
        listCredentials.push(credential);
        accountFee = accountFee + 0.01;
        accountFee = parseFloat(accountFee.toPrecision(2));
        count++;
    }
    console.log("concluded accounts preparation");
    console.log("preparing to spam transactions");

    var objTimeout = setTimeout(async () => {
        await waitToExecuteTransactions();
        }, 30000);

    objTimeout.ref();
}

const waitToExecuteTransactions = async () =>{
    var countTransactions = 0;
    var countAccounts = 0;
    console.log("accounts: ".concat(listCredentials.length));
    while (listCredentials.length-1 >= 0){
        transactionFee = 0.01;
        var actualCredential = listCredentials.pop();
        console.log(actualCredential);
        console.log("executed accounts:".concat(countAccounts));

        while (countTransactions < 64){
            try{

                const nonce = await getAccountNonce(cryptography.getAddressFromBase32Address(actualCredential.address)) + countTransactions;
            await postResult(actualCredential, transactionFee, nonce);
            countTransactions++;
            transactionFee = transactionFee + 0.01;
            transactionFee = parseFloat(transactionFee.toPrecision(2));
            console.log(transactionFee);
            }catch (e){
                console.log(e);
                exit(0);
            }
        }

        countTransactions = 0;
        countAccounts++;
    }
}

const postResult = async(credential, transactionFee, nonce) => {
    const client = await api.getClient();

    const newTx = await createTransaction(credential, transactionFee, nonce);
    const response = await client.transaction.send(newTx);
    console.log(response);
}

preResult();