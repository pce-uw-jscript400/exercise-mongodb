var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  title: { type: String },
  published: { type: Number },
  authors: [
    {
      name: String,
      dob: String
    }
  ]
});

module.exports = mongoose.model("Books", schema);
