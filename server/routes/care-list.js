const express = require('express');
const db = require('../models');
const {ObjectId} = require("mongodb");
const router = express.Router();
const AuthService = require("../services/auth-service");
router.use(AuthService.verify)

/* This is a router for get all care post of user. */
router.get('/', async (req, res) => {
  try {
    const careList = await db.CarePostMapping.find({zaloId: req.user.zaloId}).sort({createdAt: -1}).lean()
    for (const care of careList)
      care.postDetail = await db.Posts.findOne({_id: ObjectId(care.postId)}).lean()
    res.send({
      error: 0,
      msg: 'Lấy thông tin quan tâm thành công',
      data: careList
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

/* This is a router for add a post to care list. */
router.post('/', async (req, res) => {
  try {
    const id = req.body.postId.toString();
    const mapping = await db.CarePostMapping.create({
      zaloId: req.user.zaloId,
      postId: id
    })
    res.send({
      error: 0,
      msg: 'Thêm bài đăng vào danh sách quan tâm thành công!',
      data: mapping
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

/* A router for delete a post from care list. */
router.delete('/:postId', async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const post = await db.CarePostMapping.deleteOne({postId: postId, zaloId: req.user.zaloId})
    if (post.deletedCount)
      res.send({
        error: 0,
        msg: 'Xóa bài khỏi danh sách quan tâm thành công!'
      })
    else
      res.send({
        error: 1,
        msg: 'Không tìm thấy bài đăng này'
      })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;