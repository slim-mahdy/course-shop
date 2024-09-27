const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

schema.virtual("sessions", {
  ref: "sessions",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "course",
});

const model = mongoose.model("courses", new mongoose.Schema(schema));

module.exports = model;
