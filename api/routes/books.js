const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Books = require('../models/books')

// Following are the details of the Books API

// Post some data into the Books collection and do a get to retreive the data
// Before calling post : books = []
// After calling post twice with two books the successive GET returns :
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "-z4GidEdD",
            "title": "A Brief History Of Time",
            "published": 1988,
            "authors": [
                {
                    "_id": "5d2dd630197e0336a8d43b24",
                    "name": "Stephen Hawking",
                    "dob": "01-08-1942"
                }
            ],
            "created_at": "2019-07-16T13:50:40.475Z",
            "updated_at": "2019-07-16T13:50:40.475Z",
            "__v": 0
        }
    ]
}
 */
router.post('/', async (req, res, next) => {
  const status = 201;
  try {
    const response = await Books.create({ _id: generateId(), ...req.body });
    res.json({ status, response });
  }
  catch(error) {
    console.error(error);
    const e = new Error('Something went wrong, Unable to POST');
    e.status = 400;
    return(e);
  }
})

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Books.find();
  
  res.json({ status, response })
})


// Do a GET by a specific book ID. The state of the database is as shown in the comment above with two books
// Now doing a get for book with BookId= BSgAN5ysK(http://localhost:5000/api/books/BSgAN5ysK) will return
/*
{
    "status": 200,
    "response": {
        "_id": "BSgAN5ysK",
        "title": "Becoming",
        "published": 2018,
        "authors": [
            {
                "_id": "5d2dd5dd197e0336a8d43b23",
                "name": "Michelle Obama",
                "dob": "01-07-1964"
            }
        ],
        "created_at": "2019-07-16T13:49:17.421Z",
        "updated_at": "2019-07-16T13:49:17.421Z",
        "__v": 0
    }
}
 */
router.get('/:id', async (req, res, next) => {
  const status = 200  
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

// Lets first post one more book so before put the books collection looks like
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "-z4GidEdD",
            "title": "A Brief History Of Time",
            "published": 1988,
            "authors": [
                {
                    "_id": "5d2dd630197e0336a8d43b24",
                    "name": "Stephen Hawking",
                    "dob": "01-08-1942"
                }
            ],
            "created_at": "2019-07-16T13:50:40.475Z",
            "updated_at": "2019-07-16T13:50:40.475Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd83af8c5e33a28520b0e",
                    "name": "Davidleblanc"
                },
                {
                    "_id": "5d2dd83af8c5e33a28520b0d",
                    "name": "MichaelHoward"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T13:59:22.704Z",
            "__v": 0
        }
    ]
}
 */
// Now grab the third book by ID and update the names of the authors to have a space between their first and last name. This will
// return the updated data for the book Writing Secure Code and the get request now looks like
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "-z4GidEdD",
            "title": "A Brief History Of Time",
            "published": 1988,
            "authors": [
                {
                    "_id": "5d2dd630197e0336a8d43b24",
                    "name": "Stephen Hawking",
                    "dob": "01-08-1942"
                }
            ],
            "created_at": "2019-07-16T13:50:40.475Z",
            "updated_at": "2019-07-16T13:50:40.475Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                },
                {
                    "_id": "5d2dd8d2f8c5e33a28520b0f",
                    "name": "Michael Howard"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T14:01:54.605Z",
            "__v": 0
        }
    ]
}
 */
router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndUpdate({
    _id : req.params.id
  },
  {
    title : req.body.title,
    published : req.body.published,    
    authors : req.body.authors
  },
  {
    new : true
  })
  res.json({ status, response })
})

// Now lets go ahead and delete a book by its Id.
// The books collection is now as shown in the previous comment
// Lets delete A Brief History of Time by its ID using http://localhost:5000/api/books/-z4GidEdD 
// The corresponding GET will be
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                },
                {
                    "_id": "5d2dd8d2f8c5e33a28520b0f",
                    "name": "Michael Howard"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T14:01:54.605Z",
            "__v": 0
        }
    ]
}
 */
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Books.findOneAndDelete({
    _id : req.params.id
  })

  res.json({ status, response })
})


