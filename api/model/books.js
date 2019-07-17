var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var authorSchema = new Schema({
  name: { type:String },
  dob: { type:String }
});


var booksSchema = new Schema({
  title:  {
    type: String,
    required: true
  },
  published: {
    type: Number,
    required: true
  },
  authors: [authorSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});




module.exports = mongoose.model('Books', booksSchema)
