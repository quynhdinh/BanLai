const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  zaloId: {type: String, required: true},
  postId: {type: String, required: true}
}, {collection: 'carepostmapping', timestamps: true, versionKey: false});

module.exports = mongoose.model('carepostmapping', schema);