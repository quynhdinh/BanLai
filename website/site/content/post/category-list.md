---
title: 'Category list'
date: 2022-07-05T15:04:10.000Z
description: >-
    Bài viết này chia sẻ về quá trình bọn mình phát triển trang danh sách sản phẩm theo category.
---
Khi người dùng có nhu cầu muốn tìm kiếm chính xác một thiết bị điện tử cũ hay một dụng cụ gia dụng, nội thất nào đó, ở màn hình này người dùng sẽ được hỗ trợ thực hiện điều đó. Ngoài việc hiển thị danh sách toàn bộ sản phẩm của 1 trong 2 hạng mục chính của app, chúng mình đã phân tích và cung cấp cho người dùng những filter cần thiết để có thể dễ dàng tìm được và xem chi tiết bài viết về sản phẩm theo tiêu chí của mình.

Từ 2 entry points là 2 icon “đồ điện tử" và “đồ gia dụng và nội thất” người dùng có thể truy cập vào màn hình chi tiết danh sách các bài đăng của từng category.

**datltt will add image here**

Ở đây chúng mình chia màn hình thành 2 thành phần chính đó là :

- Thanh **searchbar**: người dùng có thể cài đặt các filter để có thể dễ dàng tìm kiếm các bài đăng liên quan một cách nhanh chóng hơn. Người dùng có thể filter bài đăng theo: chi tiết danh mục sản phẩm, tình trạng sản phẩm, và vị trí của sản phản phẩm ( thành phố, quận huyện ).
- Danh sách các sản phẩm của category tương ứng: danh sách này được hiển thị bằng 1 danh sách có thể scroll theo chiều dọc, các bài đăng được hiển thị theo thứ tự ngày đăng mới nhất. Danh sách này chứa những component [category](https://www.notion.so/category-70512e2a8eb748b9aa181b0a4d5f7136) mà mình đã trình bày ở phần màn hình trang chủ.

Để có thể cài đặt được màn hình này, đầu tiên ta phải setup 1 api dùng để lấy được danh sách các bài đăng thuộc về 1 category. Bạn có thể tham khảo đoạn mã sau
```javascript
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
```

Ở đây chúng ta có 1 **GET** api với param là _categoryId_ với 2 giá trị 0,1 lần lượt tương ứng với category “Thiết bị điện tử” và “Đồ gia dụng, nội thất”. Api này sẽ trả về một danh sách đầy đủ thông tin các bài đăng để bạn có thể hiển thị ở phía FE.

Bạn có thể thấy 1 điểm kì lạ khi tên của category phải qua 1 hàm **normalize** trước khi được tìm kiếm trong db. Đây là 1 hàm để handle trường hợp liên quan đến vấn đề encode các chuỗi kí tự tiếng Việt, bạn có thể tham khảo commit [này](https://github.com/quynhdinh/BanLai/commit/7ebecd549b4bb9ebf65388f7681c3b0c151fbf17) để thấy điều thú vị:

Và đây là phần code cho hàm **normalize**

```javascript
const normalize = (x) => {
  return x.toString().normalize("NFC")
};
```

Về phần tìm kiếm bài đăng, ta sẽ setup 1 api search, bạn có thể tham khảo cách làm của bọn mình

```jsx
/* A route to search posts. */
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
```

Bạn có thể tham khảo kĩ hơn phần setup api ở phía server tại [đây](https://github.com/quynhdinh/BanLai/blob/master/server/routes/post.js):

Về phía FE, khi đã quen với Zalo mini program framework, bạn sẽ dễ dàng setup được một danh sách như bọn mình làm

**datltt will add image here**

Điểm đặc biệt ở màn hình này là component SearchBox, hi vọng bạn sẽ dễ dàng tái sử dụng component này một cách linh hoạt để phát triển mini app của mình.

Bạn có thể tham khảo hướng dẫn chi tiết cài đặt component SearchBox tại đây:

[search-box](https://scintillating-haupia-01fe5d.netlify.app/post/search-box/)

Và [đây](https://github.com/quynhdinh/BanLai/blob/master/client/src/pages/posts-list.jsx) là link tới đoạn mã của màn hình này: