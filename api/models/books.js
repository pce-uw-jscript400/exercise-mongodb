const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true
  },
  authors: [
    {
      name: {
        type: String,
        required: true
      },
      dob: {
        type: String,
        validate: {
          validator: (input) => {
            return /\d{2}-\d{2}-\d{4}/.test(input);
          },
          msg: `dob must be a string in the format mm-dd-yyyy`
        }
      }
    }
  ]
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

module.exports = mongoose.model('Books', booksSchema)