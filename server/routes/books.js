const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");

//=================================
//             Book
//=================================

router.post('/addBook', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    })
})

router.post('/editBook', (req, res) => {
    Book.findOneAndUpdate({ userFrom: req.body.userFrom, bookTitle: req.body.originTitle }, 
        { bookTitle: req.body.bookTitle, bookAuthor: req.body.bookAuthor, bookLink: req.body.bookLink, bookReview: req.body.bookReview },
        (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
})

router.post('/getBooks', (req, res) => {
    Book.find({ 'userFrom': req.body.userFrom })
        .exec((err, books) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, books });
        })
})

router.post('/getBookDetail', (req, res) => {
    Book.find({ 'userFrom': req.body.userFrom, 'bookTitle': req.body.bookTitle })
        .exec((err, bookDetail) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, bookDetail });
        })
})

router.post('/removeBook', (req, res) => {
    Book.findOneAndDelete({ userFrom: req.body.userFrom, bookTitle: req.body.bookTitle })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true });
        })
})

module.exports = router;
