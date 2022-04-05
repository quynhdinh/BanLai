const {check} = require('express-validator');

let validateCreatePost = () => {
    return [
        check('category', 'Cần có danh mục').not().isEmpty(),
        check('subCategory', 'Cần có danh mục chi tiết').not().isEmpty(),
        check('userId', 'userId is not empty').not().isEmpty(),
        check('city', 'Thành phố không được trống').not().isEmpty(),
        check('district', 'quận,huyện không được trống').not().isEmpty(),
        check('status', 'status is not empty').not().isEmpty(),
        check('condition', 'Chọn trạng thái của sản phẩm').not().isEmpty(),
        check('price', 'điền giá sản phẩm').not().isEmpty(),
        check('title', 'cần có tiêu đề').not().isEmpty(),
    ];
}

let postValidate = {
    validateCreatePost: validateCreatePost,
};

module.exports = {postValidate};