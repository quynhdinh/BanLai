---
title: 'Tổng quan về backend và database'
date: 2022-07-31T15:04:10.000Z
description: >-
    Bài viết này chúng mình sẽ hướng dẫn cho các bạn những model chúng mình dùng để lưu database cho app.
---

### Tổng quan
![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/banlai.drawio.png)

Trong MongoDB không có khái niệm khóa ngoại(foreign key, cho nên những đường ràng buộc trong hình trên các bạn chỉ nên tham khảo). Có 5 model chính ứng với 5 database mình sẽ lưu trong database là _post_, _message_, _user_ và _viewedpostmapping_ và _carepostmapping_. Sau đây là đặc tả các bảng trong database và nhóm api liên quan đến nó.
### post
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

Schema của [post](https://github.com/quynhdinh/BanLai/blob/master/server/models/post.js)

Apis liên quan đến [post](https://github.com/quynhdinh/BanLai/blob/master/server/routes/post.js)
### messsage
Lưu thông tin tin nhắn của người dùng
- **sender**: String(**zaloId** của người xem)
- **receiver**: String(**zaloId** của người nhận)
- **postId**: String(**postId** bài đăng mà 2 người này đang nói tới)

Schema của [message](https://github.com/quynhdinh/BanLai/blob/master/server/models/message.js)

Apis liên quan đến [message](https://github.com/quynhdinh/BanLai/blob/master/server/routes/message.js)
### user
Lưu thông tin của người dùng
- **zaloId**: String(**zaloId** của người xem)
- **birthday**: Date(sinh nhật của người dùng)
- **picture**: String(avatar của người dùng)
- **name**: String(tên của người dùng)

_birthday_, _name_ và _picture_ sẽ được lấy bằng zalo API.

Schema của [user](https://github.com/quynhdinh/BanLai/blob/master/server/models/user.js)

Apis liên quan đến [user](https://github.com/quynhdinh/BanLai/blob/master/server/routes/user.js)
### viewedpostmapping
Lưu thông tin xem bài đăng của người dùng(số lượt xem)

Schema của [viewedpostmapping](https://github.com/quynhdinh/BanLai/blob/master/server/models/viewed-post-mapping.js)

Apis liên quan đến [viewedpostmapping](https://github.com/quynhdinh/BanLai/blob/master/server/routes/viewedpostmapping.js)

- **zaloId**: String(**zaloId** của người xem)
- **postId**: String(**postId** của bài viết)
- **count**: Number(số lượt xem)
### carepostmapping
Lưu thông tin quan tâm bài đăng của người dùng
- **zaloId**: String(**zaloId** của người xem)
- **postId**: String(**postId** của bài viết)

Schema của [carepostmapping](https://github.com/quynhdinh/BanLai/blob/master/server/models/care-post-mapping.js)

Apis liên quan đến [carepostmapping](https://github.com/quynhdinh/BanLai/blob/master/server/routes/carepostmapping.js)

### Cheat APIs
Bọn mình có chuẩn bị 1 số api cheat để fake ra data nhằm mục đích hiển thị cho những người dùng mới các bạn có thể tham khảo ở [đây](https://github.com/quynhdinh/BanLai/blob/master/server/routes/cheat.js)
