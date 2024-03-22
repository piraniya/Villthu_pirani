const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    plantImage : {
        public_id:{
            type : String,  
        },
        url:{
            type : String,
        }
    },
    plantName  : {
        type : String,
        required : true  
    },

    fertilizerType  : {
        type : String,
        required : true
    },
    soilType  : {
        type : String,
        required : true
    },

    botanicalName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        // required : true
    },
    categories : [
        {
            type : String,
            required : true
        }
    ]
});

var Items = mongoose.model('plants',plantSchema);
module.exports  = Items;






