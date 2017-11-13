var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Post = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required:false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", Post);