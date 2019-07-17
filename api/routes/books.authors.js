// Include :seriesId
const router = require("express").Router({ mergeParams: true });
const Books = require("../model/book");

router.get("/", async (req, res, next) => {
  const status = 200;

  const { authors } = await Books.findById(req.params.bookId).select("authors");
  res.json({ status, authors });
});

router.get("/:id", async (req, res, next) => {
  const status = 200;

  const books = await Books.findById(req.params.bookId);

  const author = books.authors.id(req.params.id);

  res.status(status).json({ status, author });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  const books = await Books.findById(req.params.bookId);

  books.authors.push(req.body);
  await books.save();

  const author = books.authors[books.authors.length - 1];
  res.status(status).json({ status, author });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const books = await Books.findById(req.params.bookId);

  const author = books.authors.id(req.params.id);
  Object.assign(author, req.body);
  await books.save();

  res.status(status).json({ status, author });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const books = await Books.findById(req.params.bookId);
  const author = books.authors.id(req.params.id).remove();
  await books.save();

  res.status(status).json({ status, author });
});

module.exports = router;
