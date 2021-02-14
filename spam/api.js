const { createWSClient } = require('@liskhq/lisk-api-client');

class Api{

    static clientCache = null;
    async getClient () {
        if (!Api.clientCache) {
            Api.clientCache = await createWSClient('ws://localhost:5011/ws');
        }
        return Api.clientCache;
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