---
title: 'Trang tài khoản và danh sách quan tâm'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong bài viết này chúng tôi sẽ hướng dẫn cho các bạn trang Cá nhân
---

Trang cá nhân là nơi sẽ hiển thị những metric cơ bản về người dùng(Số lượng lượt xem những bài họ đăng, lượt thích những bài họ đăng). Tên, avatar và mục, danh sách quan tâm(những bài họ bấm quan tâm).
Page liên quan đến trang này là **account.jsx**. 
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/account.jpg)

## Server
Model lưu thông tin người dùng là [user.js](https://github.com/quynhdinh/BanLai/blob/master/server/models/user.js)

Mỗi khi vào trang này chúng ta cần gọi api lấy các số liệu như là tổng số lượt thích vào tổng số lượt xem, 2 api này được thể hiện [đây](https://github.com/quynhdinh/BanLai/blob/1e7e4ab60e40906c0af1e349def1dfa1176de323/server/routes/user.js#L25)
## Trang tài khoản

Component sử dụng cho mục tên và avatar người dùng là **UserCard**(tham khảo [**user-card.jsx**](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/user-card.jsx)).

## Trang bài viết quan tâm

Được thể hiện trong file [care-list.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/pages/care-list.jsx). Phần này không có gì đặc biệt. Data vẫn được fetch mỗi khi tải lại trang(**useEffect**). Tái sử dụng lại component **Category**(tham khảo file [**Category.js**](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/Categories/Category.jsx)).
