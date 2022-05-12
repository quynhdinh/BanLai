const express = require('express');
const AuthService = require("../services/auth-service");
const db = require("../models");
const router = express.Router();
router.use(AuthService.verify);


router.get('/', async (req, res, next) => {
  try {
    const zaloId = req.user.zaloId
    const posts = await db.Posts.find({zaloId: zaloId})
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: posts,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});


router.put('/repost/:postId', async (req, res, next) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({_id: param}, {'status': 'Active'}, {new: true})
    if (p) {
      res.send({
        error: 0,
        msg: 'Active bài đăng thành công',
        data: p
      })
    } else {
      res.send({
        error: -1,
        msg: 'Không tìm thấy bài đăng',
      })
    }
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.put('/close-post/:postId', async (req, res, next) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({_id: param}, {'status': 'Closed'}, {new: true})
    if (p) {
      res.send({
        error: 0,
        msg: 'Ẩn bài đăng thành công',
        data: p
      })
    } else {
      res.send({
        error: -1,
        msg: 'Không tìm thấy bài đăng',
      })
    }
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/:postId', async function (req, res, next) {
  try {
    const param = req.params["postId"].toString()
    const result = await db.Posts.find({_id: param})
    const _zaloId = req.user.zaloId
    const user = await db.Users.find({zaloId: _zaloId})
    const postCount = await db.Posts.count({zaloId: _zaloId})
    const u = JSON.parse(JSON.stringify(user))
    result.picture = u.picture
    result.ownerName = u.name
    result.postCount = postCount
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng thành công',
      data: result,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/hottest-posts/:categoryId', async (req, res, next) => {
  try {
    const param = parseInt(req.params["categoryId"])
    if(param !== 0 && param !== 1){
      return res.send({
        error: -1,
        msg: 'Param không hợp lệ'
      })
    }
    const category = (param === 0 ? "Thiết bị điện tử" : "Đồ nội thất và gia dụng")
    const posts = await db.Posts.find({category: category}).sort({viewCount: -1}).limit(4);
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: posts,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/by-category/:categoryId', async (req, res, next) => {
  try {
    const param = parseInt(req.params["categoryId"])
    var category = ""
    if (param === 0) {
      category = "Thiết bị điện tử"
    } else if (param === 1) {
      category = "Đồ nội thất và gia dụng"
    } else {
      return res.send({
        error: -1,
        msg: 'Param không hợp lệ'
      })
    }
    const posts = await db.Posts.find({category: category})
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: posts,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;