const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "enable"
    }
});

module.exports = mongoose.model('FAQ', FAQSchema);