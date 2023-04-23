
const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const User = require('../models/users');

router.post('/create', async (req, res) => {
    try {
      const { text, movie,email } = req.body;
      const user = await User.findOne({ email: email });
  if (!user) {
    res.status(500).send("Error creating comments");
   
  }

  
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


router.get('/getall', async (req, res) => {
     const movie = req.query.movie;
        Comment.find({ movie: movie }, (err, comments) => {
            if (err) return res.status(500).send("Error retrieving comments");
            res.send({ comments });
          });
   
  });



module.exports = router;
