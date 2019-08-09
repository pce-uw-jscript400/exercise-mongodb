const router = require('express').Router()
// const { generate: generateId } = require('shortid')
const Books = require('../models/books')

// GET /api/books/:bookId/authors
router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.bookId)
    .select('authors')
  res.json({ status, response })
})

// GET /api/books/:bookId/authors/:authorId
router.get('/:authorId', async (req, res, next) => {
    const status = 200
    const book = await Books.findById(req.params.bookId)
    const response = book.authors.id(req.params.authorId)
  
    res.json({ status, response })
})

// POST /api/books/:bookId/authors
router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const book = await Books.findById(req.params.bookId)
    const author = req.body
    book.authors.push(
      author
    )
    await book.save()
    res.json({ status, author })
  }catch(error ) {
      console.error(error)
      const e = new Error('Bad request')
      e.status = 400
      next (e)
    }
})

// PUT /api/books/:bookId/authors/:authorId
router.put('/:id', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const author = book.authors.id(req.params.authorId)
  Object.assign(author, req.body)
  await book.save()
  
  res.json({ status, author })
})

// DELETE /api/books/:bookId/authors/:authorId
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const author = book.authors.id(req.params.authorId)
    .remove() 
  await book.save()

  res.json({ status, author })
})

module.exports = router