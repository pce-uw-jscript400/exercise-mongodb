const router = require('express').Router();
const Books = require('../models/books');

const books = [
  // {
  //   id: 'j9U3iNIQi',
  //   title: 'The Colour of Magic',
  //   published: 1983,
  //   authors: [
  //     {
  //       name: 'Sir Terry Pratchett',
  //       dob: '04-28-1948'
  //     }
  //   ]
  // },
  // {
  //   id: 'ubQnXOfJV',
  //   title: 'Stardust',
  //   published: 1997,
  //   authors: [
  //     {
  //       name: 'Neil Gaiman',
  //       dob: '11-10-1960'
  //     }
  //   ]
  // }
];

//GET all books
router.get('/', async(req, res, next) => {
  const status = 200
  const response = await Books.find()
  res.json({ status, response })
})

//GET book by Id
router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  res.json({ status, response })
})

// GET /api/books/:bookId/authors
router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id).select('authors')
  res.json({ status, response })
})

// GET /api/books/:bookId/authors/:authorId
router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const books = await Books.findOne({ _id: req.params.id })
  const response =  books.authors
  console.log(response)
res.json({ status, response })
})

//Create new book
router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Books.create(req.body)
    res.json({ status, response })
  } catch (error) {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  }
})

// POST /api/books/:bookId/authors - not working
router.post('/:id/authors/', async (req, res, next) => {
  const status = 201
  const book = await Books.findById(req.params.bookId)

  book.authors.push(req.body)
  await book.save()

  const author = book.authors[book.authors.length - 1]
  res.status(status).json({ status, author })
})

//Update book
router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title,
    published: req.body.published,
  }, { new: true })
  
  res.json({ status, response })
})

// PUT /api/books/:bookId/authors/:authorId - not working
router.put('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById({authorId:req.params.authorId})
  const author = book.authors.id(req.params.authorId)
  Object.assign(author, req.body)
  await book.save()

  res.json({ status, author })
})

//Delete book
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({ _id: req.params.id })
  res.json({ status, response })
})

// DELETE /api/books/:bookId/authors/:authorId
router.delete('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({ authorId:req.params.authorId })
  res.json({ status, response })
})

module.exports = router