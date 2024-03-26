const mongoose = require('mongoose')


const Token = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    token:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Token",Token)