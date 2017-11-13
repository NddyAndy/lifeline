var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
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