const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    zaloId: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    status: {type: String, default:'active', required: true},
    condition: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    productDetails: Object,
    images: [{
        type: Object,
        required: true
    }]
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);