var express = require('express');
const db = require('../models');
// const AuthService = require("../services/auth-service");
var router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        // const userId = req.user._id
        const {
            categoryId, subCategoryId, userId, city, district, status, condition,
            title, price, description, viewCount, productDetails
        } = req.body
        const doc = await db.Post.create({
            userId: userId,
            categoryId,
            subCategoryId,
            city, district,
            status, condition,
            title, price, description,
            viewCount, productDetails
        })
        res.send({
            error: 0,
            message: 'Tạo bài thành công!',
            data: doc,
        })
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }

});

module.exports = router;