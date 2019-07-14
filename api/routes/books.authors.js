const router = require('express').Router({ mergeParams: true });
const Books = require('../models/books');

const publicKey = 'name dob';

router.get('/', async(req, res, next) => {
    const status = 200;
    const { authors } = await Books.findById(req.params.bookId);

    // Can not determine why this .select() is not working
    // const { authors } = await Books.findById(req.params.bookId).select(publicKey);

    res.json({ status, authors});
});

router.get('/:id', async(req, res, next) => {
    const status = 200;
    const book = await Books.findById(req.params.bookId);
    const authors = await book.authors.id(req.params.id);

    res.json({ status, authors})
});

router.post('/:id', async(req, res, next) => {
    const status = 201;
    const book = await Books.findById(req.params.bookId);
    book.authors.push(req.body);
    await book.save();

    const author = book.authors[book.authors.length - 1];
    
    res.json({ status, author })
});

router.put('/:id', async(req, res, next) => {
    const status = 200;
    const book = await Books.findById(req.params.bookId);
    const author = book.authors.id(req.params.id);

    Object.assign(author, req.body);
    await book.save();

    res.json({ status, author });
}); 

router.delete('/:id', async(req, res, next) => {
    const status = 200;
    const book = await Books.findById(req.params.bookId);
    const author = book.authors.id(req.params.id).remove();

    book.save();
    res.json({ status, author });
});

module.exports = router;
