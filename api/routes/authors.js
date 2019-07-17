const router = require('express').Router()
const Books = require('../models/book')

router.get('/:bookId/authors', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const response = book ? book.authors : []
  res.json({ status, response })
})

router.post('/:bookId/authors', async (req, res, next) => {
  const status = 201
  const book = await Books.findById(req.params.bookId)
  book.authors.push(req.body)

  const { _id, _title, published, authors } = await book.save()
  const response = { _id, _title, published, authors }

  res.status(status).json({ status, response })
})

router.get('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const response = book ? book.authors.id(req.params.authorId) : null
  res.json({ status, response })
})

router.put('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const author = book.authors.id(req.params.authorId)
  Object.assign(author, req.body)
  const { _id, _title, published, authors } = await book.save()
  const response = { _id, _title, published, authors }
  res.json({ status, response })
})

router.delete('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  book.authors.id(req.params.authorId).remove()

  const { _id, _title, published, authors } = await book.save()
  const response = { _id, _title, published, authors }

  res.json({ status, response })
})

module.exports = router