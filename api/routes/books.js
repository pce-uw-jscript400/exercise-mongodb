const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

/* const books = [
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
]; */

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

router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const authors = response.authors; 
  res.json({ status, authors })
})

router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  const author = response.authors.id(req.params.authorId)
  console.log(author)
  res.json({ status, author })
})

//TODO
router.post('/:id/authors', async (req, res, next) => {
  const status = 201
  await Books.create(req.body)
  .then(response => {
    res.json({ status, response })
  })
  .catch(err => {
    res.json(err.message)
  })
})

//TODO
router.put('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)
  response.
  res.json({ status, response })
})

//TODO
router.delete('/:id/authors/:authorId', (req, res, next) => {})


module.exports = router