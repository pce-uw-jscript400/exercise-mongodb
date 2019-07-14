const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books');

const publicKeys = '_id title published authors';

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find().select(publicKeys);
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201;

  const book = await Books.create(req.body);
  const response = await Books.findById(book._id).select(publicKeys);
  
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200;
  const response = await Books.findById(req.params.id).select(publicKeys);

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200;

  const book = await Books.findOneAndUpdate({_id: req.params.id}, req.body);
  const response = await Books.findById(book._id).select(publicKeys);
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200;
  const response = await Books.findOneAndDelete({_id: req.params.id}, req.body).select(publicKeys);

  res.json({ status, response })
})

module.exports = router