// The following section describes the API's for authors
// Get only the author part for a specific book
// The books collection is as shown in the previous comment. Now if we want to get the authors for
// Becoming we do the following http://localhost:5000/api/books/BSgAN5ysK/authors and the response is
/*
{
    "status": 200,
    "response": {
        "_id": "BSgAN5ysK",
        "authors": [
            {
                "_id": "5d2dd5dd197e0336a8d43b23",
                "name": "Michelle Obama",
                "dob": "01-07-1964"
            }
        ]
    }
}
 */
router.get('/:bookId/authors', async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.bookId, {authors : 1})

  res.json({status, response})
})

// Now if a book has mutiple authors and you want to get the details of a specific author
// Lets try to get the details for only one author for Writing Secure Code by sending
// http://localhost:5000/api/books/kRTOw6SK4/authors/5d2dd8d2f8c5e33a28520b10 and the response is
/*
{
    "status": 200,
    "response": [
        {
            "_id": "kRTOw6SK4",
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                }
            ]
        }
    ]
}
 */
router.get('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.find( {"_id" :req.params.bookId} , {authors : {$elemMatch : {_id : req.params.authorId}}})

  res.json({status, response})
})

// Find a book and add a new author to an existing book then we can use this api
// Lets say I want to add a new author (Soma) to an existing book Writing Secure Code I can use this api.
// The state of books before the call is as mentioned in the previous comment.
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                },
                {
                    "_id": "5d2dd8d2f8c5e33a28520b0f",
                    "name": "Michael Howard"
                },
                {
                    "_id": "5d2e01242210753bc82354a2",
                    "name": "Soma"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T16:53:56.545Z",
            "__v": 0
        }
    ]
}
 */
router.post('/:bookId/authors', async (req, res, next) =>{
  const status = 201
  try {
    const response = await Books.findByIdAndUpdate(req.params.bookId, {$push : {"authors" : req.body}}, {new : true})
    res.json({status, response})
  }
  catch(error) {
    console.error(error);
    const e = new Error('Something went wrong, Unable to POST');
    e.status = 400;
    return(e);
  }
})

// Now lets say I want to update the details of an existing autor for a specific book. I would do it using this
// put request. The book collection is as it was in the previous comment. Now lets say I want to update the name of one of the authors
// I want to update autor 3 from Soma to Somanath, then I would use this request. The GET request after this operation returns
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                },
                {
                    "_id": "5d2dd8d2f8c5e33a28520b0f",
                    "name": "Michael Howard"
                },
                {
                    "_id": "5d2e0d6190ed7c424c210857",
                    "name": "Somanath"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T17:46:09.785Z",
            "__v": 0
        }
    ]
}
 */
router.put('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  const response = await Books.updateOne({"_id" : req.params.bookId, "authors._id" : req.params.authorId}, {$set : {"authors.$" : req.body}}, {new : true})

  res.json({status, response})
})

// Now lets say I want to delete a specific autor from the book collection. Then I will use this API
// The GET request after executing this call returns
/*
{
    "status": 200,
    "response": [
        {
            "_id": "BSgAN5ysK",
            "title": "Becoming",
            "published": 2018,
            "authors": [
                {
                    "_id": "5d2dd5dd197e0336a8d43b23",
                    "name": "Michelle Obama",
                    "dob": "01-07-1964"
                }
            ],
            "created_at": "2019-07-16T13:49:17.421Z",
            "updated_at": "2019-07-16T13:49:17.421Z",
            "__v": 0
        },
        {
            "_id": "kRTOw6SK4",
            "title": "Writing Secure Code",
            "published": 2001,
            "authors": [
                {
                    "_id": "5d2dd8d2f8c5e33a28520b10",
                    "name": "David LeBlanc"
                },
                {
                    "_id": "5d2dd8d2f8c5e33a28520b0f",
                    "name": "Michael Howard"
                }
            ],
            "created_at": "2019-07-16T13:59:22.704Z",
            "updated_at": "2019-07-16T17:56:12.243Z",
            "__v": 0
        }
    ]
}
 */
router.delete('/:bookId/authors/:authorId', async (req, res, next) => {
  const status = 200
  console.log(req.params.bookId)
  console.log(req.params.authorId)
  const response = await Books.updateOne({"_id" : req.params.bookId}, {$pull : {"authors" : {"_id" : req.params.authorId}}}, {new : true}) 

  res.json({status, response})
})

module.exports = router