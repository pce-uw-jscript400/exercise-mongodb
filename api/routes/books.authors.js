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
  await books.save()//dont undertsand what is happening here

  const author = books.authors[books.authors.length -1]
  res.status(status).json({ status, author }) //dont undertsand what is happening here
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const books = await Books.finById(req.params.seriesId)
  const author = books.authors.id(req.params.id)//dont undertsand what is happening here
  Object.assign(author, req.body)//dont undertsand what is happening here
  await series.save()//dont undertsand what is happening here
  
  res.status(status).json({ status, author })//dont undertsand what is happening here
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const books = await Books.findfindById(req.params.bookId)
  const author = books.authors.id(req.params.id).remove()
  await books.save() // is this like a push?

  res.status(status).json({ status, author })//dont undertsand what is happening here
})

module.exports = router

// I am confused about needing this file, because I was able to update the author name before exicuting this code.