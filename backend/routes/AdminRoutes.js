const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Movie = require('../models/movie');





const checkAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { role } = decoded;
        if (role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


const checkJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.decoded = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

  
  router.get('/admin', checkJWT, checkAdmin, (req, res) => {
     
  });
  router.post('/Create',checkJWT,checkAdmin, async (req, res) => {
    try{ 
        const { title, description, release_date, rating, image } = req.body;
        const movies = new Movie({
            title,
            description,
            release_date,
            rating,
            image
        });
        const savedMovie = await movies.save();
        res.status(201).json({ message: 'Movie created successfully', movies: savedMovie });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

    router.patch("/update/:id", (req, res) => {
         try{   const movieId = req.params.id;
            const updatedMovie = req.body;
          
            // Update the movie in the database
            Movie.findByIdAndUpdate(movieId, updatedMovie, { new: true }, (err, movie) => {
              if (err) return res.status(500).send(err);
              return res.send(movie);
            });
          
    }catch(err){
        res.status(500).json({ error: err });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Movie.remove({ _id: id }).exec();
        res.status(200).json({ message: 'Movie deleted', result });
    }catch(err){
        res.status(500).json({ error: err });
    }
});
  module.exports = router;

