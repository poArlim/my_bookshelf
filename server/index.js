'use strict';
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
 
// // Check server
// app.get('/api', (req, res) => {
//     res.send('Hello World! ~~');
// })






app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})