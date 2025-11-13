const express = require('express');
const router = express.Router();
const Person = require('../models/Person')

router.post('/',async (req, res)=>{
    try{
        const data = req.body

        const newPerson = new Person(data)

        const response = await newPerson.save()
        console.log("data saved")
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/', async (req, res)=>{
    try {
        const data = await Person.find()
        console.log("data fetched")
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/:workType', async (req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType =='waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(404).json({error:'Invalid Work type'})
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const personID = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personID, updatedPersonData,
            {
                new: true,
                runValidators: true
            }
        )
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log("Updated successully")
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const personID = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personID)
        if(!deletedPerson){
            res.status(404).json("Person not found")
        }
        console.log("Deleted")
        res.status(200).json("Deletion successful")
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router