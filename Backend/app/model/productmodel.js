const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({

    Image:
    {
        type:String        
        
    },
    Name:
    {
        type:String
    
    },
    Quantity:{
        type:Number
        
    },
    Price:{
        type:Number
       
    },
},{
    collection:"product"
});


module.exports = mongoose.model('Product', ProductSchema);

