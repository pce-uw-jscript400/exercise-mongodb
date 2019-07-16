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
  const response = await Books.find()
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  
  Books.create(req.body).then(response => {
    res.json({status, response})
  }).catch(error => {
    console.error(error)
    const e = new Error('Something Went Bad')
    e.status = 400
    next(e)
  })
})

router.get('/:bookId/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.get(':bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.characters.findById(req.params.id)
  res.json({ status, response })
})

router.put('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title
  })
  
  res.json({ status, response })
  
})

router.post('/:bookId/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title
  })
  
  res.json({ status, response })
  
})


router.delete('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findByIdAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router

