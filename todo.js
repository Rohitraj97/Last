const express = require("express")

const router = express.Router()
const authenticate = require("../middleware/authenticate")

const todo = require("../model/todo.model")

 router.get("",authenticate,async (req,res) => {
     try{
         const todo = await todo.find()
         return res.status(200).send(todo)
     }
     catch(err)
     {
         return res.status(400).send({message:err.message})
     }
 })

 
 router.get("/:id",authenticate,async (req,res) => {
    try{
        const todo = await todo.findById(req.params.id).lean().exec()
        return res.status(200).send(todo)
    }
    catch(err)
    {
        return res.status(500).send({message:err.message})
    }
})


 
 router.post("",authenticate,async (req,res) => {
    try{
        const todo = await todo.create(req.body)
        return res.status(200).send(todo)
    }
    catch(err)
    {
        return res.status(400).send({message:err.message})
    }
})


router.patch("/:id",authenticate,async (req,res) => {
    try{
        const todo = await todo.findByIdUpdate(req.params.id,req.body,{

        })
        .lean()
        .exec()
        return res.status(200).send(todo)
    }
    catch(err)
    {
        return res.status(401).send({message:err.message})
    }
})


router.delete("/:id",authenticate,async (req,res) => {
    try{
        const todo = await todo.findByIdAndDelete(req.params.id).lean().exec()

        
        .lean()
        .exec()
        return res.status(200).send(todo)
    }
    catch(err)
    {
        return res.status(401).send({message:err.message})
    }
})



 module.exports = router