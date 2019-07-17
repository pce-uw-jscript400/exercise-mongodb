const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../model/books')


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


//BOOKS ENDPOINTS

//GET - Finds all books
router.get('/', async (req, res, next) => {

  Books.find({...req.query}).select('title published authors')//Promise
  .then(response => {
    const status = 200
    const route_path = '/'
    res.json({ status, route_path, response })
  })
  .catch(error => {
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })

  //Async Await version
  //  try {
  //    const status = 200
  //    const response = await Books.find()
  // //.select('title start_year season_count')
  //    res.status(status).json({ status, response })
  //  } catch (error) {
  //    error.status = 500
  //    error.message = `${req.method} ${req.path} failed. Internal server error.`
  //    next(error)
  //  }

})

//POST - Creates a new book
router.post('/', (req, res, next) => {

  Books.create(req.body)
  .then(response => {
    const status = 200
    const route_path = '/'
    res.json({status, route_path, response})
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })

})

//GET - Retrieves a book based on the ID
router.get('/:id', (req, res, next) => {

  Books.findById(req.params.id)//Promise
  .then(response => {
    const status = 200
    const route_path = '/:id'
    res.json({status, route_path, response})
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)

  })


})

// PUT - Updates a book based on the ID
router.put('/:id', (req, res, next) => {

  Books.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new:true})//Promise
  .then(response => {
    const status = 200
    const route_path = '/:id'
    res.json({status, route_path, response})
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })

})

// DELETE - Removes a book based on the ID
router.delete('/:id', (req, res, next) => {

  Books.findOneAndDelete({_id: req.params.id})//Promise
  .then(response => {
    const status = 200
    const route_path = '/:id'
    res.json({status, route_path, response})
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })

})




//AUTHORS ENDPOINTS



//GET - Certain book authors endpoint
router.get('/:bookId/authors', (req, res, next) => {

  Books.findById(req.params.bookId).select('title authors._id authors.name authors.dob')//Promise
  .then(response => {
    const status = 200
    const route_path = '/:bookId/authors'
    res.json({ status, route_path, response })
  })
  .catch(error => {
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })


})


//GET - Getting authors of a certain book after passing in boodId and authorId
router.get('/:bookId/authors/:authorId', (req, res, next) => {

  Books.findOne({_id:req.params.bookId})//Promise
  .then(response => {
    const status = 200
    const route_path = '/:bookId/authors/:authorId'
    const message = `Successfully retrieved author`

    const author = response.authors.find(({ _id }) => req.params.authorId == _id)

    res.json({ status, route_path, response: author })

  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went wrong with the GET request of specific author.')
    e.status = 400
    next(e)
  })

})







//POST - Adding new authors to certain book - MAY NEED A SECOND LOOK
router.post('/:bookId/authors', (req, res, next) => {

  //The $push part on this was something i got from my google search, i dont exactly understand how its working so I will use an alternative way of adding new authors to the parent document
  // Books.findOneAndUpdate({_id:req.params.bookId}, {$push: {'authors': {...req.body}}}, {new:true})
  // .then(response => {
  //   const status = 200
  //   const route_path = '/:bookId/authors'
  //   res.json({status, route_path, response})
  // })
  // .catch(error => {
  //   //Error Handling
  //   console.error(error)
  //   const e = new Error('Somethings went bad')
  //   e.status = 400
  //   next(e)
  // })


  Books.findOne({_id:req.params.bookId})//Promise
  .then(parent => {
    const status = 201
    const message = `Successfully created a new author`
    const route_path = '/:bookId/authors'

    //Add new subdocument to the authors array using the req.body that is passed
    const child = parent.authors.push({...req.body})
    //Save parent so that the push we did to the subdocument gets saved to database
    parent.save()

    res.json({status, message, route_path, response: parent}) //Full JSON Response
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
  })

})



//PUT - Modifying an existing author given bookID and authorID
router.put('/:bookId/authors/:authorId', (req, res, next) => {

  Books.findOne({_id: req.params.bookId}) //Promise
  .then(parent => {
    const status = 204
    const message = `Successfully updated the author`
    const route_path = '/:bookId/authors' //Adding this so that i know which route that is being reach per request I make in postman

    //Get the child that has an id matching the authorId
    const child = parent.authors.id(req.params.authorId)
    //Update child with the values of the request body
    child.set({...req.body})
    //Save parent so that the child update changes the database

    parent.save()

    res.json({status, message, route_path, response: parent}) //Full JSON Response

  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went wrong with the UPDATING of a specific author')
    e.status = 400
    next(e)
  })

})

//DELETE - /api/books/:bookId/authors/:authorId
router.delete('/:bookId/authors/:authorId', (req, res, next) => {

  Books.findOne({_id: req.params.bookId}) //Promise
  .then(parent => {
    const status = 200
    //Adding this so that i know which route that is being reach per request I make in postman
    const route_path = '/:bookId/authors'
    const message = `Successfully removed the author`

    //Find the author that matches with the authorId params and pull from database
    const child = parent.authors.pull(req.params.authorId)
    //Save the parent document so that the removal of the child document gets saved
    parent.save()

    res.json({status, message, route_path, response: parent}) //Full JSON Response

  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went wrong with the DELETION of an author')
    e.status = 400
    next(e)
  })

})



module.exports = router
