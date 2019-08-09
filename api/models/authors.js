const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    dob: {
        type: String
    }
});

  module.exports = mongoose.model('Authors', authorSchema)