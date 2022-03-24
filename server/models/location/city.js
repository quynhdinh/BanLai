var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String
}, { timestamps: true });

module.exports = mongoose.model('City', schema);