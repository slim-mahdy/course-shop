const mongoose = require('mongoose');

const schema =new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        ref : "user",
        required: true,
    },
    body:{
        type: String,
        default :0
    },
    cover:{
        type: String,
        default :0
    },
    href:{
        type: String,
        default :0
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref : "category",
        required: true,
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required: true,
    },
    publish:{
        type: Number,// 0 || 1
        required: true,
    },
},{ timestamps: true })

const model = mongoose.model("article",schema);

module.exports = model;