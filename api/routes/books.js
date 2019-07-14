const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Book = require("../models/book");

// const books = [
//   {
//     id: 'j9U3iNIQi',
//     title: 'The Colour of Magic',
//     published: 1983,
//     authors: [
//       {
//         name: 'Sir Terry Pratchett',
//         dob: '04-28-1948'
//       }
//     ]
//   },
//   {
//     id: 'ubQnXOfJV',
//     title: 'Stardust',
//     published: 1997,
//     authors: [
//       {
//         name: 'Neil Gaiman',
//         dob: '11-10-1960'
//       }
//     ]
//   }
// ];

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

router.get("/:id", (req, res, next) => {
  const status = 200;
  const response = books.find(({ id }) => id === req.params.id);

  res.json({ status, response });
});

router.put("/:id", (req, res, next) => {
  const status = 200;
  const response = { id: req.params.id, ...req.body };
  const single = books.find(({ id }) => id === req.params.id);
  const index = books.indexOf(single);

  books.splice(index, 1, response);

  res.json({ status, response });
});

router.delete("/:id", (req, res, next) => {
  const status = 200;
  const response = books.find(({ id }) => id === req.params.id);
  const index = books.indexOf(response);

  books.splice(index, 1);

  res.json({ status, response });
});

module.exports = router;
