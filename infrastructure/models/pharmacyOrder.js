const mongoose = require("mongoose");

const pharmacyOrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },
    OrderMethod: {
        type: String,
        default:""
    },
    
    paymentMethod: {
        type: String,
        default:""
    },
    OrderStatus: {
        type: String,
        default:"pending"
    },
    images: {
        type: Array
    },
    injuryImages: {
        type: Array
    },
    prescriptionType: {
        type: String,
        default:""
    },
    currLat: {
        type: String,
        default:""
    },
    currLon: {
        type: String,
        default:""
    },
    currLocation: {
        type: String,
        default:""
    },
    pharmacyId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy",
        
        default:null
    },
    voiceMessage: {
        type: String,
        default:""
    },
 
    pharmacyVoice: {
        type: String,
        default:""
    },
    pharmacyVoiceTime: {
        type: String,
        default:""
    },
    age: {
        type: String,
        default:""
    },
    gender: {
        type: String,
        default:""
    },
    pharmaId: {
        type: String,
        default:""
    },
    availability: {
        type: String,
        default:""
    },
    medicineQuantity: {
        type: String,
        default:""
    },
    pharmacyComment: {
        type: String,
        default:""
    },
    
    comments: {
        type: String,
        default:""
    },
    totalPrice: {
        type: String,
        default:""
    },
    platformFee: {
        type: String,
        default:""
    },
    acceptedOffer: {
        type: Boolean,
        default:false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("pharmacyOrder", pharmacyOrderSchema);

