const router = require('express').Router({ mergeParams: true })
const Books = require('../models/books')

// get authors of book from bookId
router.get('/', async (req, res, next) => {
    const status = 200
    // get all authors of selected book
    const { authors } = await Books.findById(req.params.bookId).select('authors')
    // return status and authors list
    res.json({ status, authors })
})

// get authors of book from bookId from author ID
router.get('/:id', async (req, res, next) => {
    const status = 200
    // get the book by ID
    const book = await Books.findById(req.params.bookId)
    // get the authors of the book by ID
    const authors = await book.authors.id(req.params.id)
    // return status and the authors of the book
    res.json({ status, authors })
})

// add author to book by bookId
router.post('/', async (req, res, next) => {
    const status = 201
    // get the book by ID
    const book = await Books.findById(req.params.bookId)
    
    // add author info to book and save the book
    book.authors.push(req.body)
    await book.save()

    // get the new author info and return it and the status
    const author = book.authors[book.authors.length - 1]
    res.json({ status, author })
})

// update authors of selected book
router.put('/:id', async (req, res, next) => {
    const status = 201
    // get book by ID
    const book = await Books.findById(req.params.bookId)
    // get author of book by ID
    const author = await book.authors.id({ _id: req.params.id })

    // save the author update from the request body and save the book
    author.set(req.body)
    await book.save()

    // get the updated author info and return it and the status
    const updatedAuthor = book.authors[book.authors.length - 1]
    res.json({ status, updatedAuthor })
})

// remove author from book
router.delete('/:id', async (req, res, next) => {
    const status = 200
    // get the book by ID
    const book = await Books.findById(req.params.bookId)
    // get the author of the book by ID
    const author = await book.authors.id({ _id: req.params.id })

    // remove author and save the book
    author.remove()
    await book.save()

    // return status and author that was removed
    res.json({ status, author })
})

module.exports = router