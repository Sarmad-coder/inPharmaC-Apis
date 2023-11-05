const mongoose = require('mongoose');

const commissionSchema = mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId, ref: "Categories" 
    },
   startPrice:{
        type:String,
        default:""
    },
    endPrice:{
        type: String,
        default: ""
    },
    platformCharges:{
        type: Number,
        default: ""
    }
});

module.exports = mongoose.model("Commission", commissionSchema);