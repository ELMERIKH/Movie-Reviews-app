
const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// Create a new comment
router.post('/create', async (req, res) => {
    try{
        const { text, user, movie } = req.body;
        const comment = new Comment({
            text,
            user,
            movie
        });
        const savedComment = await comment.save();
        res.status(201).json({ message: 'Comment created successfully', comment: savedComment });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Get all comments
router.get('/getall', async (req, res) => {
    try{
        const comments = await Comment.find().populate('user', '-password').populate('movie');
        res.status(200).json({ comments });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Get a single comment by ID
router.get('/get-:id', async (req, res) => {
    try{
        const id = req.params.id;
        const comment = await Comment.findById(id).populate('user', '-password').populate('movie');
        if (comment) {
            res.status(200).json({ comment });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Update a comment by ID
router.patch('/update-:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await Comment.update({ _id: id }, { $set: updateOps }).exec();
        res.status(200).json({ message: 'Comment updated', result });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

// Delete a comment by ID
router.delete('/delete-:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Comment.remove({ _id: id }).exec();
        res.status(200).json({ message: 'Comment deleted', result });
    }catch(err){
        res.status(500).json({ error: err });
    }
});

module.exports = router;
