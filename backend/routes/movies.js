const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');




router.get('/getall', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.status(200).json({ movies });
    }catch(err){
        res.status(500).json({ error: err });
    }
});


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




module.exports = router;
