

const mongoose = require('mongoose');

const fertilizersSchema = mongoose.Schema({
    name:  { type: String, required: true },

    price:  { type: String, required: true },

    description:  { type: String, required: true },
    
    image : {
        public_id:{
            type : String,  
        },
        url:{
            type : String,
        }
    },


    quantity: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },

    ratings: String,
   
    
    seller: String,


    numOfReviews: String,
    createdAt: Date
});

const Items = mongoose.model('fertilizers', fertilizersSchema);
module.exports = Items;



