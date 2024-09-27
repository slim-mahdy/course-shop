const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    departmentID:{
        type : mongoose.Types.ObjectId,
        ref:"department",
        required: true,
    },
    departmentsubID:{
        type : mongoose.Types.ObjectId,
        ref:"departmentsub",
        required: true,
    },
    priority:{
        type: Number, // 1 , 2 , 3
        required: true,
    },
    title: {
        type : String,
        required: true,
    },
    body: {
        type : String,
        required: true,
    },
    user: {
        type : mongoose.Types.ObjectId,
        ref:"user",
        required: true,
    },
    answer:{
        type: Number, // 0 , 1
        required: true,
    },
    course: {
        type : mongoose.Types.ObjectId,
        ref:"courses",
        required: false,
    },
    patent :{
        type : mongoose.Types.ObjectId,
        ref:"ticket",
        required :false,
    },
    isAnswer :{
        type : Number,
        required :false,
    },
}, {timestamps: true});

const models = mongoose.model("ticket", schema);

module.exports = models;