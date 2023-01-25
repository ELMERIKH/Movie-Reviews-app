
const app=require('./app');

require('dotenv').config();
const mongoose= require('mongoose');

let myport = process.env.PORT

const db =process.env.DB

mongoose.connect(db,()=>console.log(`connected to DB ${db}`));
 


app.listen(myport,()=>console.log(`server running on ${myport}`))
