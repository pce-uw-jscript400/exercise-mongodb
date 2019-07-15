const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    published: {
        type:Number,
        required:true
    },
    authors: [{
        name: String,
        dob: Date
    }]
})

module.exports = mongoose.model('Books', schema);