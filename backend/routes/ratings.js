const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');


router.patch('/:id', (req, res) => {
    const id = req.params.id;
     
     const newRating = req.body.rating * 0.001 + req.body.rating;


    Movie.findByIdAndUpdate(id, { $set:{newRating} } , { new: true })
        .then(movie => {
            res.status(200).json({ message: 'Movie rated successfully', movie });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
module.exports= router;