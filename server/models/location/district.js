var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    cityId: Object,
    name: String,
}, { timestamps: true });

module.exports = mongoose.model('District', schema);