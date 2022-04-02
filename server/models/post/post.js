var mongoose = require('mongoose');
const {Schema} = mongoose;

var schema = new mongoose.Schema({
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    status: {type: String, required: true},
    condition: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    viewCount: {type: Number, default: 0},
    productDetails: Object
}, {timestamps: true});

module.exports = mongoose.model('Post', schema);