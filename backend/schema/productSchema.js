const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:  { type: String, required: true },

    price:  { type: String, required: true },

    description:  { type: String, required: true },
    
    image :{
      type: String, required: true
      },
   
    // sellerName:  { type: String, required: true },
    
 
   
   
    ratings: String,
   
    
    seller: String,
    
    // numOfReviews: String,
    createdAt: Date
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;