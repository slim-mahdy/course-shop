const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        type : String,
        required: true,
    }
}, {timestamps: true});

const models = mongoose.model("department", schema);

module.exports = models;