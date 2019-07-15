const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    published: { type: Number, required: true },
    authors: [
      {
        name: {
          type: String,
          required: true
        },
        dob: String
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
