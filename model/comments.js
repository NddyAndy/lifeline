var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
    body: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", Comment);