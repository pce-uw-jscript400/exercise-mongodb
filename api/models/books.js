
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);



const schema = new mongoose.Schema({
    title:  {
        type: String,
        require: true
    },
    published: {
        type: Number,
        required: this
    },
    authors: [{
        name: String,
        dob: Number
    }]
  },   {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

  module.exports = mongoose.model('Books', schema)