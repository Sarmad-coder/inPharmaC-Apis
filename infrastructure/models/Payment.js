const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    title: {
        type: String,

    },
    description: {
        type: String,

    },

});

module.exports = mongoose.model("Payment", paymentSchema);
