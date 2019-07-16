var mongoose = require('mongoose');

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
        name: {
            type: String,
            required: true
        },
        dob: String
    }]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Books', schema)