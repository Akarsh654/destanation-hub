const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
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
        gameSessionId: {
            type: String,
        },
        repId: {
            type: String
        },
        resetPasswordToken: {
            type: String, 
            required: false
        },
        role: {
            type: String
        },
        token: {
            type: Number, 
            default: 0  
        },
        active: {
            type: Boolean
        },
        resetPasswordExpires: {
            type: Date
        }

    }, {strict: false, timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)