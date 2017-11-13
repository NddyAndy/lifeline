var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Post = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
    comments:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", Post);