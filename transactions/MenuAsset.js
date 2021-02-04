const {
    BaseAsset,
    codec,    
} = require('lisk-sdk');

const MenuAssetId = 1060;

class MenuAsset extends BaseAsset {
    name = "MenuAsset";
    id = MenuAssetId;
    schema = {
        $id: 'lisk/menu/transaction',
        type: 'object',
        required: ["items"],
        properties: {
            items: {
                dataType: 'array',
                fieldNumber: 1
            },
        }
    }

    get sidechainAddress () {
        return "6181773985994883123L";
    }

    static get TYPE() {
        return MenuAssetId;
    }

    static get FEE () {
		return `100000000`;
    };        

    validate({asset}){
        const errors = [];                                                    

        if (!this.asset.items){
            throw new Error(
                'Restaurant menu should include food and/or beverages. Please include at least some item: "asset.items"');            
        }

        for (var index=0; index < this.asset.items.length; index ++){

            if (!this.asset.items[index].name || typeof this.asset.items[index].name !== 'string' || this.asset.items[index].length > 200){
                throw  new Error(
                        'Invalid "name" defined on transaction "asset.items[index].name . Should be included a string value no longer than 200 characters"'                        
                    );                
            }
    
            if (!this.asset.items[index].description || typeof this.asset.items[index].description !== 'string' || this.asset.items[index].description.length > 2000){
                throw new Error(
                        'Invalid "description" defined on transaction "asset.items[index].description. Should be included a string value no longer than 2000 characters"'
                );
            }
    
            if (!this.asset.items[index].price || this.asset.items[index].price < 0 ){
                throw new Error(
                        'Invalid "price" defined on transaction "asset.items[index].price" . A value equal or bigger than 0'
                    );                
            }
    
            if (!this.asset.items[index].discount || this.asset.items[index].discount < 0 ){
                throw new Error(
                        'Invalid "asset.items[index].discount" defined on transaction . A value equal or bigger than 0'                    
                );
            }
    
            if (!this.asset.items[index].type){
                throw new Error(
                        'Invalid "asset.items[index].type" defined on transaction . A number bigger than 0'
                );
            }

            if (!this.asset.items[index].category){
                throw new TransactionError(
                        'Invalid "asset.items[index].category" defined on transaction . A number bigger than 0'
                );
            }

            if (!this.asset.items[index].img){
                throw new Error(
                        'Invalid "asset.items[index].img" defined on transaction . A string http address of the food image'                
                );
            }

            

        }                
    }

    async apply({ asset, stateStore, reducerHandler, transaction }) {                    
        if (transaction.senderAddress !== transaction.recipientAddress){
            throw new TransactionError(
                    'Invalid "recipient" defined on transaction. Only the restaurant can define its own food menu.'                
            );
        }

        const restaurantAddress = transaction.senderAddress;
        const restaurantAccount = stateStore.account.get(transaction.senderAddress);        

        const updatedRestaurant = {
            ...restaurantAccount,
            balance: restaurantAccountBalanceDeducted.toString()
        }
        stateStore.account.set(restaurantAddress, restaurantAccount);
        reducerHandler.invoke("token:debit", {
            address: restaurantAddress,
            amount: MenuAsset.FEE()
        });

        const sidechainAddress = this.sidechainAddress();
        const sidechainOwnerAccount = stateStore.account.get(sidechainAddress);                
        
        stateStore.account.set(sidechainAddress, sidechainOwnerAccount);
        reducerHandler.invoke("token:credit", {
            address: sidechainAddress,
            amount: MenuAsset.FEE()
        });        
    }    
}

module.exports = MenuAsset;