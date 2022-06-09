const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  zaloId: {type: String, required: true},
  postId: {type: String, required: true},
  count: {type: Number, default: 0},
}, {collection: 'viewedpostmapping', versionKey: false});

module.exports = mongoose.model('viewedpostmapping', schema);