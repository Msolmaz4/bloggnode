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
      //const veri = await data.populate("userId")
     //console.log(veri)
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

      // .populate("userId")
      // .populate({
      //   path: "commentId",
      //   populate: {
      //     path: "userId",
      //     model: "User"
      //   }
      // })


   // const veri = await data.populate(["userId","commentId"])
    const veri = await data
    .populate({
      path: "commentId",
      populate: {
        path: "userId",
        model: "User"
      }
    })
    // console.log(veri)
      res.send({
      veri,
        message: "Data is loaded!",
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  likes:async(req,res)=>{
    console.log("**************")
 
    console.log(req.params.id,"likes")
   
    let blog = await Blog.findById(req.params.id);
    let userId = req.user.id;
    let likes = blog.likes.map(like => like.toString());

    let operator;
    let message;
    if (likes.includes(userId)) {

      operator = '$pull';
      message = 'Like removed';
    } else {
      
      operator = '$addToSet';
      message = 'Like added';
    }

    let updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { [operator]: { likes: userId } },
      { new: true, runValidators: true }
    );

    res.send({
      data: updatedBlog,
      message: message,
      error: false
    });
   
    
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
