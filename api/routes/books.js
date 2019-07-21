const router = require('express').Router()
const Books = require('../models/books')

const publicKeys = '_id title published authors'

// GET (includes query param if included)
router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find(req.query).select(publicKeys)
  
  res.json({ status, response })
})

// POST 
router.post('/', async (req, res, next) => {
  const status = 201
  
  try {
    const book  = await Books.create(req.body)
    const response = await Books.findById(book._id).select(publicKeys)
    res.json({status, response})
  } catch(error) {
    error.status = 400
    const e = new Error('Invalid data. Please check your POST data and try again')

    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const { id } = req.params
  const response = await Books.findById(id).select(publicKeys)

  res.json({status, response})
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const query = { _id: req.params.id} 
  const options = { new: true }
  const response = await Books.findOneAndUpdate(query, req.body, options).select(publicKeys)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  
  const query = { _id: req.params.id }
  const response = await Books.findOneAndDelete(query, req.body).select(publicKeys)

  res.json({ status, response })
})

module.exports = router