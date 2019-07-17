const router = require('express').Router()
const Books = require('../models/book')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find().select('_id title published authors')
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  
  const { _id, _title, published, authors } = await Books.create(req.body)
  const response = { _id, _title, published, authors }
  
  res.status(status).json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id).select('_id title published authors')

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .select('_id title published authors')
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({ _id: req.params.id }).select('_id title published authors')

  res.json({ status, response })
})

module.exports = router