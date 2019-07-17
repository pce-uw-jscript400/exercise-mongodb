const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/book')
var mongoose = require('mongoose');

// Additionally, add a new set of routes for the authors. For example:
// ```
// DELETE /api/books/:bookId/authors/:authorId
// ```

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find()

  res.json({ status, response })
})

router.post('/:bookId/authors', async (req, res, next) => {
  const status = 201
  const author = req.body
  const response = await Books.findOneAndUpdate({
    _id: req.params.bookId },
    { $push: { authors: author } },
    { new: true }
  )
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  try {
    const response = await Books.create(
      req.body
    )
    res.json({ status, response })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})

router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const authors = response.authors
  const author = authors.find(author => author['_id'] == req.params.authorId)
  res.json({ status, author })
})

router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const authors = response.authors
  res.json({ status, authors })
})


router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const author = book.authors.id(req.params.authorId)
  Object.assign(author, req.body)
  await book.save()

  res.json({ status, author })
})

router.put('/:id', async (req, res, next) => {
  const status = 200

  const response = await Books.findOneAndUpdate({
    _id: req.params.id },
    {...req.body},
    { new: true }
  )
  res.json({ status, response })
})

router.delete('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const book = await Books.findById(req.params.bookId)
  const author = book.authors.id(req.params.authorId).remove()

  await book.save()

  res.status(status).json({ status, author })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({
    _id: req.params.id
  })
  res.json({ status, response })
})

module.exports = router