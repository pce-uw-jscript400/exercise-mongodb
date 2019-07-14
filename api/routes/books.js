const router = require('express').Router()
//const { generate: generateId } = require('shortid')
const Books = require('../models/books')

router.get('/',async (req, res, next) => {
  const status = 200
  try{
    const response = await Books.find()
    res.json({ status, response })
  }catch(error){
    console.log(error.message)
      const e = new Error(error.message)
      e.status = 500
      next(e)
  }
})

router.post('/', async (req,res, next)=>{
  const status = 201
  try{
    const response = await Books.create(req.body)
    res.json({status, response})
  }catch(error){
    console.log(error.message)
    const e = new Error(error.message)
    e.status = 400
    next(e)
  }
})

router.get('/:id',async (req, res, next) => {
  const status = 200
  const response = await Books.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id',async (req, res, next) => {
  const status = 200
  try{
    const response = await Books.findByIdAndUpdate({_id:req.params.id},{title:req.body.title, published:req.body.published},{new:true})
    res.json({ status, response })
  }catch(error){
    console.log(error.message)
    const e = new Error(error.message)
    e.status = 400
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  try{
    const response = await Books.findByIdAndDelete(req.params.id)
    res.json({ status, response })
  }catch(error){
    console.log(error.message)
    const e = new Error(error.message)
    e.status = 400
    next(e)
  }
})

module.exports = router