const Web3 = require('web3');
const ethNetwork = 'https://ropsten.infura.io/v3/b658ddcbd16a4c0e8518f9db241e720a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
const private_key='e85e31619019887ebb815a0ae75fff409bd32f27cb622b74ceacea3e567dc07c';
const user1=require('../model/transaction_model.js')
const cron = require('node-cron');

exports.check_balance=(req,res)=>{
    const id=req.params.id
    web3.eth.getBalance(`${id}`, async (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let balance = web3.utils.fromWei(result, "ether");
        console.log(balance + " ETH");
        res.send(balance + " ETH")
    });
}


exports.send_eth=async(req,res)=>{
    cron.schedule('*/40 * * * *', () => {
        console.log("Task running...")
        const {addressFrom, addressTo,value }=req.body
        const deploy = async () => {
            // console.log(req.body.addressFrom)
            console.log(`Attempting to make transaction from ${addressFrom} to ${addressTo}`);
            const createTransaction = await web3.eth.accounts.signTransaction({
            from: addressFrom,
            to: addressTo,
            value: web3.utils.toWei(`${value}`, 'ether'),
            gas: 21000,
        },private_key)
        const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );
        console.log(`Transaction successful with hash: ${createReceipt.transactionHash}` );
        const user_data=new user1({"transaction_from":addressFrom,"transaction_to":addressTo, "transaction_value":value,"transaction_hash":createReceipt.transactionHash})
        const user= await user_data.save()
        console.log(`Transaction successful with hash: ${createReceipt.transactionHash}.. and ${user}`)
        // res.json({message: `Transaction successful with hash: ${createReceipt.transactionHash}`, data:user });
        };
        deploy();  
    });
}

