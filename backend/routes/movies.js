const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Create a new movie
router.post('/create', async (req, res) => {
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

// Get all movies
router.get('/getall', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.status(200).json({ movies });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const movies = await Movie.findById(id);
        if (movies) {
            res.status(200).json({ movies });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Update a movie by ID
router.patch('/update-:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await Movie.update({ _id: id }, { $set: updateOps }).exec();
        res.status(200).json({ message: 'Movie updated', result });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Delete a movie by ID
router.delete('/delete-:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Movie.remove({ _id: id }).exec();
        res.status(200).json({ message: 'Movie deleted', result });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

module.exports = router;
