const express = require("express")
const app = express()
require( "dotenv").config();
const PORT = process.env.PORT || 5000;
require("./src/config/db")


app.get("/",(req,res)=>{
    res.send("adana")
})


app.listen(PORT,()=>console.log("consoldayiy"))