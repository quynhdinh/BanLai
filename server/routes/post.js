const express = require('express');
const db = require('../models');
const AuthService = require("../services/auth-service");
const {validationResult} = require('express-validator');
const {postValidate} = require("../helpers/post-validator");
const router = express.Router();
router.use(AuthService.verify);

router.get('/search', async (req, res) => {
  try {
    const filters = req.query;
    const data = await db.Posts.find();
    const filteredPosts = data.filter(post => {
      let isValid = true;
      for (let key in filters) {
        if (key == "price") {
          isValid = isValid && parseInt(post[key]) < parseInt(filters[key]);
        } else if (key == "keyWord") {
          console.log("key word:" + filters[key] + ".." + post['title']);
          isValid = isValid && post['title'].includes(filters[key]);
        } else {
          isValid = isValid && post[key] == filters[key];
        }
      }
      return isValid;
    });
    res.send({
      error: 0,
      msg: 'Lấy danh sách bài đăng thành công',
      data: filteredPosts,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

router.post('/', postValidate.validateCreatePost(), async (req, res) => {
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
      category: category,
      subCategory: subCategory,
      city: city,
      district: district,
      images: images,
      condition: condition,
      title: title,
      price: price,
      description: description,
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