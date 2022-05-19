const express = require('express');
const db = require('../models');
const {validationResult} = require('express-validator');
const {postValidate} = require("../helpers/post-validator");
const router = express.Router();

router.post('/', postValidate.validateCreatePost(), async (req, res) => {
  try {
    const {
      category, subCategory, zaloId, city, district, images, condition,
      title, price, description, productDetails
    } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        error: 1,
        massage: 'Thông tin không hợp lệ',
        data: errors.array()
      })
    }

    let post = await db.Posts.create({
      zaloId,
      category,
      subCategory,
      city, district,
      images, condition,
      title, price, description,
      productDetails
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
    const {
      category, subCategory, zaloId, city, district, status, condition,
      title, price, description, productDetails
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