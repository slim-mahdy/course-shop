const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        type : String,
        required: true,
    },
    parent :{
        type : mongoose.Types.ObjectId,
        ref : "department",
        required: true,
    }
}, {timestamps: true});

const models = mongoose.model("departmentsub", schema);


module.exports = models;