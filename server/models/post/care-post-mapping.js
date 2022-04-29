const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new mongoose.Schema({
    zaloId: {type: String, required: true},
    postId: {type: String, required: true}
}, {collection: 'carepostmapping'});

module.exports = mongoose.model('carepostmapping', schema);