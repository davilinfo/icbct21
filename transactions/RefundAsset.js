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
                dataType: "number",
                fieldNumber: 2
            }
        }
    }

    constructor(){}

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
        const restaurantAccount = store.account.get(transaction.senderAddress);                

        stateStore.account.set(restaurantAddress, restaurantAccount);

        await reducerHandler.invoke("token:debit", {
            address: restaurantAddress,
            amount: asset.amount,
          });         

        const clientAddress = transaction.recipientAddress;
        const clientAccount = stateStore.account.get(transaction.recipientAddress);        
        
        stateStore.account.set(clientAddress, clientAccount);
        
        await reducerHandler.invoke("token:credit", {
            address: clientAddress,
            amount: asset.amount,
          });
    }    
}

module.exports = RefundAsset;