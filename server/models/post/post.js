var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    categoryId: {type: Object, required: true},
    subCategoryId: {type: Object, required: true},
    userId: {type: Object, required: true},
    city: {type: Object, required: true},
    district: {type: Object, required: true},
    status: {type: Object, required: true},
    condition: {type: Object, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    ViewCount: {type: Number, default: 0},
    productDeTails: Object
}, {timestamps: true});

module.exports = mongoose.model('Post', schema);