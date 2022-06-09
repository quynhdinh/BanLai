const db = require("../models");
const {check} = require("express-validator");

const isLiked = async (zaloId, postId) => {
  const entry = await db.CarePostMapping.findOne({"zaloId": zaloId, "postId": postId})
  return entry ? 1 : 0
};

const addIsLiked = async (zaloId, posts) => {
  for (const post of posts) {
    const countLikedPost = await db.CarePostMapping.countDocuments({"zaloId": zaloId, "postId": post._id})
    post.isLiked = (countLikedPost > 0 ? 1 : 0)
  }
  return posts
};

const validateCreatePost = () => {
  return [
    check('category', 'Danh mục không được để trống').notEmpty(),
    check('subCategory', 'Danh mục chi tiết không được để trống').notEmpty(),
    check('city', 'Thành phố không được trống').notEmpty(),
    check('district', 'Quận, huyện không được trống').notEmpty(),
    check('condition', 'Trạng thái sản phẩm không được để trống').notEmpty(),
    check('price', 'Giá sản phẩm không được để trống').notEmpty(),
    check('title', 'Tiêu đề không được để trống').notEmpty(),
  ];
};

module.exports = {addIsLiked, isLiked, validateCreatePost};