const express = require('express');
const db = require('../models');
const router = express.Router();
const AuthService = require("../services/auth-service");
const {addIsLiked} = require("./helper");
const {Types} = require("mongoose");
router.use(AuthService.verify)

router.post('/', async (req, res) => {
  try {
    const postId = req.body.postId
    await db.ViewedPostMapping.updateOne({
      zaloId: req.user.zaloId,
      postId: postId.toString(),
    }, {$inc: {count: 1}}, {upsert: true})
    res.send({
      error: 0,
      msg: 'Cập nhật lượt xem thành công'
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get("/count/:postId", async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const response =
      await db.ViewedPostMapping
        .findOne({zaloId: req.user.zaloId, postId: postId}, {count: 1, _id: 0})
        .select("count")
    res.send({
      error: 0, msg: 'Lấy số lượt xem bài đăng thành công',
      data: response.count
    });
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/', async (req, res) => {
  try {
    const zaloId = req.user.zaloId
    const filter =
      (await db.ViewedPostMapping
        .find({zaloId: zaloId}, {postId: 1, _id: 0}).sort({count: -1}))
        .map(p => p.postId)
        .map(p => Types.ObjectId(p))
    const posts = await db.Posts.find({'_id': {$in: filter}}).lean()
    const response = await addIsLiked(zaloId, posts)
    res.send({
      error: 0,
      msg: 'Lấy danh sách đã xem thành công',
      data: response
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;