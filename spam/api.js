const { createWSClient } = require('@liskhq/lisk-api-client');
const { codec } = require ('lisk-sdk');

class Api{

    static clientCache = null;
    async getClient () {
        if (!Api.clientCache) {
            Api.clientCache = await createWSClient('ws://localhost:5011/ws');
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

    async getAccountNonce (address) {
        const account = await getAccount(address);
        const sequence = account.sequence;
        return Number(sequence.nonce);
    };

    async useClient () {
        const client = await this.getClient();
        const { blockAtHeight123 }= await client.invoke('app:getBlockByHeight', { height:123 });
        client.subscribe('app:block:new', ( data ) => {
        console.log(data);
        });
    };
}

module.exports = Api;