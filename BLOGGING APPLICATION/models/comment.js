const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
