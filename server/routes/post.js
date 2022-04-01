var express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
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
        res.send({ error: -1, message: 'Unknown exception' });
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

router.post('/', AuthService.verify, async (req, res, next) => {
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