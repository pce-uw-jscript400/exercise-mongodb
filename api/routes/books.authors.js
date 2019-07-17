const router = require('express').Router({mergeParams: true})
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

// Authors

router.get('/', async (req, res, next) => {
  const status = 200
  const Book = await Books.findById(req.params.bookId)
    .then(Book => {
      const authors = Book.authors; 
      res.json({ status, authors })
    })
    .catch (error => {
      res.json({status, error})
    })
  
  
})

router.get('/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.bookId)
  const author = response.authors.id(req.params.authorId)
  res.json({ status, author })
})

router.post('/', async (req, res, next) => {
  const status = 201
  const Book = await Books.findById(req.params.bookId)
  Book.authors.push(req.body)
  const author = Book.authors[Book.authors.length-1]
  Book.save(function (err) {
    if (err) return console.log(err)
    console.log('Author created successfully!');
  });
  res.json({status, author})
})

router.put('/:authorId', async (req, res, next) => {
  const status = 200
  const Book = await Books.findById(req.params.bookId)
  const author = Book.authors.id(req.params.authorId)
  author.set(req.body)
  Book.save(function (err) {
    if (err) return console.log(err)
    console.log('Author updated successfully!');
  });
  res.json({status, author})
})

router.delete('/:authorId', async (req, res, next) => {
  const status = 200
  const Book = await Books.findById(req.params.bookId)
  const author = Book.authors.id(req.params.authorId).remove()
  Book.save(function (err) {
    if (err) return handleError(err);
    console.log('Author removed successfully');
  });
  res.json({ status, author })
  
})

module.exports = router