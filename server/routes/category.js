const express = require('express');
const router = express.Router();
const db = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async function (req, res, next) {
    try {
        const result = await db.Category.find()
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

//623c2c179ccd46c71dfeef4d : Đồ điện tử
//623c2d209ccd46c71dfeef50 : Đồ nội thất và gia dụng

router.get('/:categoryId', async function (req, res, next) {
    try {
        const param = req.params["categoryId"].toString()
        const result = await db.SubCategory.find({categoryId: new ObjectId(param)})
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

router.post
module.exports = router;