const { createWSClient } = require('@liskhq/lisk-api-client');
let clientCache;
export const getClient = async () => {
    if (!clientCache) {
        clientCache = await createWSClient('ws://localhost:8080/ws');
    }
    return clientCache;
};
export const useClient = async () => {
    const client = await getClient();
    const { blockAtHeight123 }= await client.invoke('app:getBlockByHeight', { height:123 });
    client.subscribe('app:block:new', ( data ) => {
      console.log(data);
    });
};