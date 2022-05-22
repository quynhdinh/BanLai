const express = require('express');
const AuthService = require("../services/auth-service");
const db = require("../models");
const {addIsLiked, isLiked} = require("./helper");
const router = express.Router();
router.use(AuthService.verify);

router.get('/', async (req, res) => {
  try {
    const posts = await db.Posts.find({zaloId: req.user.zaloId})
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


router.put('/repost/:postId', async (req, res) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: param,
      zaloId: req.user.zaloId
    }, {'status': 'active'}, {new: true})
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

router.put('/close-post/:postId', async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: postId,
      zaloId: req.user.zaloId
    }, {'status': 'closed'}, {new: true})
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

router.get('/:postId', async function (req, res) {
  try {
    const postId = req.params["postId"].toString()
    let _post = await db.Posts.find({_id: postId})
    const data = JSON.parse(JSON.stringify(_post))[0]
    const zaloId = req.user.zaloId
    const user = await db.Users.find({zaloId: zaloId})
    const postCount = await db.Posts.count({zaloId: zaloId})
    const u = JSON.parse(JSON.stringify(user))[0]
    data.name = u.name
    data.picture = u.picture
    data.postCount = postCount
    data.isLiked = await isLiked(zaloId, postId)
    data.relatedPosts = await db.Posts.find({subCategory: data.subCategory}).sort({createdAt: -1}).limit(5);
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng thành công',
      data: data,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Lấy danh sách bài đăng của 1 user(zaloId)
router.get('/by-user/:zaloId', async function (req, res) {
  try {
    const zaloId = req.params["zaloId"].toString()
    let result = await db.Posts.find({zaloId: zaloId})
    const user = await db.Users.find({zaloId: zaloId})
    const postCount = await db.Posts.count({zaloId: zaloId})
    const u = JSON.parse(JSON.stringify(user))[0]
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng tv thành công',
      data: result,
      extra: {
        name: u.name,
        picture: u.picture,
        postCount: postCount,
      }
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

router.get('/hottest-posts/:categoryId', async (req, res) => {
  try {
    const param = parseInt(req.params["categoryId"])
    if (param !== 0 && param !== 1)
      return res.send({
        error: -1,
        msg: 'Param không hợp lệ'
      })
    const category = (param === 0 ? "Thiết bị điện tử" : "Đồ nội thất và gia dụng")
    const posts = await db.Posts.find({category: category, status: "active"}).sort({createdAt: -1}).limit(4)
    const postArr = await addIsLiked(req.user.zaloId, posts)
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng hot thành công',
      data: postArr,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/by-category/:categoryId', async (req, res) => {
  try {
    const param = parseInt(req.params["categoryId"])
    if (param !== 0 && param !== 1) {
      return res.send({
        error: -1,
        msg: 'Param không hợp lệ'
      })
    }
    const category = (param === 0 ? "Thiết bị điện tử" : "Đồ nội thất và gia dụng")
    const posts = await db.Posts.find({category: category, status: "active"})
    const postArr = await addIsLiked(req.user.zaloId, posts)
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: postArr,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});
module.exports = router;