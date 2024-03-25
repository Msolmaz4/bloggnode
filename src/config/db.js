const mongoose = require("mongoose")


const db = ()=>{
    mongoose.connect(process.env.MONGO_DB).then(()=>console.log("db concet")).catch(err=>console.log(err))
}
db()