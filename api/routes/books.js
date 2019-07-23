const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

const books = [
  {
    id: 'j9U3iNIQi',
    title: 'The Colour of Magic',
    published: 1983,
    authors: [
      {
        name: 'Sir Terry Pratchett',
        dob: '04-28-1948'
      }
    ]
  },
  {
    id: 'ubQnXOfJV',
    title: 'Stardust',
    published: 1997,
    authors: [
      {
        name: 'Neil Gaiman',
        dob: '11-10-1960'
      }
    ]
  }
];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find(req.query).select('_id title published authors')
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Books.create(req.body)
    res.json({ status, response })

  } catch (error) {
    error.status = 400
    error.message = 'Invalid data. Please try again.'
    
    next(error)
  }

})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id).select('_id title published authors')

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const query = {_id:req.params.id}
  const options = {new:true}
  const response = await Books.findOneAndUpdate(query, req.body, options)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

router.get('/:bookId/authors/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.authors.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:bookId/authors/:id', async (req, res, next) => {
  const status = 200
  const query = {_id:req.params.id}
  const options = {new:true}
  const response = await Books.authors.findOneAndUpdate(query, req.body, options)
  
  res.json({ status, response })
})

router.delete('/:bookId/authors/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.authors.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router