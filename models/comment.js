const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      require: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      require: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    isAccept: {
      type: Number, // 0 || 1
      default: 0,
    },
    score: {
      type: Number,
      default: 5,
    },
    isAnswer: {
      type: Number, // 0 || 1
      require: true,
    },
    mainCommentId: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("comment", schema);

module.exports = model;
