const router = require("express").Router({ mergeParams: true });
const Books = require("../models/books");

//gets the authors object for a given book id
router.get("/", async (req, res, next) => {
  const status = 200;
  const { authors } = await Books.findById(req.params.bookId).select("authors");
  res.json({ status, authors });
});

//gets the author name and dob for a given author id
router.get("/:authorId", async (req, res, next) => {
  const status = 200;
  const { authors } = await Books.findById(req.params.bookId).select("authors");
  const author = authors.id(req.params.id);
  res.json({ status, author });
});

//post (create) authors for a given book id
router.post("/", async (req, res, next) => {
  const status = 201;
  const book = await Books.findById(req.params.bookId).select(
    "title published authors"
  );
  book.authors.push(req.body);
  await book.save();
  res.json({ status, book });
});

//updates a book document with author object for a given author id
router.put("/:authorId", async (req, res, next) => {
  const status = 200;
  const book = await Books.findById(req.params.bookId);
  const author = book.author.id(req.params.id);
  Object.assign(author, req.body);
  await book.save();
  res.json({ status, author });
});

//delete author for a given author id
router.delete("/:authorId", async (req, res, next) => {
  const status = 200;
  const book = await Books.findById(req.params.bookId);
  const author = book.authors.id(req.params.id).remove();
  await book.save();
  res.json({ status, author });
});
