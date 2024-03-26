const Blog = require("../models/blogModel");


module.exports = {
  list: async (req, res) => {
    const data = await res.getModel(Blog);
    res.status(200).send({
      data,
      error: false,
      details: await res.getModelDetails(Blog),
    });
  },
  create: async (req, res) => {
    try {
      const data = await Blog.create(req.body);
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
      // $inc Bu, MongoDB'de bir alanın değerini artırmak için kullanılır.
      const data = await Blog.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, $inc: { countOfVisitors: 1 } },
        { new: true, runValidators: true }
      ).exec();

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

    const data = await  Blog.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true}).exec();
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
