const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
router.use(AuthService.verify);

router.get('/', async (req, res) => {
  try {
    const me = req.user.zaloId
    const iBuyMessages = await db.Messages.find({sender: me}).sort({createdAt: -1}).lean()
    const iSellMessages = await db.Messages.find({receiver: req.user.zaloId}).sort({createdAt: -1}).lean()
    for (const message of iBuyMessages) {
      const user = await db.Users.findOne({zaloId: message.receiver}).lean()
      const post = await db.Posts.findOne({_id: ObjectId(message.postId)}).lean()
      console.log(post)
      message.picture = user.picture
      message.name = user.name
      message.title = post.title
    }
    for (const message of iSellMessages) {
      const user = await db.Users.findOne({zaloId: message.sender}).lean()
      const post = await db.Posts.findOne({_id: ObjectId(message.postId)}).lean()
      message.picture = user.picture
      message.name = user.name
      message.title = post.title
    }
    res.send({
      error: 0,
      msg: 'Lấy danh sách tin nhắn thành công',
      iBuy: iBuyMessages,
      iSell: iSellMessages
    })
  } catch (error) {
    res.send({error: -1, message: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const sender = req.user.zaloId
    const {receiver, postId} = req.body
    const msg = await db.Messages.create({
      sender: sender.toString(),
      receiver: receiver.toString(),
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