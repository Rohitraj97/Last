const express = require("express")
const connect = require("./configs/db")
const UserController = require("./controllers/user");
const todoController = require("./controllers/todo")

const {register,login} = require("./controllers/auth.controller")
const app = express()

app.use(express.json())

app.use("/users",UserController)
app.post("/register",register)
app.post("/login",login)

app.use("/todos",todoController)


app.listen(5000,async function (){
    try{
        await connect()
        console.log("listening on port 5000")
    }
    catch(err)
    {
        console.log(err.message)
    }
})
// module.exports = app