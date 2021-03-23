const {
    BaseAsset,
    codec,    
} = require('lisk-sdk');

const RefundAssetId = 1090;

class RefundAsset extends BaseAsset {
    name = "RefundAsset";
    id = RefundAssetId;
    schema = {
        $id: 'lisk/refund/transaction',
        type: 'object',
        required: ["transactionId", "amount"],
        properties: {
            transactionId: {
                dataType: 'string',
                fieldNumber: 1
            },
            "amount": {
                dataType: "uint32",
                fieldNumber: 2
            }
        }
    }

    static get TYPE() {
        return RefundAssetId;
    }    

    validateAsset({asset}){                            
        if (!asset.amount || asset.amount <= 0 || 100000000000 < asset.amount ){
            throw new Error(
                    'Invalid "value" defined on transaction. A value bigger than 0 and smaller than 1000.'                
            );
        }                 

        if (!asset.transactionId){            
            throw new Error(
                    'Invalid "transactionId" defined on transaction. A string value bigger than 0.'                
            );
        }        
    }

    async apply({asset, stateStore, reducerHandler, transaction}){           
        const restaurantAddress = transaction.senderAddress;
        const restaurantAccount = await store.account.get(transaction.senderAddress);                

        await stateStore.account.set(restaurantAddress, restaurantAccount);

        await reducerHandler.invoke("token:debit", {
            address: restaurantAddress,
            amount: asset.amount,
          });         

        const clientAddress = asset.recipientAddress;
        const clientAccount = await stateStore.account.get(clientAddress);        
        
        await stateStore.account.set(clientAddress, clientAccount);
        
        await reducerHandler.invoke("token:credit", {
            address: clientAddress,
            amount: asset.amount,
          });
    }    
}

module.exports = RefundAsset;