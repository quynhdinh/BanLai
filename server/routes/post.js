const express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
const {validationResult} = require('express-validator');
const {validateCreatePost, isLiked, addIsLiked} = require("./helper");
const router = express.Router();
router.use(AuthService.verify);

// Lấy danh sách bài đăng
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

// Active lại 1 bài đăng
router.put('/repost/:postId', async (req, res) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: param,
      zaloId: req.user.zaloId
    }, {'status': 'active'})
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

// Đóng 1 bài đăng
router.put('/close-post/:postId', async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({
      _id: postId,
      zaloId: req.user.zaloId
    }, {'status': 'closed'})
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

// Lấy thông tin 1 bài đăng
router.get('/:postId', async (req, res) => {
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
router.get('/by-user/:zaloId', async (req, res) => {
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

// Tìm những bài đăng mới nhất
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

// Tìm kiếm bài đăng theo danh mục
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

// Tìm kiếm bài đăng
router.get('/search', async (req, res) => {
  try {
    const filters = req.query;
    const allPosts = await db.Posts.find();
    const filteredPosts = allPosts.filter(post => {
      let isValid = true;
      for (let key in filters)
        if (key === "price") {
          isValid &= parseInt(post['price']) <= parseInt(filters[key])
        } else if (key === "keyWord") {
          isValid &= post['title'].includes(filters[key]);
        } else {
          isValid &= post[key] === filters[key];
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

// Tạo bài đăng
router.post('/', validateCreatePost(), async (req, res) => {
  try {
    const {
      category, subCategory, city, district, images, condition, title, price, description, productDetails
    } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        error: 1,
        massage: 'Thông tin không hợp lệ',
        data: errors.array()
      })
    }
    const post = await db.Posts.create({
      zaloId: req.user.zaloId,
      category: category.toString(),
      subCategory: subCategory.toString(),
      city: city.toString(),
      district: district.toString(),
      images: images,
      condition: condition.toString(),
      title: title.toString(),
      price: parseInt(price),
      description: description.toString(),
      productDetails: productDetails
    });
    res.send({
      error: 0,
      msg: 'Tạo bài thành công!',
      data: post,
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
        category: category,
        subCategory: subCategory,
        city: city,
        district: district,
        status: status,
        condition: condition,
        title: title,
        price: price,
        description: description,
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