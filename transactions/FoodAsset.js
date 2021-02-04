const {
    BaseAsset,
    codec,    
} = require('lisk-sdk');

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
                dataType: 'number',
                fieldNumber: 3
            },
            price:{
                dataType: 'number',
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
            }
        }
    }

    get sidechainAddress () {
        return "6181773985994883123L";
    }

    get sidechainFee () {
        return '50000000';
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

        if (senderBalanceDeducted < 0){
            throw new Error(
                    'Not enough "balance" for the transaction: Need a balance at least equal than food price');
        }

        await stateStore.account.set(senderAddress, senderAccount);

        await reducerHandler.invoke("token:debit", {
            address: senderAddress,
            amount: asset.price,
          });    

        const restaurantAddress = transaction.recipientAddress;
        const restaurantAccount = stateStore.account.get(transaction.recipientAddress);
        const restaurantPaymentSubSidechainFee = asset.price - this.sidechainFee();

        await reducerHandler.invoke("token:credit", {
            address: restaurantAddress,
            amount: restaurantPaymentSubSidechainFee,
        });

        await stateStore.account.set(restaurantAddress, restaurantAccount);

        const sidechainAccount = stateStore.account.get(this.sidechainAddress());
        await reducerHandler.invoke("token:credit", {
            address: this.sidechainAddress(),
            amount: this.sidechainFee(),
        });
        
        await stateStore.account.set(this.sidechainAddress(), sidechainAccount);
                                
    }
    
}

module.exports = FoodAsset;