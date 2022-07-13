---
title: 'Trang quản lý bài viết'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong hướng dẫn này chúng tôi sẽ hướng dẫn cho các bạn làm trang quản lý bài viết
---

Trang quản lý bài đăng được bắt đầu từ file **manage-post.jsx**. Trang này gồm 2 phần, Đã mua và đã bán, lần lượt hiện thị những bài viết người dùng đã mua và đã bán(những bài viết được đóng). Mỗi
khi người dùng bầm vào nút bấm nút **Đã bán/Ẩn bài** hay **Đăng lại** thì sẽ được đưa sang mục bên kia.

## Tổng quan

Việc phân chia trang thành 2 tab ta có thể sử dụng [Tabbar](https://mini.zalo.me/docs/framework/components/layout-components/tabs/) trong ZMP. Mỗi component được bài viết được thể hiện bằng component **PostItem** (trong file **post-item.jsx**).

## Những component hữu ích

### LoadingVertical
Trong trang này chúng ta sử dụng component **LoadingVertical** để hiển thị thanh loading các bài viết khi đợi tải bài viết từ server, component này được cài đặt trong file **loading.jsx**.
Bạn sẽ thấy component này sẽ được tái sử dụng ở rất nhiều chỗ trong project này.

### PostItem
