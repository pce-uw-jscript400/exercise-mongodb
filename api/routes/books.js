const router = require('express').Router()
// const { generate: generateId } = require('shortid')
const Books = require('../models/books')


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

router.get('/', async (req, res, next) => {
  const status = 200
  // const query = req.query
  // const response = await Books.find({...query})
  //  .select('id title published authors')

  const response = await Books.find()
  res.json({ status, response })

})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Books.create(
      req.body
    )
  
    res.json({ status, response })
  }catch(error ) {
      console.error(error)
      const e = new Error('Bad request')
      e.status = 400
      next (e)
    }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Books.updateOne(
  //   {_id:req.params.id}, 
  //   {
  //     title: req.body.title,
  //     published: req.body.published,
  //     authors: req.body.authors
  //   },
  // )  // only returns cluster modification, not new doc
  const response = await Books.findOneAndUpdate(
    {_id: req.params.id,}, 
    {
      title: req.body.title,
      published: req.body.published,
      authors: req.body.authors
    }, 
    {new: true})
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({_id: req.params.id})


  res.json({ status, response })
})

module.exports = router