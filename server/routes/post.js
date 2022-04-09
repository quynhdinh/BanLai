const express = require('express');
const db = require('../models');
const {validationResult} = require('express-validator');
const AuthService = require("../services/auth-service");
const {postValidate} = require("../helpers/post-validator");
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await db.Posts.find({})
        res.send({
            error: 0,
            msg: 'Lấy danh sách bài đăng thành công',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.get('/:postId', async function (req, res, next) {
    try {
        const param = req.params["postId"].toString()
        const result = await db.Posts.find({_id: param})
        res.send({
            error: 0,
            msg: 'Lấy thông tin bài đăng thành công',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', postValidate.validateCreatePost(), async (req, res, next) => {
    try {
        const {
            category, subCategory, zaloId, city, district, status, condition,
            title, price, description, productDetails
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({
                error: 1,
                massage: 'Thông tin không hợp lệ',
                data: errors.array()
            })
        }
        const doc = await db.Posts.create({
            zaloId,
            category,
            subCategory,
            city, district,
            status, condition,
            title, price, description,
            productDetails
        })
        res.send({
            error: 0,
            msg: 'Tạo bài thành công!',
            data: doc,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }

});

module.exports = router;