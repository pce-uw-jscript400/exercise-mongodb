const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String
    }
})

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    published:{
        type: Number,
        required:true
    },
    authors:[authorSchema]
},
{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})



module.exports = mongoose.model('Books', bookSchema)