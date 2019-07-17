const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    published: {
       type: Number,
       min: [1440, 'Please enter a date after the printing press was invented'],
       required: true
    },
    authors: [
        {
            name: {
                type: String
            },
            dob: {
                type: String
            }
        }
    ]
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Books', booksSchema);