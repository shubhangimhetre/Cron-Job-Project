const express=require('express')
const router=express.Router()
const serve1=require('../controllers/transaction')

router.get('/balance/:id',serve1.check_balance)

router.post('/send',serve1.send_eth)



module.exports=router