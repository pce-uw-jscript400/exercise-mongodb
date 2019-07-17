var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  published: Number,
  authors: [{
    name: String,
    dob: String
  }]
}, {
  // every database uses snake case by default
  // in this case we are remapping these
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Books', schema)