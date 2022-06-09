const express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const ZaloService = require('./../services/zalo-service.js');
const router = express.Router();

router.get('/logged-in', AuthService.verify, (req, res) => {
  return res.send({error: 0, msg: 'Success', data: req.user});
});

router.get('/', async (_req, res) => {
  try {
    const result = await db.Users.find({})
    res.send({
      error: 0,
      msg: 'Lấy danh sách người dùng thành công',
      data: result,
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/stats/:zaloId', async (req, res) => {
  try {
    const zaloId = req.params["zaloId"].toString()
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
      msg: 'Lấy thống kê người dùng thành công',
      data: {
        likeCount: likeCount,
        viewCount: viewCount,
      }
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    if (!accessToken) {
      return res.send({error: -1, msg: 'Invalid access token'});
    }
    const {id, name, birthday, picture} = await ZaloService.getZaloProfile(accessToken);
    let pictureUrl = picture
    if (picture.data) {
      pictureUrl = picture.data.url
    }
    let birthDate = null
    if (birthday) {
      const parts = birthday.split('/')
      birthDate = new Date(parts[2], parts[1] - 1, parts[0])
    }
    let user = await db.Users.updateOne({zaloId: id}, {
      birthday: birthDate,
      name: name,
      picture: pictureUrl
    }, {upsert: true}); // inserts a new document if no document matches the filter

    if (user) {
      const jwt = AuthService.genJSONWebToken(id, 3600);
      return res.send({
        error: 0,
        msg: 'Đăng nhập thành công',
        data: {...user, jwt}
      });
    }
  } catch (ex) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', ex);
  }
});

router.post('/update-follow-status', AuthService.verify, async (req, res) => {
  try {
    const zaloId = req.user.zaloId
    const isFollowing = req.body.status
    const user = await db.Users.updateOne({zaloId}, {isFollowing})
    return res.send({
      error: 0,
      msg: 'Cập nhật thông tin theo dõi thành công',
      data: user
    });
  } catch (ex) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', ex);
  }
});

module.exports = router;