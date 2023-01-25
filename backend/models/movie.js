const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('Movie', movieSchema);
