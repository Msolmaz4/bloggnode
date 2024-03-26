"use strict"
const User = require("../models/userModel")

module.exports = {
    list :async(req,res)=>{
        
           /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data  = await res.getModel(User)
        res.status(200).send({
            data,
            error:false,
            details:await res.getModelDetails(User)
        })
    },
    create:async(req,res)=>{

         /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
       req.body.isStaff = false
       req.body.isAdmin = false
       const data  = await User.create(req.body)
       res.status(201).send({
        data,
        error:false,
        message:"Created Successfully!"
       })
    },
    read:async(req,res)=>{
        console.log(req.params)
        
        const data = await User.findOne({_id:req.params.id})

        res.status(200).send({
            data,
            error:false
        })
    },
    update: async (req, res) => {
       // const id = req.body.isAdmin ? req.params.id : req.user.id;
        // findByIdAndUpdate() işlevi, veritabanında belirli bir kullanıcı kimliğine sahip bir belgeyi bulur ve günceller. Bu işlev çağrıldığında, sorgunun asenkron olarak çalışması için sonucun beklenmesi gerekir. exec() bu işlemi gerçekleştirir ve sonucu döndürür.
        const data = await  User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true}).exec();
        res.status(201).send({
            data:data?data:{message:'No Data Found!'},
            error: !data
        })

    },
    delete:async(req,res)=>{
        try {
             const data = await  User.findByIdAndDelete({_id:req.params.id})
         res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
          });
        } catch (error) {
            res.send(error)
        }
        
    }

}