const mongoose = require("mongoose")

// {
//     "username": "deneme",
//     "password": "123456",
//     "email": "admin1@gmail.com",
//     "firstname": "deneme",
 //     "isAdmin": false,
// }

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],

    },
    password:{
        type:String,
        required:true,
        set:function(password){return require('bcryptjs').hashSync(password,8)} 
    },
    email:{
        type:String,
        required:true,
        validate:[
            (email) => {
                const test = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                console.log(test)
                  return test 
            }, "Please use a valid Email Address"
        ]
        // validator:function(email){
        //      const test = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        //      console.log(test)
        //      if(!test){throw new Error("Email is invalid")}else{ return true }
            
        // }
    },
    firstname:{
        type:String,
        required:true,
        maxLength:[15,"oldukca uzun"]
    },
    lastname:{
        type:String,
        
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    isStaff:{
        type:Boolean,
        default:false

    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    image:[String],
    commentId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }],
      
    blogId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      }],
    Token:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Token",
      }],


},
{timestamps:true})
module.exports = mongoose.model("User",UserSchema);