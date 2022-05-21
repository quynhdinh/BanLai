const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
router.use(AuthService.verify);

router.get('/', async (req, res) => {
  try {
    const _messages = await db.Messages.find({owner: req.user.zaloId})
    const messages = JSON.parse(JSON.stringify(_messages))
    for (let message of messages) {
      const user = await db.Users.find({zaloId: message.partner})
      const post = await db.Posts.find({_id: ObjectId(message.postId)})
      const u = JSON.parse(JSON.stringify(user))[0]
      const p = JSON.parse(JSON.stringify(post))[0]
      message.picture = u.picture
      message.name = u.name
      message.title = p.title
    }
    res.send({
      error: 0,
      msg: 'Lấy danh sách tin nhắn thành công',
      data: messages,
    });
  } catch (error) {
    res.send({error: -1, message: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const {partner, type, postId} = req.body
    const msg = await db.Messages.create({
      owner: req.user.zaloId,
      partner: partner.toString(),
      type: type.toString(),
      postId: postId.toString()
    })
    res.send({
      error: 0,
      msg: 'Tạo tin nhắn thành công',
      data: msg,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;
