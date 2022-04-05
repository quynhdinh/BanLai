const {check} = require('express-validator');

let validateCreatePost = () => {
    return [
        check('category', 'Cần có danh mục').notEmpty(),
        check('subCategory', 'Cần có danh mục chi tiết').notEmpty(),
        check('userId', 'userId không được để trống').notEmpty(),
        check('city', 'Thành phố không được trống').notEmpty(),
        check('district', 'Quận,huyện không được trống').notEmpty(),
        check('status', 'status không được để trống').notEmpty(),
        check('condition', 'Chọn trạng thái của sản phẩm').notEmpty(),
        check('price', 'Điền giá sản phẩm').notEmpty(),
        check('title', 'Cần có tiêu đề').notEmpty(),
    ];
}

let postValidate = {
    validateCreatePost: validateCreatePost,
};

module.exports = {postValidate};