const router = require('express').Router()
const { generate: generateId } = require('shortid')

const Books = require('../models/books')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find()
  console.log(response)

  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  try {
    const response = await Books.create(req.body)
    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error('noooooooo')
    e.status = 400
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200

  const response = await Books.findOneAndUpdate(
    {_id: req.params.id,}, {
    title: req.body.title,
    published: req.body.published,
    authors: req.body.authors
  }, {new: true})

  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({ _id: req.params.id})

  res.json({ status, response })
})

// Author routes:
// GET /api/books/:bookId/authors
// GET /api/books/:bookId/authors/:authorId
// POST /api/books/:bookId/authors
// PUT /api/books/:bookId/authors/:authorId
// DELETE /api/books/:bookId/authors/:authorId

router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const authors = response.authors

  res.json({ status, authors })
})

router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const author = response.authors.id(req.params.authorId)

  res.json({ status, author })
})

router.post('/:id/authors', async (req, res, next) => {
  const status = 201

  try {
    const response = await Books.findById(req.params.id)
    response.authors.push(req.body)
    await response.save()
    const authors = response.authors

    res.json({ status, authors })
  } catch (error) {
    console.log(error)
    const e = new Error('noooooooo')
    e.status = 400
    next(e)
  }
})


router.put('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200

  const response = await Books.findById(req.params.id)
  const author = response.authors.id(req.params.authorId)
  author.set(req.body)
  await response.save()

  res.json({ status, author })
})

router.delete('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200

  const response = await Books.findById(req.params.id)
  const author = response.authors.id(req.params.authorId)
  author.remove()
  await response.save()

  res.json({ status, author })
})

module.exports = router
