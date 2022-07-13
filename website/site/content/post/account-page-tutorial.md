---
title: 'Trang tài khoản'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong bài viết này chúng tôi sẽ hướng dẫn cho các bạn trang Cá nhân
---

Trang cá nhân là nơi sẽ hiển thị những metric cơ bản về người dùng(Số lượng lượt xem những bài họ đăng, lượt thích những bài họ đăng). Tên, avatar và mục, danh sách quan tâm(những bài họ bấm quân). 
`Page` để làm trang này là `account.jsx`. 

## Trang tài khoản

Component sử dụng cho mục tên và avatar người dùng là `UserCard`(tham khảo `user-card.jsx`).

## Trang bài viết quan tâm

Phần này không có gì đặc biệt. Data vẫn được fetch mỗi khi tải lại trang(`useEffect`). Tái sử dụng lại component `Category`(tham khảo file `Category.js`)