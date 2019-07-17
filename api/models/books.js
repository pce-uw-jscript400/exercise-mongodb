var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema for books API
var schema = new Schema({
    _id : String,
    title : {
        type : String,
        required : true
    },
    published : {
        type : Number,
        required : true
    },
    authors : [{
        name : String,
        dob : String
    }]
},
{
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

module.exports = mongoose.model('Books', schema)