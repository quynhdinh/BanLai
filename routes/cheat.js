const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/posts/:zaloId', async (req, res) => {
  try {
    const zaloId = req.params["zaloId"].toString()

    await db.Posts.create({
      zaloId: zaloId,
      category: "Thiết bị điện tử",
      subCategory: "Điện thoại",
      city: "Hồ Chí Minh",
      district: "Quận 6",
      images: [{"url": "https://res.cloudinary.com/banlai/image/upload/v1653810477/feqvx0lgt7zeqy9iqbkr.jpg"}],
      condition: "Còn bảo hành",
      title: "Bán gấp điện thoại Iphone 11 màu tím 2",
      status: "active",
      price: 12900000,
      description: "iPhone Xs Max 64GB cũ có màn hình rộng đến 6.5inch cho nội dung hiển thị chi tiết, sắc nét." +
        " màn hình tai thỏ thời thượng. Đi cùng là hệ điều hành iOS 12 với chip A12 Bionic giúp máy chạy mượt mà " +
        "mọi tác vụ. iPhone Xs Max 64GB cũ là phiên bản quốc tế chỉ cần lắp sim là hoạt động ngay. Sản phẩm được bán" +
        " ra tại Di Động Việt là máy còn rất mới, bảo hành 6 tháng, hỗ trợ 1 đổi 1 và nhiều ưu đãi khác.",
      productDetails: {"manufacturer": "Apple", "color": "Vàng hồng", "storage": "64GB"}
    }, {
      zaloId: zaloId,
      category: "Đồ gia dụng, nội thất",
      subCategory: "Giường, chăn, ga, gối nệm",
      city: "Hồ Chí Minh",
      district: "Quận 3",
      images: [{"url": "https://res.cloudinary.com/banlai/image/upload/v1653785306/dxo1il3boumnumqnlbi5.jpg"}],
      condition: "Đã qua sử dụng",
      title: "Bán áo thể thao nam mới mặc 2 lần",
      status: "active",
      price: 145000,
      description: "Áo thun nam Essential Tee này đúng với tên của nó - một chiếc áo luôn cần có trong tủ đồ của bạn bởi sự " +
        "tiện lợi, dễ mặc và dễ phối đồ trong bất kỳ trường hợp nào. Nếu một ngày bạn đang \"không biết mặc gì\" thì chọn ngay " +
        "áo thun nam cao cấp Essential Tee - tiện lợi ra đường, thoải mái mà lịch sự,... một chiếc áo đi từ nhà ra phố mà Coolmate" +
        "dành rất nhiều thời gian để nghiên cứu và phát triển. Essential Tee được Coolmate đặt với mong muốn chiếc áo thun cao cấp này " +
        "sẽ làm đúng với cái tên của nó, chiếc áo thun nam đem lại trải nghiệm tốt nhất để ai cũng muốn sở hữu nó trong tủ đồ.",
      productDetails: {}
    });

    return res.send({
      error: 0,
      msg: 'Cheat bài đăng thành công'
    });
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/messages/:zaloId', async (req, res) => {
  try {
    const zaloId = req.params["zaloId"].toString()
    await db.Messages.deleteMany({owner: zaloId})

    const friendZaloIds =
      (await db.Users.find().select("zaloId"))
        .map(obj => obj.zaloId)
        .filter(id => id !== zaloId)

    const postIds =
      (await db.Posts.find().select("_id"))
        .map(obj => obj._id)

    for (const zId of friendZaloIds) {
      await db.Messages.create({
        owner: zaloId,
        partner: zId,
        type: 0,
        postId: postIds[Math.floor(Math.random() * postIds.length)]
      }, {
        owner: zaloId,
        partner: zId,
        type: 1,
        postId: postIds[Math.floor(Math.random() * postIds.length)]
      })
    }
    return res.send({
      error: 0,
      msg: 'Cheat tin nhắn thành công'
    });
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/carelist', async (_req, res) => {
  try {
    await db.CarePostMapping.deleteMany()

    const zaloIds =
      (await db.Users.find().select("zaloId"))
        .map(obj => obj.zaloId)

    const postIds =
      (await db.Posts.find()
        .limit(5)
        .select("_id"))
        .map(obj => obj._id)

    for (const zId of zaloIds) {
      for (const pId of postIds) {
        await db.CarePostMapping.create({
          zaloId: zId,
          postId: pId
        })
      }
    }
    return res.send({
      error: 0,
      msg: 'Cheat care list thành công'
    });
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

router.get('/viewedposts', async (_req, res) => {
  try {
    await db.ViewedPostMapping.deleteMany()

    const zaloIds =
      (await db.Users.find().select("zaloId"))
        .map(obj => obj.zaloId)

    const postIds =
      (await db.Posts.find()
        .select("_id"))
        .map(obj => obj._id)

    for (const zId of zaloIds) {
      for (const pId of postIds) {
        await db.ViewedPostMapping.create({
          zaloId: zId,
          postId: pId,
          count: Math.floor(Math.random() * 50 + 50)
        })
      }
    }
    return res.send({
      error: 0,
      msg: 'Cheat viewed posts thành công'
    });
  } catch (error) {
    res.send({error: -1, msg: 'Unknown exception'});
    console.log('API-Exception', error);
  }
});

module.exports = router;