---
title: 'Trang quản lý bài viết'
date: 2022-07-05T15:04:10.000Z
description: >-
  Để người dùng có thể quản lý được những bài đăng đã đăng, có thể đóng bài đăng, đăng lại 1 bài đăng, chúng ta nên làm 1 trang để người dùng có thể làm điều đó. rong hướng dẫn này chúng mình sẽ hướng dẫn cho các bạn làm trang quản lý bài viết
---

Trang quản lý bài đăng được bắt đầu từ file [manage-post.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/pages/manage-post.jsx). Trang này gồm 2 phần, Đã mua và đã bán, lần lượt hiện thị những bài viết người dùng đã mua và đã bán(những bài viết được đóng). Mỗi
khi người dùng bầm vào nút bấm nút **Đã bán/Ẩn bài** hay **Đăng lại** thì sẽ được đưa sang mục bên kia.

## Front-end

Việc phân chia trang thành 2 tab ta có thể sử dụng [Tabbar](https://mini.zalo.me/docs/framework/components/layout-components/tabs/) hỡ trợ bởi ZMP. Mỗi component được bài viết được thể hiện bằng component **PostItem** (trong file [post-item.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/post-item.jsx)).

Gọi 1 api lấy thông tin bài đăng [fetchUserPosts](https://github.com/quynhdinh/BanLai/blob/5263a8293e975ea7c92e1fb6b476a58758e4e9ed/client/src/pages/manage-post.jsx#L15). Đổ data vào mỗi tab tương ứng.
## Server
Schema của post:
- **_id**: String(**id** của bài đăng)
- **category**: String(**zaloId** của người gửi)
- **subCategory**: String(**zaloId** của người nhận)
- **zaloId**: String(zaloId của người bán)
- **city**: String(thành phố bán(chỉ có 2 lựa chọn Hà Nội và Hồ Chí Minh))
- **district**: String(quận huyện)
- **status**: String(trạng thái bài viết(đóng, mở))
- **condition**: String(tình trạng sản phẩm)
- **title**: String(tiêu đề bài viết)
- **price**: String(giá sản phẩm)
- **description**: String(mô tả sản phẩm)
- **productDetails**: Object(chi tiết sản phẩm, là kiểu json với key là thuộc tính tùy thuộc vào danh mục sản phẩm)
- **images**: Object(hình của sản phẩm)
- **createdAt**: IsoDate(thời gian mà post này được tạo lần đầu)
  Ngoài ra còn có các cột khác sẽ được tạo như **`__v`**, **updateAt** nhưng chúng ta không cần tới những cột này

Những api liên quan đến trang này bao gồm:
- Lấy những bài đăng theo từng danh mục
- Lấy từng bài đăng đã được xem bởi người dùng
- Lấy những bài đăng gần nhất theo từng danh mục
- Thêm 1 post
- Chỉnh sửa 1 post
- Bạn có thể tham khảo những api được cài đặt ở trong **server/routes/post.js**

![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/manage-post.jpg)

## Những component hữu ích

### LoadingVertical
Trong trang này chúng ta sử dụng component **LoadingVertical** để hiển thị thanh loading các bài viết khi đợi tải bài viết từ server, component này được cài đặt trong file **loading.jsx**.
Bạn sẽ thấy component này sẽ được tái sử dụng ở rất nhiều chỗ trong project này, tham khảo [tại đây](https://github.com/quynhdinh/BanLai/blob/440894a9332f6ae27bd239803b7aa3286bf1fac3/client/src/components/loading.jsx#L21)

### PostItem
Mỗi bài đăng như hình ở trên chi tiết cài đặt bạn có thể tham khảo [tại đây](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/post-item.jsx)