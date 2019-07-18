const mongoose = require('mongoose');
const Author = require('./author').schema;
const schema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    published: {
        type:Number,
        required:true
    },
    authors: {
        type: [Author],
        required:false
    }
});

module.exports = mongoose.model('Books', schema) 