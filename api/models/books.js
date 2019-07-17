const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    published: { type: Number, required: true },
    authors: [
      {
        name: { type: String },
        dob: { type: Date }
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = mongoose.model("Books", schema);
