const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books.js')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find()
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
try {
  const response = await Books.create(req.body)
  res.json({ status, response })
}
catch {
const status = 404
const response = "Please complete required fields"
res.json({ status, response })
}

})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id);

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({_id: req.params.id}, {"title": req.body.title} , {new: true});
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({_id: req.params.id});


  res.json({ status, response })
})

module.exports = router