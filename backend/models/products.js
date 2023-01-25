const mongoose =require('mongoose');

  let Schema =mongoose.Schema;
const productSchema = new Schema({
category:{
    type:String,
    required:true,
    trim: true
},
name:{
    type:String,
    required:true,
    trim: true
},
prix:{
    type:Number
    
    
    
}


})

module.exports = mongoose.model('Product',productSchema);
