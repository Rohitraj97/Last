const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema (
    {
        firstName : {type:String,required : true},
        lastName  : {type:String,required : true ,default:optional},
        email     : {type:String,required : true},
        password  : {type:String,required : true},
    },
    {
        versionKey : false,
        timestamps : true
    }
)

UserSchema.pre("save",function(next){
    const hash = bcrypt.hashSync(this.password,5)
    this.password= hash
    return next()
})
UserSchema.methods.checkpassword= function(password)
{
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model("user",UserSchema)