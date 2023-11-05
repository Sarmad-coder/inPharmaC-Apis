const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    status: {
        type: String,
        default: "enable"
    }
});

module.exports = mongoose.model('FAQ', FAQSchema);