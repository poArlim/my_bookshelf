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

router.post('/getBooks', (req, res) => {
    Book.find({ 'userFrom': req.body.userFrom })
        .exec((err, books) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, books });
        })
})

module.exports = router;
