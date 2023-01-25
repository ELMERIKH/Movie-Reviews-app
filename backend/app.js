const express = require('express');
const products = require('./models/products');
const app = express();
const cors= require("cors");

const jwt = require('jsonwebtoken');
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))


//api---------------
app.use(express.json());

const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const commRoutes = require('./routes/comments');
const raitingsRoutes = require('./routes/ratings');
app.use('/api/auth', authRoutes);
app.use('/api/rating', raitingsRoutes);
app.use('/api/comments', commRoutes);
app.use('/api/movie', movieRoutes);

//app.use((req, res, next) => {
 // try {
 //   const token = req.headers.authorization.split(' ')[1];
  //  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //  req.userData = decoded;
  //  next();
//  } catch (error) {
 //  return res.status(401).json({ message: 'Auth failed' });
 //   }
 // });


module.exports = app;  