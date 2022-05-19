const express = require('express');
const db = require('../models');
const router = express.Router();
const AuthService = require("../services/auth-service");
router.use(AuthService.verify)

router.post('/', async (req, res) => {
  try {
    const postId = req.body
    const mapping = await db.ViewedPostMapping.updateOne({
      zaloId: req.user.zaloId,
      postId: postId,
    }, {$inc: {count: 1}}, {upsert: true})
    if (mapping) {
      res.send({
        error: 0,
        msg: 'Cập nhật lượt xem thành công',
      })
    } else {
      res.send({
        error: 1,
        msg: 'Có lỗi cập nhật lượt xem',
      })
    }
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});


router.post("/count/:postId", async (req, res) => {
  try {
    const postId = req.params["postId"].toString()
    const count =
      await db.ViewedPostMapping
      .find({zaloId: req.user.zaloId, postId: postId}, {count: 1, _id: 0})
      .select("count")
    res.send({error: 0, msg: 'Thành công', data: count[0].count});
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;