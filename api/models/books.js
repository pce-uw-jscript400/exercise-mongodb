const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'] 
  },
  published: {
    type: Number,
    required: [true, 'published year is required'] 
  },
  authors: [{
    name: {
      type: String,
        required: [true, 'name is required']},
    dob: String
  }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Books', schema)
