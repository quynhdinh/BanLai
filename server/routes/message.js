const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
router.use(AuthService.verify);

router.get('/', async (req, res) => {
  try {
    const messages = await db.Messages.find({owner: req.user.zaloId}).lean()
    for (const message of messages) {
      const user = await db.Users.findOne({zaloId: message.partner}).lean()
      const post = await db.Posts.findOne({_id: ObjectId(message.postId)}).lean()
      message.picture = user.picture
      message.name = user.name
      message.title = post.title
    }
    res.send({
      error: 0,
      msg: 'Lấy danh sách tin nhắn thành công',
      data: messages
    })
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
      data: msg
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;