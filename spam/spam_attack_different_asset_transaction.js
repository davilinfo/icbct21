const { cryptography, transactions } = require('@liskhq/lisk-client');
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const accounts = {
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();

const schema = {
    $id: 'lisk/food/transaction',
    type: 'object',
    required: ["name", "description", "foodType", "price", "deliveryAddress", "phone",
        "username", "observation", "clientData", "clientNonce"],
    properties: {
        name: {
            dataType: 'string',
            fieldNumber: 1
        },
        description: {
            dataType: 'string',
            fieldNumber: 2
        },
        foodType: {
            dataType: 'uint32',
            fieldNumber: 3
        },
        price:{
            dataType: 'uint64',
            fieldNumber: 4
        },
        deliveryAddress: {
            dataType: 'string',
            fieldNumber: 5
        },
        phone: {
            dataType: 'string',
            fieldNumber: 6
        },
        username: {
            dataType: 'string',
            fieldNumber: 7
        },
        observation: {
            dataType: 'string',
            fieldNumber: 8
        },
        clientData: {
            dataType: 'string',
            fieldNumber: 9
        },
        clientNonce: {
            dataType: 'string',
            fieldNumber: 10
        },
        recipientAddress: {
            dataType: "bytes",
            fieldNumber: 11
        }
    }
};

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
            amount: BigInt(700000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    console.log(await client.transaction.send(tx));

    return newCredential;
}

const createTransaction = async (credential, transactionFee, nonce) => {
    const address = cryptography.getAddressFromPassphrase(accounts.genesis.passphrase);
    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));

    const senderPublicKey = cryptography.getAddressAndPublicKeyFromPassphrase(credential.passphrase).publicKey;

    var name= 'Ribs on the barbie';
    var description = 'delicious 10 ribs on the barbie';
    var deliveryAddress = 'address';
    var foodType = 4;
    var phone = '71997035287';
    var username = 'davi';
    var observation = 'none';

    var clientData = cryptography.encryptMessageWithPassphrase(
        name.concat(' ***Field*** ')
        .concat(description)
        .concat(' ***Field*** ')
        .concat(deliveryAddress)
        .concat(' ***Field*** ')
        .concat(foodType)
        .concat(' ***Field*** ')
        .concat(phone)
        .concat(' ***Field*** ')
        .concat(username)
        .concat(' ***Field*** ')
        .concat(observation),
        accounts.genesis.passphrase,
        senderPublicKey);

    const tx = await transactions.signTransaction(
        schema,
        {
            moduleID: 1000,
            assetID: 1040,
            nonce: BigInt(nonce),
            fee: BigInt(transactions.convertLSKToBeddows(transactionFee.toString())),
            senderPublicKey: senderPublicKey,
            asset: {
                name: name,
                description: description,
                foodType: foodType,
                price: BigInt(transactions.convertLSKToBeddows('1')),
                deliveryAddress: deliveryAddress,
                phone: phone,
                username: username,
                observation: observation,
                clientData: clientData.encryptedMessage,
                clientNonce: clientData.nonce,
                recipientAddress: address
            },
        },
        Buffer.from('abb8df9b2a7a09bde37c3d3536e60dcc2102e3ef2bd656fd6b82104ca2871dfd', "hex"),
        credential.passphrase);

    return tx;
}


var listCredentials = [];
var count = 64;

const preResult = async() => {
    while (count > 0) {
        const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
        console.log('account nonce:'.concat(accountNonce));
        count--;
        const nonce = parseInt(accountNonce) + count;
        console.log('transaction nonce:'.concat(nonce));
        var credential = await createAccount(nonce);
        listCredentials.push(credential);
        accountFee = accountFee + 0.01;
        accountFee = parseFloat(accountFee.toPrecision(2));
        console.log(accountFee);

    }
    console.log("concluded accounts preparation");
    console.log("preparing to spam transactions");

    var objTimeout = setTimeout(async () => {
        waitToExecuteTransactions();
        }, 30000);

    objTimeout.ref();
}

const waitToExecuteTransactions = async () =>{
    var countTransactions = 0;
    var countAccounts = 0;
    console.log("accounts: ".concat(listCredentials.length));
    while (listCredentials.length-1 > 0){
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
