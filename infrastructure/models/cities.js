const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        default:""
    },
    status: {
        type: String,
        default: "enable"
    }
});

module.exports = mongoose.model('City', citySchema);