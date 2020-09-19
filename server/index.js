const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
 
// Check server
// app.get('/api', (req, res) => {
//     res.send('Hello World! ~~');
// })

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  })
})

app.post('/api/users/login', (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "아이디가 존재하지 않습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀립니다." });

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})




app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})