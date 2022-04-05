const express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await db.CarePostMapping.find({})
        res.send({
            error: 0,
            message: 'Lấy thông tin quan tâm bài đăng thành công',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', AuthService.verify, async (req, res) => {
    const zaloId = req.user.zaloId
    const postId = req.postId

    const mapping = await db.CarePostMapping.create({
        zaloId: zaloId,
        postId: postId
    })
    res.send({
        error: 0,
        message: 'Thêm bài đăng vào danh sách quan tâm thành công!',
        data: mapping,
    })
    return res.send({error: 0, message: 'Success', data: req.user});
});

router.get('/:zaloId', async function (req, res, next) {
    try {
        const param = req.params["zaloId"].toString()
        const result = await db.CarePostMapping.find({zaloId: param})
        res.send({
            error: 0,
            message: 'Lấy danh sách quan tâm của user thành công',
            data: result,
        })
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.delete('/:postId', AuthService.verify, async (req, res, next) => {
    try {
        const _postId = req.params["postId"].toString()
        const _zaloId = req.user.zaloId
        const post = await db.CarePostMapping.deleteOne({postId: _postId, zaloId: _zaloId})
        if (!post) {
            return res.send({
                error: 1,
                message: 'Không tìm thấy bài đăng này'
            })
        } else {
            return res.send({
                error: 0,
                msg: 'Xóa bài khỏi danh sách quan tâm thành công!'
            })
        }
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

module.exports = router;