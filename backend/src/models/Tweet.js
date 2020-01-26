const mongose = require('mongoose');

const TweetSchema = new mongose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongose.model('Tweet', TweetSchema);