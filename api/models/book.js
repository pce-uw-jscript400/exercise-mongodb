const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('./author').schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    published: {
        type: Number,
        required: true,
    },
    authors: {
        type: [Author],
        required: false,
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Book', schema);