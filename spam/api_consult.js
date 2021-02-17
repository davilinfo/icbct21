const { apiClient, cryptography, transactions } = require('@liskhq/lisk-client');

const Api = require('./api.js');
const Account = require('../accounts/CreateAccount');
const { exception } = require('console');
const { exit } = require('process');
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

const preResult = async() => {

    //await getTransaction('6a5085f1388565d27dcccb49d488dda69eed2b315adcd02dae8056f900846ef8');
    //await getTransaction('52c0ab906851d15017a36054ab7c379451a17dcac60bd07977abede76cdcc4ff');
    await getTransaction('198fe7bfbcffefd65c565a13173b1e64868eb90dc8122df24852e633dfa21a08');
    await getTransaction('8cae00477eef38a9397686d22dcbe0add46ae22f34139f9f51cc085fb07ded3e');
}

preResult();
