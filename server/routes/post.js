const express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
const {validationResult} = require('express-validator');
const {validateCreatePost} = require("./helper");
const router = express.Router();
router.use(AuthService.verify);

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

router.post('/', validateCreatePost(), async (req, res) => {
  try {
    const zaloId = req.user.zaloId
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
      zaloId: zaloId,
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

//update the post
router.put('/:postId', async (req, res) => {
  try {
    const param = req.params["postId"].toString()
    const zaloId = req.user.zaloId
    const {
      category, subCategory, city, district, status, condition, title, price, description, productDetails
    } = req.body
    const p = await db.Posts.findByIdAndUpdate({_id: param}, {
        zaloId: zaloId,
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