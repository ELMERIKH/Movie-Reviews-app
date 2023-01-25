const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/Movie', { useNewUrlParser: true, useUnifiedTopology: true });

const email = 'admin@gmail.com';
const password = '1234567890';
const role = 'admin';
const avatar = "default.jpg"

bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
        console.log(err);
    } else {
        const user = new User({
            email,
            password: hashedPassword,
            role,
            avatar
        });
        const savedUser = await user.save();
        console.log(`Admin user created successfully: ${savedUser}`);
        mongoose.connection.close();
    }
});
