const router = require('express').Router({mergeParams: true})
const Books = require('../models/books')


router.get('/', async (req, res, next) => {
  const status = 200
  const {authors} = await Books.findById(req.params.bookId).select('authors')
  
  res.json({ status, authors })
})

router.post('/', async (req, res, next) => {
  const status = 201
  const books = await Books.findById(req.params.bookId)
  
  books.authors.push(req.body)
  await books.save()// ok, it updates an existing document or inserts a new document, depending on its document parameter.

  const author = books.authors[books.authors.length -1]
  res.json({ status, author }) 
  // ok, so res.status(status) is declaring that the current status of res is "status", and the .json() parses that data as JSON. 
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const {authors} = await Books.findById(req.params.bookId).select('authors')
  const author = authors.id(req.params.id)

  res.json({ status, author })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const books = await Books.findById(req.params.bookId)
  const author = books.authors.id(req.params.id)
  //here "id" is the name of the parameter, and we are identifying the id of the author through the param that we specify. Could you break this down a little? It has some layers I am not following.
  Object.assign(author, req.body)
  // ok, so "author" is the target, and "req.body" is the source. We are forever changing "author" by copying/adding the properties from "req.body" to "author"
  await books.save()
  
  res.status(status).json({ status, author });
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const books = await Books.findById(req.params.bookId)
  const author = books.authors.id(req.params.id).remove()
  await books.save()

  res.status(status).json({ status, author });
})

module.exports = router

// I am confused about needing this file, because I was able to update the author name before exicuting this code. UPDATE: Nope, i actually was NOT able to do this before this code. Still confused on why I cannot GET /api/books/:bookId/authors/:authorId