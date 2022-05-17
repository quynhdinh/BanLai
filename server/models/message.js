const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    owner: {type: String, required: true},
    partner: {type: String, required: true},
    type: {type: String, required: true},
    postId: {type: String, required: true},
}, {timestamps: true});


module.exports = mongoose.model('Message', schema);