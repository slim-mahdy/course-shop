const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    course : {
        type : mongoose.Types.ObjectId,
        ref: "courses",
        required: true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    price: {
        type : Number,
        required: true
    }
},{timestamps: true})

const model = mongoose.model("courseUser",schema);

module.exports = model;