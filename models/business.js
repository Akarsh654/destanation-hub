const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        business_name: {
            type: String,
            required: true
        }, 
        businessEmail: {
            type: String, 
            required: true, 
            unique: true
        }, 
        password: {
            type: String, 
            required: true,
        },
        phoneNumber: {
            type: Number
        },
        businessDescription: {
            type: String,
        },
        businessAddress: {
            type: String
        },
        
        keywords: {
            type: String, 
            required: false
        },
        interests: {
            type: String, 
            required: false
        },
        resetPasswordExpires: {
            type: Date
        }

    }, {strict: false, timestamps: true}
);

module.exports = mongoose.model("Business", UserSchema)