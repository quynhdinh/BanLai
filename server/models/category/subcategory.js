var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    categoryId: {type: Object, required: true},
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('SubCategory', schema);