const express = require('express');
const db = require('../models');
const {ObjectId} = require("mongodb");
const router = express.Router();
const AuthService = require("../services/auth-service");
router.use(AuthService.verify)

router.get('/', async (req, res) => {
  try {
    const result = await db.CarePostMapping.find({zaloId: req.user.zaloId})
    const careList = JSON.parse(JSON.stringify(result))
    for (let care of careList) {
      const post = await db.Posts.find({_id: ObjectId(care.postId)})
      care.postDetail = JSON.parse(JSON.stringify(post))
    }
    res.send({
      error: 0,
      msg: 'Lấy thông tin quan tâm thành công',
      data: careList,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.post('/', async (req, res) => {
  try {
    const id = req.body.postId.toString()
    const mapping = await db.CarePostMapping.create({
      zaloId: req.user.zaloId,
      postId: id
    })
    if (mapping) {
      res.send({
        error: 0,
        msg: 'Thêm bài đăng vào danh sách quan tâm thành công!',
        data: mapping,
      })
    } else {
      res.send({
        error: 0,
        msg: 'Có lỗi thêm vào danh sách quan tâm',
        data: mapping,
      })
    }
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const _postId = req.params["postId"].toString()
    const post = await db.CarePostMapping.deleteOne({postId: _postId, zaloId: req.user.zaloId})
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