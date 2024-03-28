const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    commentId:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
   
    isPublish: {
      type: Boolean,
      default: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    countOfVisitors: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
// Bunun dışında, Comment modelinin isminin "Comments" olarak tanımlandığını görüyorum. Ancak, Comment modelini require ettiginizde "comments" olarak tanımlamışsınız. Mongoose, model isimlerini varsayılan olarak küçük harfli ve çoğul hale getirir. Bu nedenle, modeli tanımlarken kullandığınız isimle, onu require ettiğinizde kullandığınız isim aynı olmalıdır.