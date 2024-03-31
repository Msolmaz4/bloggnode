const Comment = require("../models/comment");
const Blog= require("../models/blogModel")
const User = require("../models/userModel")

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
      console.log(req.body,"comment create")
      const data = await Comment.create(req.body);
      //burda biz  yeni oluşturduğumuyz  comment modeli ile eşitlememiz  gerekiyor blogId demek                         
      const blog = await Blog.findById(req.body.blogId);
      blog.commentId.push(data._id);
      await blog.save();
      // const user = await User.findById(req.body.userId);
      // user.commentId.push(data._id);
      // await user.save();
      // blog.commentId.push(data._id); Bu satırda, yeni oluşturulan yorumun id'sini, blog gönderisinin commentId dizisine ekliyoruz. Bu şekilde, blog gönderisi ile yorum arasında bir ilişki kurmuş oluyoruz.


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
        error:false

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
