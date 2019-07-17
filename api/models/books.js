const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
//    _id: Schema.Types.ObjectId,
title:  { 
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
    dob: {
        type: String,
        required: true
    }
  }]
},  {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

  module.exports = mongoose.model('Books', schema);
