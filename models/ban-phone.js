const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const model = new mongoose.model("BanUser", schema);

module.exports = model;
