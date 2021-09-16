const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true
        }, 
        email: {
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
            type: [String], 
            required: false
        },
        interests: {
            type: [String], 
            required: false
        },
        role: {
            type: Number, 
            required: true
        },
        resetPasswordExpires: {
            type: Date
        }

    }, {strict: false, timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)