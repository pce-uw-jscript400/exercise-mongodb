const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find();
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  const response = await Books.create({ _id: generateId(), ...req.body })
  
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200  
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({
    _id : req.params.id
  },
  {
    title : req.body.title,
    published : req.body.published,
    author : {name : req.body.author.name, dob : req.body.author.dob}
  },
  {
    new : true
  })
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({
    _id : req.params.id
  })

  res.json({ status, response })
})

module.exports = router