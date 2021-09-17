const mongoose = require("mongoose")

const BusinessSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true, 
            unique: true
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
        businessWebsiteUrl: {
            type: String, 
            require: false
        }
    }, {strict: false, timestamps: true}
);

module.exports = mongoose.model("Business", BusinessSchema)