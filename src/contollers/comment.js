const Comment = require("../models/comments");


module.exports = {
  list: async (req, res) => {
    const data = await res.getModel(Comment);
    res.status(200).send({
      data,
      error: false,
      details: await res.getModelDetails(Comment),
    });
  },
  create: async (req, res) => {
    try {
      const data = await Comment.create(req.body);
      res.status(201).send({
        data,
        message: "succes",
        error: false,
      });
    } catch (error) {
      res.send(error);
    }
  },
  read: async (req, res) => {
    try {
      const data = await Comment.findById({_id:req.params.id})

       

      res.send({
        data,
        message: "Data is loaded!",
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  update:async(req,res)=>{

    const data = await  Comment.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true}).exec();
    res.send({
        data,
        error:error

    })
  },
  delete: async (req, res) => {
    const data = await  User.findByIdAndDelete({_id:req.params.id})
         res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
          });
  }
};
