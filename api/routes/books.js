const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Books = require("../models/books");

const books = [
  {
    id: "j9U3iNIQi",
    title: "The Colour of Magic",
    published: 1983,
    authors: [
      {
        name: "Sir Terry Pratchett",
        dob: "04-28-1948"
      }
    ]
  },
  {
    id: "ubQnXOfJV",
    title: "Stardust",
    published: 1997,
    authors: [
      {
        name: "Neil Gaiman",
        dob: "11-10-1960"
      }
    ]
  }
];

//gets all the books
router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Books.find().select("-__v");
  res.json({ status, response });
});

//creates book document
router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Books.create(req.body);
    res.json({ status, response });
  } catch (error) {
    console.error(error);
    const e = new Error("Something went bad");
    e.status = 400;
    next(e);
  }
});

//gets a book document with given id
router.get("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Books.findById(req.params.id);
  res.json({ status, response });
});

//updates a book document with given id
router.put("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Books.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { new: true }
  );
  res.json({ status, response });
});

//deletes a book document with given id
router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Books.findOneAndDelete({ _id: req.params.id });
  res.json({ status, response });
});

module.exports = router;
