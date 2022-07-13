---
title: 'Tổng quan về Mini App Bán Lại'
date: 2022-07-12T15:04:10.000Z
description: >-
  Bài viết dưới đây sẽ hướng dẫn bạn cài đặt những công cụ để chạy được app, cách chạy ứng dụng trên thiết bị của bạn và đi qua chi tiết kĩ thuật để bạn có thể áp dụng ngay vào ứng dụng mini app của bạn.
---
## Bán Lại là gì ?
Bán lại là một mini app chợ đồ cũ kết nối người mua và người bán có thể trao đổi sản phẩm đã qua sử dụng.
Mục tiêu của project này đóng vai trò 1 **template app** giúp các nhà phát triển tham khảo và nhanh chóng hiện thực
hóa các ý tưởng kinh doanh của họ nhanh chóng hơn.
## Các công nghệ đằng sau Bán Lại
Chúng tôi sử dụng MERN stack(MongoDB, Express.js, React.JS, and Node.js) làm những công nghệ back-bone để xây dựng ứng dụng mini appp của mình. MERN rất phổ biến và được ưa chuộng. Tuy bạn có thể dùng bất cứ công nghệ backend nào ở phía backend và Vue.js 
ở frontent. Chúng tôi khuyến nghị sử dụng Node.js ở backend và dùng React.js làm framework frontend để tận dụng tốt nhất project này.
* Backend được xây dựng trên [NodeJS](https://nodejs.org/) dùng cơ sở dữ liệu là [MongoDB](https://www.mongodb.com/atlas/database), lưu trữ hình ảnh bằng [Cloudinary](https://cloudinary.com/), server được host trên [Heroku](https://heroku.com/)
* Frontend được xây dựng trên [Zalo mini framework](https://mini.zalo.me/docs/ui), [ReactJS](https://reactjs.org/), và [React Icon](https://react-icons.github.io/react-icons/)

Sau đây là những bài viết hướng dẫn liên quan đến app. Bạn có thể follow các link liên quan để tìm hiểu thêm nhé!
### Cài đặt Clone project, cài đặt các service Heroku, Mongo Atlas và Cloudinary
[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/setting-up-tutorial/)

### Tạo bài đăng và sửa bài đăng
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/create.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/create-post-tutorial/)

### Chi tiết bài đăng
[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/post-details-tutorial/)

### Trang chủ
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/home.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/home-page-tutorial/)

### Trang quản lý tin nhắn
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/messages.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/message-page-tutorial/)

### Trang tài khoản
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/account.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/account-page-tutorial/)

### Trang quản lý bài viết
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/manage-post.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/manage-posts-page-tutorial/)
