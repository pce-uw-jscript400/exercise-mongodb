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
  try{
    const response = await Books.create(req.body)
    res.json({status, response})
  }catch(error){
    console.error(error)
    const e = new Error('Opps! Something went wrong')
    e.status = 400
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const response = await Books.findOne({_id: id})
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const title = req.body.title;
  const pub = req.body.published;
  const response = await Books.findOneAndUpdate({_id: id}, {title: title, published: pub}, {new: true})
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  response = await Books.findOneAndDelete({_id: req.params.id});
  res.json({ status, response })
})

router.get('/:id/authors', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const parent = await Books.findOne({_id: id})
  const response = parent.authors;
  res.json({ status, response })
})

//GET /api/books/:bookId/authors/:authorId
router.get('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const parent = await Books.findOne({_id: id})
  const authorId = req.params.authorId
  const response = parent.authors.id(authorId)
  res.json({ status, response })
})

//POST /api/books/:bookId/authors
router.post('/:id/authors', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const book = await Books.findOne({_id: id})
  const newAuthor = book.authors.push(req.body)
  newAuthor.isNew
  book.save()
  const response = book.authors
  res.json({ status, response })
})

//PUT /api/books/:bookId/authors/:authorId
router.put('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const authorId = req.params.authorId
  const book= await Books.findOne({_id: id})
  const author = book.authors.id(authorId)
  author.set(req.body)
  book.save()
  response = author
  res.json({ status, response })
})


//DELETE /api/books/:bookId/authors/:authorId
router.delete('/:id/authors/:authorId', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const book = await Books.findOne({_id: id})
  const authorId = req.params.authorId
  book.authors.id(authorId).remove()
  const response = book
  res.json({ status, response })
})


module.exports = router