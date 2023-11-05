const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    
    title:{
        type: String,
        default: ""
    },
    image:{
        type: String,
        default: ""
    },
    description:{
        type: String,
        default: ""
    },
    // price:{
    //     type: String,
    //     default: ""
    // },
    // platformCharges:{
    //     type: Number,
    //     default: ""
    // }
});

module.exports = mongoose.model('Categories', categoriesSchema);