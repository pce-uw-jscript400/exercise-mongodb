const router = require('express').Router()
const Book = require('../models/book');

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Book.find()
  
  res.json({ status, response })
})

// GET /api/books/:bookId/authors
router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const response = await Book.findById(req.params.id).select( 'authors')
  
  res.json({ status, response })
})

// GET /api/books/:bookId/authors/:authorId
router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  try{
    const response = await Book.find({ _id: req.params.id, "authors._id": req.params.authorId}).select( 'authors')
  }catch(error){
    if (error.name === 'CastError') {
      res.status(400).json({ status: 400, response: 'Invalid ObjectId' })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
  res.json({ status, response })
})

// POST /api/books/:bookId/authors
router.post('/:id/authors', async (req, res, next) => {
  const status = 201
  let response;
  try {
    reponse = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { "authors": req.body } },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

// PUT /api/books/:bookId/authors/:authorId
router.put('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  if(!('name' in req.body) || !('dob' in req.body)) {
    res.status(400).json({ status: 400, response: "Name and dob are required" })
  }else{
    let response;
    try {
      reponse = await Book.findOneAndUpdate(
        { _id: req.params.id, 'authors._id': req.params.authorId },
        { $set: {'authors.$.name': req.body.name , 'authors.$.dob': req.body.dob}},
        { new: true }
      )
      res.status(status).json({ status, response })
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        res.status(400).json({ status: 400, response: error.message })
      } else {
        res.status(500).json({ status: 500, response: error.message })
      }
    }
  }
})

// DELETE /api/books/:bookId/authors/:authorId
router.delete('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  let response;
  try {
    reponse = await Book.findOneAndUpdate(
      {  _id: req.params.id },
      { $pull: { 'authors': { _id: req.params.authorId} } },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})


router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Book.create(req.body);
    res.json({ status, response })
  } catch (error) {
    console.log(error.name)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Book.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  let response;
  try {
    reponse = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).select('_id title start_year season_count');
    res.json({ status, response })
  }catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  let response;
  reponse = await Book.findOneAndDelete(
    { _id: req.params.id }
  );

  res.json({ status, response })
})

module.exports = router