const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://c4:c4123@cluster0.ycmjk.mongodb.net/c4?retryWrites=true&w=majority");
};