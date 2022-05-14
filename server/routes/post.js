const express = require('express');
const db = require('../models');
const {validationResult} = require('express-validator');
const AuthService = require("../services/auth-service");
const {postValidate} = require("../helpers/post-validator");
const router = express.Router();
// router.use(AuthService.verify);
const upload = require('../services/multer')
const cloudinary = require('../services/cloudinary')
const fs = require('fs');

async function addIsLiked(zaloId, posts) {
  const postsArr = JSON.parse(JSON.stringify(posts))
  for (let i = 0; i < postsArr.length; i++) {
    let isLiked = 0
    const findCarePost = await db.CarePostMapping.find({"zaloId": zaloId, "postId": postsArr[i]._id}).countDocuments()
    if (findCarePost > 0) {
      isLiked = 1;
    }
    postsArr[i].isLiked = isLiked
  }
  return postsArr
}

router.get('/hottest-posts/:categoryId', AuthService.verify, async (req, res, next) => {
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

router.get('/by-user/:zaloId', async function (req, res, next) {
  try {
    const _zaloId = req.params["zaloId"].toString()
    const result = await db.Posts.find({zaloId: _zaloId})
    res.send({
      error: 0,
      msg: 'Lấy thông tin bài đăng thành công',
      data: result,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
})

router.post('/', upload.array("images", 4), postValidate.validateCreatePost(), async (req, res, next) => {
  try {
    const {
      category, subCategory, zaloId, city, district, images, condition,
      title, price, description, productDetails
    } = req.body

    const errors = validationResult(req);
    if (Object.keys(req.files).length === 0) {
      return res.send({
        error: 1,
        massage: 'Hình ảnh không được để trống',
      })
    }
    if (!errors.isEmpty()) {
      return res.send({
        error: 1,
        massage: 'Thông tin không hợp lệ',
        data: errors.array()
      })
    }

    let post = new db.Posts({
      zaloId,
      category,
      subCategory,
      city, district,
      images, condition,
      title, price, description,
      productDetails
    });

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    const urls = []
    const files = req.files;
    for (const file of files) {
      const {path} = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    post['images'] = urls; // add the urls to object

    await post.save();
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

router.put('/viewCount/:postId', async (req, res, next) => {
  try {
    const param = req.params["postId"].toString()
    const p = await db.Posts.findOneAndUpdate({_id: param}, {$inc: {'viewCount': 1}}, {new: true})
    if (p) {
      res.send({
        error: 0,
        msg: 'Cập nhận lượt xem bài đăng thành công',
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

module.exports = router;