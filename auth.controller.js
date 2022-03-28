const User = require("../model/user.model")

const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (user) =>{
    return jwt.sign({user}),process.env.SECRET_KEY
}
const register = async (req,res) => {
    try{
        let user = await User.findOne({email:req.body.email})

        if(user)
        {
            return res.status(400).send({messgae :"email already exist"})
        }
        user = await User.create(req.body)
        const token = generateToken(user)
        return res.status(200).send({message:err.message})
    }
    catch(err)
    {
        res.status(400).send({message:err.messgage})
    }
}

const login = async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(400).send({messgae :"Wrong email"})
        }

        const match= user.checkpassword({req,body,password})
        if(!match)
        {
            return res.status(400).send({message:"wrong email"})
        }
        const token = generateToken(user)
        return res.status(200).send({user,token})
    }
    catch(err)
    {
        res.status(400).send({message:err.messgage})
    }
}

module.exports={register,login}