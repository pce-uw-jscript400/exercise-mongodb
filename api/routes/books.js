const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../model/books')

//works
router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find()
  res.json({ status, response })
})

//works
router.get('/:bookId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.bookId)
  res.json({ status, response })
})

//works
router.get('/:bookId/authors', async (req,res,next) => {
  const status = 200
  const response = await Books.findById(req.params.bookId).select('authors')
  res.json({ status, response })
})

//doesn't work
router.get('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOne({authorId:req.params.authorId})
    res.json({ status, doc })
})

//works
router.post('/', (req, res, next) => {
  const status = 201
  const response = Books.create(req.body)
  res.json({ status, response })
})

//works
router.post('/:bookId/authors', async (req, res, next) => {
  const status = 201
  console.log(req.body.name, req.body.dob);
  const response = await Books.findByIdAndUpdate(req.params.bookId, { authors: { name:req.body.name, dob:req.body.dob } } )
  res.json({ status, response })
})

//works
router.put('/:bookId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOnAndUpdate({ _id: req.params.bookId }, { title: req.body.title, published:req.body.published, authors:req.body.authors }, 
    { new:true, omitUndefined:true })
  res.json({ status, response })
})

//update an author of a certain book
router.put('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({ authorId:req.params.authorId }, 
    { name: req.body.name, dob:req.body.dob }, 
    { new:true, omitUndefined:true })
  res.json({ status, response })
})

//works
router.delete('/:bookId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete(req.params.bookId)
  res.json({ status, response })
})

//delete an author of a certain book
router.delete('/:bookId/authors/:authorId', (req, res, next) => {
  const status = 200
  console.log(req.params.authorId);
  const response = Books.findOneAndDelete({authorId:req.params.authorId})
  res.json({ status, response })
})

module.exports = router