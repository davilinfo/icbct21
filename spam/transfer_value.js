const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:5011/ws';
const Api = require('./api.js');
const { exception } = require('console');
const accounts = { 
    "genesis": {
      "passphrase": "patch gentle time fix suit silk jump monkey original buyer noise order"
    }
};

const api = new Api();

const createTransaction = async () => {
    const client = await api.getClient();    
    const address = cryptography.getAddressFromBase32Address('lsk539sfkahe9gdptcn3agn6bjmfw7ozo6dcnpnax');
    const tx = await client.transaction.create({ 
        moduleID: 2,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows('0.01')),
        asset: {
            amount: BigInt(5000000),
            recipientAddress: address,
            data: 'ok',
        },
    }, accounts.genesis.passphrase);

    return tx;
}

const postResult = async() => {    
    const newTx = await createTransaction();            
                
    //setInterval(async function(){
        const client = await api.getClient();
        const response = await client.transaction.send(newTx); 
        console.log(response);
    //}, 500);            
}


postResult();