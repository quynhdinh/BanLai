const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  sender: {type: String, required: true},
  receiver: {type: String, required: true},
  postId: {type: String, required: true},
}, {timestamps: true, versionKey: false});


module.exports = mongoose.model('Message', schema);