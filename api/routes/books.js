const router = require('express').Router()
// const { generate: generateId } = require('shortid') - don't need this anymore
const Books = require('../models/books')

// sample data
// const books = [
//   {
//     id: 'j9U3iNIQi',
//     title: 'The Colour of Magic',
//     published: 1983,
//     authors: [
//       {
//         name: 'Sir Terry Pratchett',
//         dob: '04-28-1948'
//       }
//     ]
//   },
//   {
//     id: 'ubQnXOfJV',
//     title: 'Stardust',
//     published: 1997,
//     authors: [
//       {
//         name: 'Neil Gaiman',
//         dob: '11-10-1960'
//       }
//     ]
//   }
// ];

// get all books
router.get('/', async (req, res, next) => {
  const status = 200
  // get all books
  const response = await Books.find()
  // return status and all books
  res.json({ status, response })
})

// add books
router.post('/', async (req, res, next) => {
  const status = 201
  // add book entry
  Books.create(req.body).then(response => {
    res.json({ status, response })
  }).catch(error => {
    // report back error if can't add it
    console.error(error)
    const e = new Error('Something went wrong!')
    e.status = 400
    next(e)
  })
})

// get specific book by ID
router.get('/:id', async (req, res, next) => {
  const status = 200
  // find book by ID
  const response = await Books.findOne({ _id: req.params.id })
  // return status and book entry
  res.json({ status, response })
})

// update a book
router.put('/:id', async (req, res, next) => {
  const status = 201
  // find book by ID and update it with new data
  const response = await Books.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title,
    published: req.body.published,
    authors: req.body.authors
  }, { 
    new: true 
  })
  // return status and the updated book entry
  res.json({ status, response })
})

// delete a book
router.delete('/:id', async (req, res, next) => {
  const status = 200
  // find the book by ID and deelte it
  const response = await Books.findOneAndDelete({ _id: req.params.id })
  // return status and deleted entry
  res.json({ status, response })
})

module.exports = router