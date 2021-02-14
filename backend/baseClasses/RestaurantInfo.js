import { cryptography, transactions } from '@liskhq/lisk-client';
const restaurantPassphrase = "mutual dilemma intact multiply carbon meat busy front subject siren major humor";
const restaurantAddress = '5a1bbf533db37fa24c67467e751b85f5dcc0315a';

/*
{
  address: 'lsk539sfkahe9gdptcn3agn6bjmfw7ozo6dcnpnax',
  binaryAddress: '5a1bbf533db37fa24c67467e751b85f5dcc0315a',
  passphrase: 'mutual dilemma intact multiply carbon meat busy front subject siren major humor',
  publicKey: 'c098f8e5199fa160e524660d41ce230efd3a0cd3bc6d4fd9315c71159d94cfeb',
  privateKey: '2a39cac99f697eb6dc404234c633229337814802b85835f63fa140b93986bb46c098f8e5199fa160e524660d41ce230efd3a0cd3bc6d4fd9315c71159d94cfeb'  
}
*/

class RestaurantInfo {

    static getCryptographedMessage(message){      
          
        var restaurantClientData = cryptography.encryptMessageWithPassphrase(
            message, restaurantPassphrase, cryptography.getAddressAndPublicKeyFromPassphrase(restaurantPassphrase).publicKey
        );

        return restaurantClientData.encryptedMessage .concat("****").concat(restaurantClientData.nonce);
    }

    static getRestaurantAddress(){
        return restaurantAddress;
    }

    static getRestaurantPassphrase(){
        return restaurantPassphrase;
    }

    static getRestaurantPublicKey(){
        return cryptography.getAddressAndPublicKeyFromPassphrase(restaurantPassphrase).publicKey;
    }    
}

module.exports = RestaurantInfo;