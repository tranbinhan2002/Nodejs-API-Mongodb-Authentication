const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        name: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
postSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('Post',postSchema);