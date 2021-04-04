const { cryptography, transactions } = require('@liskhq/lisk-client');
const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const FoodAsset = require('../transactions/FoodAsset');
const accounts = {
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();
var accountFee = 0.01;

const initializeSidechainOwnerAccount = async(nonce) => {
    const client = await api.getClient();
    const address = cryptography.getAddressFromBase32Address('lsk3z33t62zbfsaq9mwa2bwfd2befeymrrhsdbhdc');

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

const schema = new FoodAsset().schema;

const createTransaction = async (address, recipientPublicKey) => {    
    const accountNonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));

    const senderPublicKey = cryptography.getAddressAndPublicKeyFromPassphrase(accounts.genesis.passphrase).publicKey;        

    var name= 'Ribs on the barbie';
    var description = 'delicious 10 ribs on the barbie';
    var deliveryAddress = 'address';
    var foodType = 4;
    var phone = '71997035287';
    var username = 'davi';
    var observation = 'none';

    var restaurantData = cryptography.encryptMessageWithPassphrase(
        name.concat(' ***Field*** ')        
        .concat(deliveryAddress)
        .concat(' ***Field*** ')        
        .concat(phone)
        .concat(' ***Field*** ')
        .concat(username),
        accounts.genesis.passphrase,
        recipientPublicKey);

    var clientData = cryptography.encryptMessageWithPassphrase(
        name.concat(' ***Field*** ')        
        .concat(deliveryAddress)        
        .concat(' ***Field*** ')
        .concat(phone)
        .concat(' ***Field*** ')
        .concat(username),
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
                name: name,
                description: description,
                foodType: foodType,
                price: BigInt(transactions.convertLSKToBeddows('50')),                
                observation: observation,
                restaurantData: restaurantData.encryptedMessage,
                restaurantNonce: restaurantData.nonce,
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
    
    var ref = setInterval(async function(){        
        clearInterval(ref);
        const nonceAccount = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
        await initializeSidechainOwnerAccount(nonceAccount);
    }, 10000);

    const nonce = await getAccountNonce(cryptography.getAddressFromPassphrase(accounts.genesis.passphrase));
    var credential = await createAccount(nonce);    

    const address = cryptography.getAddressFromBase32Address(credential.address);
    var objTimeout = setTimeout(async () => {
        const newTx = await createTransaction(address, credential.publicKey);
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
