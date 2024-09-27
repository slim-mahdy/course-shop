const mongoose =require('mongoose');

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    answer:{
        type: Number, // 0 || 1
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
},{timestamps: true});

const model = mongoose.model("contact",new mongoose.Schema(schema));

module.exports = model;