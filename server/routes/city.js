const express = require('express');
const router = express.Router();
const db = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async function (req, res, next) {
    try {
        const result = await db.City.find()
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

router.get('/:cityId', async function (req, res, next) {
    try {
        const param = req.params["cityId"].toString()
        const result = await db.District.find({cityId: new ObjectId(param)})
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

// 623be6ced8cc84201538e032: HCM
// 623bec21d8cc84201538e051: Thu Duc

module.exports = router;