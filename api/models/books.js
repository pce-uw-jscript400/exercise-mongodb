const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    published: Number,
    authors: [
        {
            name: String,
            dob: String
        }
    ]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Books', schema)