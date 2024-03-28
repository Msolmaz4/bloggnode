const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Blog"
    },
    comment:{
        type:String,

    }
},{timestamps:true})

module.exports = mongoose.model("Comment",CommentSchema)