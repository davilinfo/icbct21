const { cryptography, transactions } = require('@liskhq/lisk-client');
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const accounts = {
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();
var accountFee = 0.01;

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

const createTransaction = async (address) => {    
    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));

    const senderPublicKey = cryptography.getAddressAndPublicKeyFromPassphrase(accounts.genesis.passphrase).publicKey;    

    var name= 'Ribs on the barbie';
    var description = 'delicious 10 ribs of the barbie';
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
            nonce: BigInt(accountNonce),
            fee: BigInt(transactions.convertLSKToBeddows('0.01')),
            senderPublicKey: senderPublicKey,
            asset: {
                name: 'Ribs on the barbie',
                description: 'delicious 10 ribs of the barbie',
                foodType: 4,
                price: BigInt(transactions.convertLSKToBeddows('50')),
                deliveryAddress: 'address',
                phone: '71997035287',
                username: 'davi',
                observation: 'none',
                clientData: clientData.encryptedMessage,
                clientNonce: clientData.nonce,
                recipientAddress: address
            },
        },
        Buffer.from('abb8df9b2a7a09bde37c3d3536e60dcc2102e3ef2bd656fd6b82104ca2871dfd', "hex"),
        accounts.genesis.passphrase);

    return tx;
}

const getTransaction = async(transactionId) => {

    const transaction = await api.getFoodAssetTransactionByid(transactionId);
    console.log(transaction);
}

const postResult = async() => {
    const nonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
    var credential = await createAccount(nonce);
    const address = cryptography.getAddressFromBase32Address(credential.address);
    var objTimeout = setTimeout(async () => {
        const newTx = await createTransaction(address);
        var response;
        setInterval(async function(){
            const client = await api.getClient();
            
            try{
                response = await client.transaction.send(newTx);
                console.log(response);
            }catch(message){
                console.log('Error: The current asset transaction nonce is lower than account nonce! This way is not possible to perform such spam attack!');                
                await getTransaction(response.transactionId);                            
            }            

        }, 500);

    }, 20000);

    objTimeout.ref();    
}


postResult();
