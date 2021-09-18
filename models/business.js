const mongoose = require("mongoose")

const BusinessSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true, 
            unique: true
        }, 
        businessOwnerId: {
            type: String, 
            required: true, 
            unique: false
        },
        businessDescription: {
            type: String,
        },
        businessAddress: {
            type: String
        },
        businessMobileNumber: {
            type: Number
        },
        keywords: {
            type: [String], 
            required: false
        },
        businessType: {
            type: String, 
            required: true
        },
        businessWebsiteUrl: {
            type: String, 
            require: false
        }, 
        connectionRequests: {
            required: false, 
            type: [String], 
            default: []
        },
        verified: {
            type: Number,
            default: 1
        }
    }, {strict: false, timestamps: true}
);

module.exports = mongoose.model("Business", BusinessSchema)