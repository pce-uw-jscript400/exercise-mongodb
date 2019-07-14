const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Book = require("../models/book");

// SAVE FOR .select() LATER
// const publicKeys = '_id title published authors -__v'

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Book.find();

  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Book.create(req.body);
    res.json({ status, response });
  } catch (error) {
    console.log(error);
    const e = new Error("Something went wrong when attempting to post book.");
    e.status = 400;
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Book.findById(req.params.id);

  res.json({ status, response });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const query = { _id: req.params.id };
  const options = { new: true };
  const response = await Book.findOneAndUpdate(query, req.body, options);

  res.json({ status, response });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Book.findByIdAndDelete({ _id: req.params.id });

  res.json({ status, response });
});

module.exports = router;
