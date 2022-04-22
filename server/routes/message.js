const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
router.use(AuthService.verify);


// tra ve ten mat hang, zaloId partner, createdAt, name, avatar
router.get('/:type', async (req, res, next) => {
    try {
        const type = parseInt(req.params["type"])
        if (type !== 0 && type !== 1) {
            return res.send({
                error: -1,
                msg: 'Param không hợp lệ',
            });
        }
        const zaloId = req.user.zaloId
        const messages = await db.Messages.find({owner: zaloId, type: type})
        const mess = JSON.parse(JSON.stringify(messages))
        for(let i = 0; i < mess.length; i++){
            // User.find({'userID': {$in:array}});
            const user = await db.Users.find({zaloId: mess[i].partner})
            const post = await db.Posts.find({_id: ObjectId(mess[i].postId)})
            const u = JSON.parse(JSON.stringify(user))
            const p = JSON.parse(JSON.stringify(post))
            console.log(p)
            mess[i].picture = u[0].picture
            mess[i].name = u[0].name
            mess[i].title = p[0].title
        }
        res.send({
            error: 0,
            msg: 'Lấy danh sách tin nhắn thành công',
            data: mess,
        });
    } catch (error) {
        res.send({error: -1, message: 'Unknown exception'});
        console.log('API-Exception', error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            owner, partner, type, postId
        } = req.body
        const doc = await db.Messages.create({
            owner: owner,
            partner: partner,
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
