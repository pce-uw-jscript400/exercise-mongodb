const router = require('express').Router({ mergeParams: true });
const Books = require('../models/books.js')

// GET /api/books/:bookId/authors
router.get('/', async (req, res, next) => {
  const status = 200
  const authors = await Books.findById(req.params.bookId).select('authors')
  res.json({ status, authors })
})

// GET /api/books/:bookId/authors/:authorId
router.get('/:authorId', async (req, res, next) => {
    const status = 200
    const book = await Books.findById(req.params.bookId)
    const authorId = await book.authors.id(req.params.authorId)
    res.json({ status, authorId })
  })

// POST /api/books/:bookId/authors
router.post('/', async (req, res, next) => {
  const status = 201
  const book = await Books.findById(req.params.bookId)
  book.authors.push(req.body)
  await book.save()
  const authors = await Books.findById(req.params.bookId).select('authors')
  res.json({ status, authors })
})


// PUT /api/books/:bookId/authors/:authorId
router.put('/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const authorId = await book.authors.id(req.params.authorId)
  Object.assign(authorId, req.body)
  await book.save()
  const authors = await Books.findById(req.params.bookId).select('authors')
  res.json({ status, authors })
})

// DELETE /api/books/:bookId/authors/:authorId
router.delete('/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const authorRemoved = await book.authors.id(req.params.authorId).remove()
  await book.save()
  res.json({ status, authorRemoved })
})

module.exports = router