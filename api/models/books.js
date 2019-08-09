const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Authors = require('./authors').schema;

const bookSchema = new Schema({
    title:  {type: String, required: true},
    // author: String,
    published: {type: Number, required: true},
    authors: {
        type: [Authors]
    }
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


  module.exports = mongoose.model('Books', bookSchema)