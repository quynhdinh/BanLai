var express = require('express');
const db = require('../models');
var {validationResult} = require('express-validator');
const AuthService = require("../services/auth-service");
const {postValidate} = require("../helpers/post-validator");
const ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        result = await db.Post.find({})
        res.send({
            error: 0,
            message: 'Success',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.get('/:postId', async function (req, res, next) {
    try {
        const param = req.params["postId"].toString()
        const result = await db.Post.find({_id: param})
        res.send({
            error: 0,
            message: 'Success',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', postValidate.validateCreatePost(), async (req, res, next) => {
    try {
        const {
            category, subCategory, userId, city, district, status, condition,
            title, price, description, viewCount, isSaved, productDetails
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const doc = await db.Post.create({
            userId,
            category,
            subCategory,
            city, district,
            status, condition,
            title, price, description,
            viewCount, isSaved,
            productDetails
        })
        res.send({
            error: 0,
            message: 'Tạo bài thành công!',
            data: doc,
        })
    } catch (error) {
        res.send({error: -1, message: error});
        console.log('API-Exception', error);
    }

});

module.exports = router;