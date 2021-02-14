const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:5010/ws';
const { exception } = require('console');
const accounts = { 
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

let clientCache;

export const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
    }
    return clientCache;
};

const postResult = async(tx) => {
    const address = cryptography.getAddressFromBase32Address('5a1bbf533db37fa24c67467e751b85f5dcc0315a');
    const tx = await client.transaction.create({ 
        moduleID: 1000,
        assetID: 0,
        fee: BigInt(transactions.convertLSKToBeddows('0.01')),
        asset: {
            amount: BigInt(0),
            recipientAddress: address,
            data: '',
        },
    }, accounts.genesis.passphrase);
    
    const response = await client.transaction.send(tx); 
    console.log(response);
}

setInterval(function(){
    postResult(tx);
}, 70);