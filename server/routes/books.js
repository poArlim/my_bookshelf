const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");
const multer = require("multer");
const gm = require('gm');
const { auth } = require("../middleware/auth");

//=================================
//             Book
//=================================

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg'){
            return cb(res.status(400).end('only image file is allowed'), false);
        } 
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err});
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
    })
})

router.post('/resizefiles', (req, res) => {
    gm(req.body.url)
        .resize(318, 238, '!')
        .write(req.body.url, err => {
            if (err) {
                return res.json({ success: false, err});
            }
            return res.json({ success: true, url: req.body.url});
        });
})

router.post('/duplicateCheck', (req, res) => {
    Book.findOne({ userFrom: req.body.userFrom, bookTitle: req.body.bookTitle }, (err, doc) => {
        if(err) return res.status(400).send(err);
        else if(doc == null) return res.status(200).json({ isDuplicate : false, bookTitle: req.body.bookTitle });
        else return res.status(200).json({ isDuplicate: true, bookTitle: req.body.bookTitle });
    })
})

router.post('/addBook', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    })
})

router.post('/editBook', (req, res) => {
    Book.findOneAndUpdate({ userFrom: req.body.userFrom, bookTitle: req.body.originTitle }, 
        { bookTitle: req.body.bookTitle, bookAuthor: req.body.bookAuthor, bookLink: req.body.bookLink, bookReview: req.body.bookReview, thumbnailPath: req.body.thumbnailPath },
        (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
})

router.post('/getBooks', (req, res) => {
    Book.find({ 'userFrom': req.body.userFrom, 'isRead': req.body.isRead })
        .exec((err, books) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, books });
        })
})

router.post('/getBookDetail', (req, res) => {
    Book.find({ 'userFrom': req.body.userFrom, 'bookTitle': req.body.bookTitle })
        .exec((err, bookDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, bookDetail });
        })
})

router.post('/removeBook', auth, (req, res) => {
    Book.findOneAndDelete({ userFrom: req.body.userFrom, bookTitle: req.body.bookTitle })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true });
        })
})

module.exports = router;
