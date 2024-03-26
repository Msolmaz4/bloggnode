
const User = require("../models/userModel")

module.exports = {

   register:async(req,res)=>{
    try {
        const data = await User.create(req.body)
        res.status(201).json({
            message:"succes",
            data
        })
        
    } catch (error) {
        res.send(error)
    }

   },



    login:async(req,res)=>{
        try {
            console.log(req.body);
       
        } catch (error) {
            res.send(error)
        }
        
        
    },
    logout:async(req,res)=>{

    }
}