const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    zaloId: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    status: {type: String, required: true},
    images: {type: Array, required: true},
    condition: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    viewCount: {type: Number, default: 0},
    productDetails: Object
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);