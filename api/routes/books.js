const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Books = require("../model/book");

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

router.get("/", async (req, res, next) => {
  const status = 200;

  Books.find().then(response => {
    res.json({ status, response });
  });
});
/************************************************* */
router.post("/", async (req, res, next) => {
  const status = 201;

  try {
    Books.create(req.body).then(response => {
      res.json({ status, response });
    });
  } catch (error) {
    console.error(error);
    const e = new Error("Sonthing went wrong");

    e.status = 400;
    next(e);
  }
});
/************************************************* */
router.get("/:id", async (req, res, next) => {
  const status = 200;

  Books.findById(req.params.id).then(response => {
    res.json({ status, response });
  });
});
/************************************************* */
router.put("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Books.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, published: req.body.published },
    { new: true }
  );

  res.json({ status, response });
});
/************************************************* */
router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Books.findOneAndDelete({ _id: req.params.id });

  res.json({ status, response });
});

module.exports = router;
