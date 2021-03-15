const {
    BaseAsset,
    codec,    
} = require('lisk-sdk');

const { cryptography } = require('@liskhq/lisk-client');

const FoodAssetId = 1040;

class FoodAsset extends BaseAsset {
    name = 'FoodAsset';
    id = FoodAssetId;
    schema = {
        $id: 'lisk/food/transaction',
        type: 'object',
        required: ["name", "description", "foodType", "price", "deliveryAddress", "phone", 
            "username", "observation", "clientData", "clientNonce"],
        properties: {
            name: {
                dataType: 'string',
                fieldNumber: 1
            },
            description: {
                dataType: 'string',
                fieldNumber: 2
            },
            foodType: {
                dataType: 'uint32',
                fieldNumber: 3
            },
            price:{
                dataType: 'uint64',
                fieldNumber: 4
            },
            deliveryAddress: {
                dataType: 'string',
                fieldNumber: 5
            },
            phone: {
                dataType: 'string',
                fieldNumber: 6
            },
            username: {
                dataType: 'string',
                fieldNumber: 7
            },
            observation: {
                dataType: 'string',
                fieldNumber: 8
            },
            clientData: {
                dataType: 'string',
                fieldNumber: 9
            },
            clientNonce: {
                dataType: 'string',
                fieldNumber: 10
            },
            recipientAddress: {
                dataType: "bytes",
                fieldNumber: 11
            }
        }
    } 

    get sidechainAddress () {
        const address = cryptography.getAddressFromBase32Address('lsk539sfkahe9gdptcn3agn6bjmfw7ozo6dcnpnax');
        return address;
    }

    get sidechainFee () {
        return BigInt('50000000');
    }

    static get TYPE() {
        return FoodAssetId;
    }      
    
    validate({asset}){
        const errors = [];                                            

        if (!asset.name || typeof asset.name !== 'string' || asset.name.length > 200){            
            throw new Error(
                    'Invalid "asset.name" defined on transaction:A string value no longer than 200 characters');            
        }

        if (!asset.description || typeof asset.description !== 'string' || asset.description.length > 1500){
            throw new Error(
                    'Invalid "asset.description" defined on transaction: A string value no longer than 1500 characters');
        }

        if (!asset.foodType || asset.foodType <= 0){
            throw new Error(
                    'Invalid "asset.foodType" defined on transaction: A value bigger than 0');
        }

        if (!asset.deliveryAddress){
            throw new Error(
                    'Invalid "asset.deliveryAddress" defined on transaction: A string value bigger than 0');
        }

        if (!asset.phone){
            throw new Error(
                    'Invalid "asset.phone" defined on transaction: A value bigger than 0');
        }

        if (!asset.username){
            throw new Error(
                    'Invalid "username" defined on transaction: A string value bigger than 0');
        }
        
        if (!asset.price || asset.price <= 0){
            throw new Error(
                    'Invalid "asset.price" defined on transaction: A value bigger than 0');
        }

        if (!asset.clientData || asset.clientData.length === 0){
            throw new Error(
                    'Invalid "clientData" defined on transaction:Not empty');
        }

        if (!asset.clientNonce || asset.clientNonce.length === 0){
            throw new Error(
                    'Invalid "clientNonce" defined on transaction: Not empty');
        }        
    }

    async apply({asset, stateStore, reducerHandler, transaction}){               
        const errors = [];
        
        // Get sender account details
        const senderAddress = transaction.senderAddress;
        const senderAccount = await stateStore.account.get(senderAddress);

        if (!senderAccount){           
            throw new Error(
                    'Invalid "sender", please verify your passphrase: Verify your passpahrase and address');            
        }        

        await stateStore.account.set(senderAddress, senderAccount);

        await reducerHandler.invoke("token:debit", {
            address: senderAddress,
            amount: asset.price,
          });    

        const restaurantAddress = asset.recipientAddress;
        const restaurantAccount = await stateStore.account.get(asset.recipientAddress);
        const restaurantPaymentSubSidechainFee = asset.price - this.sidechainFee;

        await reducerHandler.invoke("token:credit", {
            address: restaurantAddress,
            amount: restaurantPaymentSubSidechainFee,
        });

        await stateStore.account.set(restaurantAddress, restaurantAccount);

        const sidechainAccount = await stateStore.account.get(this.sidechainAddress);        
        await reducerHandler.invoke("token:credit", {
            address: this.sidechainAddress,
            amount: this.sidechainFee,
        });
        
        await stateStore.account.set(this.sidechainAddress, sidechainAccount);
                                
    }
    
}

module.exports = FoodAsset;