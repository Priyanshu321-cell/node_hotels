const express = require('express')
const router = express.Router()
const menuItem = require('../models/Menu');
const MenuItem = require('../models/Menu');

router.post('/',async (req, res)=>{
    try {
        const data = req.body;
        const newmenuItem = new menuItem(data)
        const response = await newmenuItem.save()
        console.log('data saved')
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/',async (req, res)=>{
    try {
        const data = await menuItem.find()
        console.log('data fetched')
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/:taste',async (req, res)=>{
    try {
        const data = req.params.taste;
        if(data == 'Spicy' || data == 'Sweet' || data == 'Tangy'){
            const response = await MenuItem.find({taste:data})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(404).json({error : "Not available"})
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({error: 'Internal Server Error'})
    }
})


module.exports = router