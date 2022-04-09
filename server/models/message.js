const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    type: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
}, {timestamps: true});


module.exports = mongoose.model('Message', schema);