const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  zaloId: String, // ID để định danh user trên hệ thống Zalo theo ứng dụng của bạn.
  followerId: String, // ID user theo Official Account, bạn có thể sử dụng ID này để gửi tin nhắn cho user.
  birthday: Date,
  name: String,
  picture: String,
  status: {type: Number, default: 0},
  isFollowing: Boolean
}, {timestamps: true}); // createdAt, and updateAt are auto-generated

module.exports = mongoose.model('User', userSchema);