const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

// Books

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find()
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  await Books.create(req.body)
  .then(response => {
    res.json({ status, response })
  })
  .catch(err => {
    res.json(err.message)
  })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({
    _id: req.params.id
  },{
    ...req.body
  }, {
    new: true
  })
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({
    _id: req.params.id
  })
  res.json({ status, response })
})

module.exports = router