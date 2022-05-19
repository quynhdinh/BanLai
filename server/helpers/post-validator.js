const {check} = require('express-validator');

const validateCreatePost = () => {
  return [
    check('category', 'Danh mục không được để trống').notEmpty(),
    check('subCategory', 'Danh mục chi tiết không được để trống').notEmpty(),
    check('city', 'Thành phố không được trống').notEmpty(),
    check('district', 'Quận,huyện không được trống').notEmpty(),
    check('condition', 'Trạng thái sản phẩm không được để trống').notEmpty(),
    check('price', 'Giá sản phẩm không được để trống').notEmpty(),
    check('title', 'Tiêu đề không được để trống').notEmpty(),
  ];
};

const postValidate = {
  validateCreatePost: validateCreatePost,
};

module.exports = {postValidate};