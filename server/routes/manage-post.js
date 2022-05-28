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
    const response = await db.Posts.findOne({_id: postId}).lean()
    const sellerId = response.zaloId
    const user = await db.Users.findOne({zaloId: sellerId})
    const postCount = await db.Posts.countDocuments({zaloId: sellerId})
    response.name = user.name
    response.picture = user.picture
    response.postCount = postCount
    response.isLiked = await isLiked(sellerId, postId)
    response.relatedPosts = await db.Posts.find({subCategory: response.subCategory}).sort({createdAt: -1}).limit(5);
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng thành công',
      data: response,
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
    const result = await db.Posts.find({zaloId: zaloId})
    const user = await db.Users.findOne({zaloId: zaloId})
    const postCount = await db.Posts.countDocuments({zaloId: zaloId})
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng tv thành công',
      data: result,
      extra: {
        name: user.name,
        picture: user.picture,
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
    const posts = await db.Posts.find({category: "Thiết bị điện tử", status: "active"}).sort({createdAt: -1}).limit(4).lean()
    const posts2 = await db.Posts.find({category: "Đồ nội thất và gia dụng", status: "active"}).sort({createdAt: -1}).limit(4).lean()
    const postArr = await addIsLiked(req.user.zaloId, posts)
    const postArr2 = await addIsLiked(req.user.zaloId, posts2)
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng hot thành công',
      data: postArr,
      data2: postArr2,
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
    const posts = await db.Posts.find({category: category, status: "active"}).lean()
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