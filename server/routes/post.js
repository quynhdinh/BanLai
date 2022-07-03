const express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
const {validationResult} = require('express-validator');
const {validateCreatePost, isLiked, addIsLiked} = require("./helper");
const {Types} = require("mongoose");
const router = express.Router();
router.use(AuthService.verify);

const normalize = (x) => {
  return x.toString().normalize("NFC")
};

// Lấy danh sách bài đăng
router.get('/', async (req, res) => {
  try {
    const posts = await db.Posts.find({zaloId: req.user.zaloId}).sort({createdAt: -1})
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: posts
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Tìm kiếm bài đăng
router.get('/search', async (req, res) => {
  try {
    const filters = req.query;
    const allPosts = await db.Posts.find();
    const filteredPosts = allPosts.filter(post => {
      let isValid = true;
      for (const key in filters)
        if (key === "price") {
          isValid &= parseInt(post['price']) <= parseInt(filters[key])
        } else if (key === "keyWord") {
          isValid &= normalize(post['title']).includes(filters[key]);
        } else {
          isValid &= normalize(post[key]) === normalize(filters[key]);
        }
      return isValid;
    });
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng tìm kiếm thành công',
      data: filteredPosts
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

// Tìm những bài đăng mới nhất
router.get('/hottest-posts', async (req, res) => {
  try {
    const posts = await db.Posts.find({category: normalize("Thiết bị điện tử"), status: "active"}).sort({createdAt: -1}).limit(4).lean()
    const posts2 = await db.Posts.find({category: normalize("Đồ gia dụng, nội thất"), status: "active"}).sort({createdAt: -1}).limit(4).lean()
    const postArr = await addIsLiked(req.user.zaloId, posts)
    const postArr2 = await addIsLiked(req.user.zaloId, posts2)

    const zaloId = req.user.zaloId
    const filter =
      (await db.ViewedPostMapping
        .find({zaloId: zaloId}, {postId: 1, _id: 0}).sort({count: -1}))
        .map(p => p.postId)
        .map(p => Types.ObjectId(p))
    const posts3 = await db.Posts.find({'_id': {$in: filter}}).lean()
    const postArr3 = await addIsLiked(zaloId, posts3)
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng hot thành công',
      data: postArr,
      data2: postArr2,
      data3: postArr3
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Active lại 1 bài đăng
router.put('/repost/:postId', async (req, res) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: param,
      zaloId: req.user.zaloId
    }, {'status': 'active'})
    if (p)
      res.send({
        error: 0,
        msg: 'Active bài đăng thành công',
        data: p
      })
    else
      res.send({
        error: -1,
        msg: 'Không tìm thấy bài đăng',
      })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Đóng 1 bài đăng
router.put('/close-post/:postId', async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: postId,
      zaloId: req.user.zaloId
    }, {'status': 'closed'})
    if (p)
      res.send({
        error: 0,
        msg: 'Ẩn bài đăng thành công',
        data: p
      })
    else
      res.send({
        error: -1,
        msg: 'Không tìm thấy bài đăng'
      })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Lấy thông tin 1 bài đăng
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const response = await db.Posts.findOne({_id: postId}).lean()
    const sellerId = response.zaloId
    const zaloId = req.user.zaloId
    const user = await db.Users.findOne({zaloId: sellerId})
    const postCount = await db.Posts.countDocuments({zaloId: sellerId})
    const likeCount = await db.CarePostMapping.countDocuments({postId: postId})
    const viewCount =
      (await db.ViewedPostMapping
        .findOne({zaloId: zaloId, postId: postId}, {count: 1, _id: 0})
        .select("count")).count
    const isContacted = (await db.Messages.countDocuments({sender: zaloId, receiver: sellerId, postId: postId}) > 0)
    response.name = user.name
    response.picture = user.picture
    response.postCount = postCount
    response.isLiked = await isLiked(zaloId, postId)
    response.likeCount = likeCount
    response.viewCount = viewCount
    response.isContacted = isContacted
    response.relatedPosts = await db.Posts.find({subCategory: response.subCategory}).sort({createdAt: -1}).limit(5);
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng thành công',
      data: response
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Lấy danh sách bài đăng của 1 user(zaloId)
router.get('/by-user/:zaloId', async (req, res) => {
  try {
    const zaloId = req.params["zaloId"].toString()
    const result = await db.Posts.find({zaloId: zaloId}).sort({createdAt: -1}).lean()
    await addIsLiked(zaloId, result)
    const user = await db.Users.findOne({zaloId: zaloId})
    const postCount = await db.Posts.countDocuments({zaloId: zaloId})
    const postIds =
      (await db.Posts
        .find({zaloId: zaloId})
        .select("_id"))
        .map(obj => obj._id)
    const likeCount = await db.CarePostMapping.countDocuments({'postId': {$in: postIds}});
    const viewCount =
      (await db.ViewedPostMapping
        .find({zaloId: zaloId}, {count: 1, _id: 0}))
        .map(m => m.count)
        .reduce((sum, a) => sum + a, 0);
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng tv thành công',
      data: result,
      extra: {
        name: user.name,
        picture: user.picture,
        postCount: postCount,
        likeCount: likeCount,
        viewCount: viewCount
      }
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

// Tìm kiếm bài đăng theo danh mục
router.get('/by-category/:categoryId', async (req, res) => {
  try {
    const param = parseInt(req.params["categoryId"])
    if (param !== 0 && param !== 1)
      return res.send({
        error: -1,
        msg: 'Param không hợp lệ'
      })
    const category = (param === 0 ? "Thiết bị điện tử" : "Đồ gia dụng, nội thất")
    const posts = await db.Posts.find({category: normalize(category), status: "active"}).sort({createdAt: -1}).lean()
    const postArr = await addIsLiked(req.user.zaloId, posts)
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: postArr
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Tạo bài đăng
router.post('/', validateCreatePost(), async (req, res) => {
  try {
    const {
      category, subCategory, city, district, images, condition, title, price, description, productDetails
    } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.send({
        error: 1,
        massage: 'Thông tin không hợp lệ',
        data: errors.array()
      })
    const post = await db.Posts.create({
      zaloId: req.user.zaloId,
      category: normalize(category),
      subCategory: normalize(subCategory),
      city: normalize(city),
      district: normalize(district),
      images: images,
      condition: normalize(condition),
      title: normalize(title),
      price: parseInt(price),
      description: normalize(description),
      productDetails: productDetails
    });
    res.send({
      error: 0,
      msg: 'Tạo bài thành công!',
      data: post
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

// Update bài đăng
router.put('/:postId', async (req, res) => {
  try {
    const param = req.params["postId"].toString()
    const {
      category, subCategory, city, district, status, condition, title, price, description, productDetails
    } = req.body
    const p = await db.Posts.findByIdAndUpdate({_id: param}, {
        zaloId: req.user.zaloId,
        category: normalize(category),
        subCategory: normalize(subCategory),
        city: normalize(city),
        district: normalize(district),
        status: normalize(status),
        condition: normalize(condition),
        title: normalize(title),
        price: price,
        description: normalize(description),
        productDetails: productDetails
      }, {new: true}
    )
    res.send({
      error: 0,
      msg: 'Cập nhật bài đăng thành công',
      data: p,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

module.exports = router;