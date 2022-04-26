const express = require('express');
const db = require('../models');
const {ObjectId} = require("mongodb");
const router = express.Router();
const AuthService = require("../services/auth-service");
router.use(AuthService.verify)

router.get('/', async (req, res, next) => {
    try {
        const _zaloId = req.user.zaloId
        const result = await db.CarePostMapping.find({zaloId: _zaloId})
        const careList = JSON.parse(JSON.stringify(result))
        for(let i = 0; i < careList.length; i++){
            const post = await db.Posts.find({_id: ObjectId(careList[i].postId)})
            careList[i].postDetail = JSON.parse(JSON.stringify(post))
        }
        res.send({
            error: 0,
            msg: 'Lấy thông tin quan tâm bài đăng thành công',
            data: careList,
        })
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', async (req, res) => {
    const zaloId = req.user.zaloId
    const id = req.body.postId
    console.log(id)
    const mapping = await db.CarePostMapping.create({
        zaloId: zaloId,
        postId: id
    })
    res.send({
        error: 0,
        msg: 'Thêm bài đăng vào danh sách quan tâm thành công!',
        data: mapping,
    })
    return res.send({error: 0, msg: 'Success', data: req.user});
});

router.delete('/:postId', async (req, res, next) => {
    try {
        const _postId = req.params["postId"].toString()
        const _zaloId = req.user.zaloId
        const post = await db.CarePostMapping.deleteOne({postId: _postId, zaloId: _zaloId})
        if (!post) {
            return res.send({
                error: 1,
                msg: 'Không tìm thấy bài đăng này'
            })
        } else {
            return res.send({
                error: 0,
                msg: 'Xóa bài khỏi danh sách quan tâm thành công!'
            })
        }
    } catch (error) {
        res.send({error: -1, msg: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

module.exports = router;