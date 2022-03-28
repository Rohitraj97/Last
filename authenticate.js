require("dotenv").config()
const { reject } = require("bcrypt/promises")
const jwt = require("jsonwebtoken")
const verifytoken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,process.env.SECRET_KEY,
       (err,decoded) => {
           if(err)
           return reject(err)
           return resolve(decoded)
       })
       
        
        })
    }   
    


const authenticate = async (req,res,next) =>{
    if(!req.headers.authorisation)
    return res.status(400).send({message:"Authorisation token incorrect"})

    if(!req.headers.authorisation.startwith("Bearer "))
    return res.status(400).send({message:"Authorisation token incorrect"})

    const token = req.headers.authorisation.trim().split(" ")[1]
    let decoded;
    try{
        decoded = await verifytoken (token)
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).send({message:"authorization token error"})
    }
    console.log(decoded)
    req.UserID = decoded.User.UserID
    return next()
}
module.exports =authenticate