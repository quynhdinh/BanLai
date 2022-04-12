const express = require('express');
const db = require('../models');
const {validationResult} = require('express-validator');
const AuthService = require("../services/auth-service");
const {postValidate} = require("../helpers/post-validator");
const router = express.Router();
// router.use(AuthService.verify);

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

//update the post
router.put('/:postId', async(req, res) => {
    try {
        const param = req.params["postId"].toString()
        const {
            category, subCategory, zaloId, city, district, status, condition,
            title, price, description, productDetails
        } = req.body
        const p = await db.Posts.findByIdAndUpdate({_id: param}, {
            zaloId: zaloId,
            category: category,
            subCategory: subCategory,
            city: city,
            district: district,
            status: status,
            condition: condition,
            title: title,
            price: price,
            description: description,
            productDetails: productDetails
            }, {new: true}
        )
        res.send({
            error: 0,
            msg: 'Cập nhật bài đăng thành công',
            data: p,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
})

router.put('/viewCount/:postId', async (req, res, next) => {
    try {
        const param = req.params["postId"].toString()
        const p = await db.Posts.findOneAndUpdate({_id: param}, {$inc: {'viewCount': 1}}, {new: true})
        if (p) {
            res.send({
                error: 0,
                msg: 'Cập nhận lượt xem bài đăng thành công',
                data: p
            })
        } else {
            res.send({
                error: -1,
                msg: 'Không tìm thấy bài đăng',
            })
        }
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.put('/repost/:postId', async (req, res, next) => {
    try {
        const param = req.params["postId"].toString()
        const p = await db.Posts.findOneAndUpdate({_id: param}, {'status': 'Active'}, {new: true})
        if (p) {
            res.send({
                error: 0,
                msg: 'Active bài đăng thành công',
                data: p
            })
        } else {
            res.send({
                error: -1,
                msg: 'Không tìm thấy bài đăng',
            })
        }
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.put('/close-post/:postId', async (req, res, next) => {
    try {
        const param = req.params["postId"].toString()
        const p = await db.Posts.findOneAndUpdate({_id: param}, {'status': 'Closed'}, {new: true})
        if (p) {
            res.send({
                error: 0,
                msg: 'Ẩn bài đăng thành công',
                data: p
            })
        } else {
            res.send({
                error: -1,
                msg: 'Không tìm thấy bài đăng',
            })
        }
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

module.exports = router;