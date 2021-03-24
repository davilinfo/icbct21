const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');

const Api = require('./api.js');
const accounts = {
    "genesis": {
      "passphrase": "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"
    }
};

const api = new Api();

const getTransaction = async(transactionId) => {

    const transaction = await api.getTransactionByid(transactionId);
        console.log(transaction);
}

const getNodeinfo = async() => {
    const nodeInfo = await api.getNodeInfo();
    console.log(nodeInfo);
}

const getAccount = async(address) => {
    const account = await api.getAccount(address);
    console.log(account); 
}

const getBlock = async(height) => {
    const block = await api.getBlockByHeight(height);
    console.log(block);
}

const preResult = async() => {    
    //await getTransaction('8cae00477eef38a9397686d22dcbe0add46ae22f34139f9f51cc085fb07ded3e');

    //await getnodeInfo();

    await getBlock(109090);

    const address = cryptography.getAddressFromBase32Address('lskg6dncy3xgndwudbdm6c8g5fedtho3xgkcann7w');
    await getAccount(address);

    const addressSidechain = cryptography.getAddressFromBase32Address('lsk3z33t62zbfsaq9mwa2bwfd2befeymrrhsdbhdc');
    await getAccount(addressSidechain);
}

preResult();
