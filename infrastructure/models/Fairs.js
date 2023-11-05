const mongoose = require("mongoose");

const fairSchema = mongoose.Schema({
    price: {
        type: Number,
        default: 0
    },

});

module.exports = mongoose.model("Fair", fairSchema);
