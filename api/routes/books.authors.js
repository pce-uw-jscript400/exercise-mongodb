const router = require("express").Router({ mergeParams: true });
const Book = require("../models/book");

const publicKeys = "_id title published authors -__v";

router.get("/", async (req, res, next) => {
  const status = 200;
  const { authors } = await Book.findById(req.params.bookId)
    .select("authors")
    .select(publicKeys);
  res.json({ status, authors });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  const book = await Book.findById(req.params.bookId).select(publicKeys);

  book.authors.push(req.body);
  await books.save();

  const author = book.authors[book.authors.length - 1];
  res.status(status).json({ status, author });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const book = await Book.findById(req.params.bookId);

  const author = book.author.id(req.params.id);
  Object.assign(author, req.body);
  await book.save();

  res.status(status).json({ status, author });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const book = await Book.findById(req.params.bookId);
  const author = book.authors.id(req.params.id).remove();
  await book.save();

  res.status(status).json({ status, author });
});

module.exports = router;
