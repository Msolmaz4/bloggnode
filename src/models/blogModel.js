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
