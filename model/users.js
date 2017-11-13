var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        enum:['standard-user', 'doctor', 'admin'],
        default: 'standard-user',
        required: false
    },
    created_at:{
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model("User", User);