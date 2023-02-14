
const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const User = require('../models/users');
// Create a new comment
router.post('/create', async (req, res) => {
    try {
      const { text, movie,email } = req.body;
      const user = await User.findOne({ email: email });
  if (!user) {
    res.status(500).send("Error creating comments");
   
  }

  // Create the comment document with the user ID
  const comment = new Comment({
    text,
    user: user._id,
    email:email,
    movie
    
  });
     
      await comment.save();
      res.send({ comment });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  });

// Get all comments
router.get('/getall', async (req, res) => {
     const movie = req.query.movie;
        Comment.find({ movie: movie }, (err, comments) => {
            if (err) return res.status(500).send("Error retrieving comments");
            res.send({ comments });
          });
   
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
