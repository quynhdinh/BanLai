const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const router = express.Router();

router.use(AuthService.verify);

router.get('/:type', async (req, res, next) => {
    try {
        const type = req.params["type"].toInt()
        if (type !== 0 && type !== 1) {
            return res.send({
                error: -1,
                message: 'Param không hợp lệ',
            });
        }
        const zaloId = req.body
        const messages = await db.Messages.find({zaloId: zaloId, type: type})
        res.send({
            error: 0,
            message: 'Lấy danh sách tin nhắn thành công',
            data: messages,
        });
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            sender, receiver, type, postId
        } = req.body
        const doc = await db.Messages.create({
            sender: sender,
            receiver: receiver,
            type: type,
            postId: postId
        })
        res.send({
            error: 0,
            msg: 'Tạo tin nhắn thành công',
            data: doc,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

module.exports = router;
