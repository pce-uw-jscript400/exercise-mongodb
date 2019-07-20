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
                type: String,
                validate: {
                    validator: function(v) {
                    return /\d{2}-\d{2}-\d{4}/.test(v);
                    },
                    message: props => `${props.value} is not a valid dob!`
                },
            }
        }
    ]
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Books', booksSchema);