// Include :bookId
const router = require('express').Router({ mergeParams: true })
const Books = require('../models/books')

router.get('/', async (req, res, next) =>{
    const status = 200
    const { authors } = await Books.findById(req.params.bookId).select('authors')
    res.json({status, authors})
})

router.post('/', async (req, res, next) => {
    const status = 201
    try {
        const book = await Books.findById(req.params.bookId)

        book.authors.push(req.body)
        await book.save()

        const author = book.authors[book.authors.length - 1]
        res.status(status).json({status, author})
    } catch (e) {
        err = new Error(e.message)
        err.status = 404
        next(err)
    }
    
})

router.get('/:id', async (req, res, next) =>{
    const status = 200
    const { authors } = await Books.findById(req.params.bookId).select('authors')
    const author = authors.id(req.params.id)
    res.json({status, author})
})

router.put('/:id', async (req, res, next) => {
    const status = 200
    const book = await Books.findById(req.params.bookId)

    const author = book.authors.id(req.params.id)
    Object.assign(author, req.body)
    await book.save()

    res.status(status).json({status, author})
})

router.delete('/:id', async (req, res, next) => {
    const status = 200
    const book = await Books.findById(req.params.bookId)
    const author = book.authors.id(req.params.id).remove()
    await book.save()

    res.status(status).json({status, author})
})

module.exports = router