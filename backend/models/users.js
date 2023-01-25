

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
  username:{
    type: String,
    required: true,
    unique: true
},
  email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: "default.jpg"
    }
}, {
    
});

module.exports = mongoose.model('User', userSchema);
