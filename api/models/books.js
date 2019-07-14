var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    published: {
        type: Number,
        required: true
    },
    authors: [{
        name: String,
        dob: Date
    }]
})

module.exports = mongoose.model('Books', schema);