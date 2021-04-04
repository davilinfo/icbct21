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
        required: ["name", "description", "foodType", "price", "observation", "restaurantData", "restaurantNonce", "clientData", "clientNonce"],
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
            observation: {
                dataType: 'string',
                fieldNumber: 5
            },
            restaurantData: {
                dataType: 'string',
                fieldNumber: 6
            },
            restaurantNonce: {
                dataType: 'string',
                fieldNumber: 7
            },
            clientData: {
                dataType: 'string',
                fieldNumber: 8
            },
            clientNonce: {
                dataType: 'string',
                fieldNumber: 9
            },
            recipientAddress: {
                dataType: "bytes",
                fieldNumber: 10
            }
        }
    } 

    /*
    
{
  address: 'lsk3z33t62zbfsaq9mwa2bwfd2befeymrrhsdbhdc',
  binaryAddress: '401089ab0037b79ab4b7ce0d7f6b06b7ad12ca5d',
  passphrase: 'model dilemma peace excess buffalo weasel decide cradle setup tiger cabin disorder',
  publicKey: 'a862a83dbb2c07efb723fa2a96fe73917d90e0e85823e8801487bd3bca9b17f9',
  privateKey: '5f63a3ad49c3bd06fc8a0cc6c18e0a2255cf4dea8d338c2f372917bf47194cd7a862a83dbb2c07efb723fa2a96fe73917d90e0e85823e8801487bd3bca9b17f9'
}
    
    */

    get sidechainAddress () {
        const address = cryptography.getAddressFromBase32Address('lsk3z33t62zbfsaq9mwa2bwfd2befeymrrhsdbhdc');
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
        
        if (!asset.price || asset.price <= 0){
            throw new Error(
                    'Invalid "asset.price" defined on transaction: A value bigger than 0');
        }

        if (!asset.restaurantData || asset.restaurantData.length === 0){
            throw new Error(
                    'Invalid "restaurantData" defined on transaction:Not empty');
        }

        if (!asset.restaurantNonce || asset.restaurantNonce.length === 0){
            throw new Error(
                    'Invalid "restaurantNonce" defined on transaction: Not empty');
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