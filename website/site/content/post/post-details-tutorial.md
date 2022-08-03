---
title: 'Chi tiết bài đăng'
date: 2022-07-12T15:04:10.000Z
description: >-
  Trong bài viết này chúng mình sẽ đi qua những phần liên quan đến trang chi tiết bài đăng. Đây là phần khá quan trọng vì ắt hẳn trong một ứng dụng nào cũng có những phần sau.
---

![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/pd.jpg)

## Về front-end trang Chi tiết bài đăng
Trang chi tiết bài đăng được thể hiện trong file code [post-detail.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/pages/post-detail.jsx). 

Khi đã tạo bài đăng cho một sản phẩm, để người mua có thể xem nó thì cần có một trang chi tiết bài đăng. Trong Bán Lại, phần chi tiết bài đăng gồm những phần chính như sau

#### Hình ảnh
Chúng ta cần một [**Swiper**](https://mini.zalo.me/docs/framework/components/basic-components/swiper/) để user có được hiệu ứng trượt ảnh. [Code](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L105) 
#### Tiêu đề và giá, nút like
Bạn có thể tham khảo đoạn code [này](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L113)
#### Thời gian và địa điểm
Được thể hiện trong component _Description_ tham khảo [code](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L188)
#### Mô tả chi tiết
[code](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L153)
#### Chia sẻ bài đăng
[code](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L160)
#### Thông tin người bán
Được thể hiện trong component _SellerInfo_ tham khảo [code](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L165)
#### Các sản phẩm tương tự
Chúng ta tái sử dụng component **PostTray** được thể hiện ở [đây](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L169).
#### Liên hệ với người bán

Trong mini program Bán Lại, bạn có thể chia sẻ qua Zalo, Facebook hoặc copy link, để chia sẻ qua Zalo, bạn cần phải có quyền truy cập API **openShareSheet**. Link hướng dẫn chi tiết được đính kèm ở [đây](https://mini.zalo.me/docs/api/openShareSheet/)

Một tính năng quan trọng của một sàn thương mại điện tử là phần trao đổi giữa người mua và người bán. Trong Bán Lại, để trao đổi thông tin giữa 2 bên, bạn có thể tham khảo cách này

## Về các api liên quan đến phần Chi tiết bài đăng
Chúng mình lựa chọn chỉ gọi 1 api để load chi tiết bài đăng khi vào khi vào trang này (tham khảo [api](https://github.com/quynhdinh/BanLai/blob/d437b74160762808be334b7a1792a305d2da5a22/server/routes/post.js#L137)). Mỗi khi người dùng vào xem 1 chi tiết bài đăng, client sẽ có 1 gọi api để update lượt xem bài đăng tham khảo [api](https://github.com/quynhdinh/BanLai/blob/c2b3ce69f090e0ea6e5deb4797005264de5f4dd2/server/routes/viewed-post.js#L8) và mỗi lần người dùng nhấn thích bài đăng 
sẽ có api để gọi api thích bài đăng (tham khảo [api](https://github.com/quynhdinh/BanLai/blob/c2b3ce69f090e0ea6e5deb4797005264de5f4dd2/server/routes/care-list.js#L26) (tạo 1 mapping user-post vào bảng **carelistmapping**)).

Để tránh việc người dùng spam thích và bỏ thích 1 bài liên tục gây nên những cuộc gọi không cần thiết đến server. Tụi mình đã handle việc này bằng cách sử dụng _useState_. 
Nếu các bạn để ý dòng [này](https://github.com/quynhdinh/BanLai/blob/5e2d362e8740aa1440d306bb52dbb1eca5ebf438/client/src/pages/post-detail.jsx#L52) thì chúng mình chỉ gọi api thích/bỏ thích sau mỗi 250ms.

[Tham khảo](https://harmless-impatiens-74a.notion.site/Chi-ti-t-b-i-ng-eeac97f480e74b5aba31d5e9325ca286)