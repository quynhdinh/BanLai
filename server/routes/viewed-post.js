const express = require('express');
const db = require('../models');
const router = express.Router();
const AuthService = require("../services/auth-service");
router.use(AuthService.verify)

/* A function that is called when the user visits the `/` route. */
router.post('/', async (req, res) => {
  try {
    const postId = req.body.postId
    await db.ViewedPostMapping.updateOne({
      zaloId: req.user.zaloId,
      postId: postId.toString(),
    }, {$inc: {count: 1}}, {upsert: true})
    res.send({
      error: 0,
      msg: 'Cập nhật lượt xem thành công'
    })
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;