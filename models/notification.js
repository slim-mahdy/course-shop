const mongoose = require('mongoose');

const schema =new mongoose.Schema({
    message:{
        type: String,
        required: true,
    },
    admin:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required: true,
    },
    seen:{
        type: Number, // 0 || 1
        default :0
    },
},{ timestamps: true })

const model = mongoose.model("notification",schema);

module.exports = model;