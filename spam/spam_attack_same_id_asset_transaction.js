const { cryptography, transactions } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:5011/ws';
const Api = require('./api.js');
const { exception } = require('console');
const accounts = { 
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();

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
        }
    }
};

const createTransaction = async () => {                   
    const address = cryptography.getAddressFromBase32Address('lsk539sfkahe9gdptcn3agn6bjmfw7ozo6dcnpnax');
    const senderPublicKey = cryptography.getAddressAndPublicKeyFromPassphrase(accounts.genesis.passphrase).publicKey;

    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));

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

const postResult = async() => {    
    const newTx = await createTransaction();           
    
    console.log('transaction: '.concat(newTx));
                
    setInterval(async function(){
        const client = await api.getClient();
        const response = await client.transaction.send(newTx); 
        console.log(response);
    }, 500);            
}


postResult();