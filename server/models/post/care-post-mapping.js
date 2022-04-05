const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new mongoose.Schema({
    zaloId: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
}, {collection: 'CarePostMapping'});

module.exports = mongoose.model('CarePostMapping', schema);