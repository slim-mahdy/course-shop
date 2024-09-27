const mongoose = require('mongoose');

const schema =new mongoose.Schema({
    code:{
        type: String,
        required: true,
    },
    percent:{
        type: Number,
        required: true,
    },
    course:{
        type: mongoose.Types.ObjectId,
        ref : "courses",
        required: true,
    },
    max:{
        type: Number, // 0 || 1
        default :0
    },
    uses:{
        type: Number,
        required: true,
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required: true,
    },
    
},{ timestamps: true })

const model = mongoose.model("off",schema);

module.exports = model;