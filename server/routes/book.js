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

router.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ userId: req.body.userId }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "아이디가 존재하지 않습니다."
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀립니다." });
    
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
        
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

module.exports = router;
