const { createWSClient } = require('@liskhq/lisk-api-client');
const { codec } = require ('lisk-sdk');
const RPC_ENDPOINT = 'ws://localhost:5011/ws';

class Api{

    static clientCache = null;
    async getClient () {
        if (!Api.clientCache) {
            Api.clientCache = await createWSClient(RPC_ENDPOINT);
        }
        return Api.clientCache;
    };

    async getAccount (
        address,
    ) {
        const client = await this.getClient();
        const schema = await client.invoke('app:getSchema');
        const account = await client.invoke('app:getAccount', {
            address,
        });

        return codec.decodeJSON(schema.account, Buffer.from(account, 'hex'));
    };

    async getTransactionByid(transactionId){
        const client = await this.getClient();
        const schema = await client.invoke('app:getSchema');
        const transaction = await client.invoke('app:getTransactionByID', {id: transactionId});

        return codec.decodeJSON(schema.transaction, Buffer.from(transaction, 'hex'));
    }
    
    async getFoodAssetTransactionByid(transactionId){        
        const client = await this.getClient();        
        
        return client.transaction.get(Buffer.from(transactionId, 'hex'));
    }

    async getBlockByHeight(height){
        const client = await this.getClient();
        const schema = await client.invoke('app:getSchema');
        const block = await client.invoke('app:getBlockByHeight', {height: height});
        
        return codec.decodeJSON(schema.block, Buffer.from(block, 'hex'));
    }

    async getAccountNonce (address) {
        const account = await this.getAccount(address);
        const sequence = account.sequence;
        return Number(sequence.nonce);
    };

    async getNodeInfo(){
        const client = await this.getClient();
        const schema = await client.invoke('app:getSchema');
        console.log(schema);

        const nodeInfo = await client.invoke('app:getNodeInfo', {});

        return nodeInfo;
    }

    async useClient () {
        const client = await this.getClient();
        const { blockAtHeight123 }= await client.invoke('app:getBlockByHeight', { height:123 });
        client.subscribe('app:block:new', ( data ) => {
        console.log(data);
        });
    };
}

module.exports = Api;
