---
title: 'Tổng quan về Zalo Mini App và Bán Lại'
date: 2022-07-12T15:04:10.000Z
description: >-
  Bài viết dưới đây sẽ hướng dẫn bạn cài đặt những công cụ để chạy được app, cách chạy ứng dụng trên thiết bị của bạn và đi qua chi tiết kĩ thuật để bạn có thể áp dụng ngay vào ứng dụng mini app của bạn.
---
## Zalo Mini App là gì ?
Mini app trên Zalo là giải pháp tích hợp ứng dụng web của doanh nghiệp vào nền tảng mạng xã hội Zalo. Các mini app mang đến trải nghiệm mượt mà tương tự như app riêng biệt mà không cần download về điện thoại hay thoát khỏi ứng dụng Zalo. Tìm hiểu thêm về ZMA tại [đây](https://mini.zalo.me/)
## Bán Lại là gì ?
Dù phát triển app trên Zalo Mini App(viết tắt ZMA) vốn đã rất dễ dàng. Bán Lại giúp bạn phát triển app của riêng bạn thậm chí còn nhanh chóng hơn. Bán lại là một mini app chợ đồ cũ kết nối người mua và người bán có thể trao đổi sản phẩm đã qua sử dụng.
Mục tiêu của project này đóng vai trò 1 **template app** giúp các nhà phát triển tham khảo và hiện thực hóa các ý tưởng kinh doanh của họ nhanh chóng hơn. Source code của Bán Lại ở [đây](https://github.com/quynhdinh/BanLai)
## Trang web này nói về gì?
Trang web này sẽ hướng dẫn bạn phát triển riêng 1 ZMA của bạn. Với đây đủ các bài viết hướng dẫn, hình ảnh trực quan từ code những đoạn code tiêu biểu dễ tái sử dụng.  
## Các công nghệ đằng sau Bán Lại
Chúng mình sử dụng **MERN stack** (MongoDB, Express.js, React.JS, và Node.js) làm những công nghệ back-bone để xây dựng ứng dụng mini appp của mình. MERN rất [phổ biến và được ưa chuộng](https://www.google.com/search?q=why+mern+in+popular&oq=why+mern+in+popular&aqs=chrome..69i57j33i160l3.6235j0j7&sourceid=chrome&ie=UTF-8). Tuy bạn có thể dùng bất cứ công nghệ backend nào ở phía backend và có thể dùng Vue.js 
ở frontend. Chúng mình đề nghị sử dụng **Node.js** ở backend và dùng **React.js** làm framework frontend để tận dụng tốt nhất những bài viết hướng dẫn này.

Cụ thể các công nghệ sử dụng bao gồm:
* Backend được xây dựng trên [Node.jS](https://nodejs.org/) dùng cơ sở dữ liệu là [MongoDB](https://www.mongodb.com/atlas/database), lưu trữ hình ảnh bằng [Cloudinary](https://cloudinary.com/), server được host trên [Heroku](https://heroku.com/)
* Frontend được xây dựng trên [Zalo mini framework](https://mini.zalo.me/docs/ui), [React.js](https://reactjs.org/), và [React Icon](https://react-icons.github.io/react-icons/)

## Các bài viết liên quan đến kĩ thuật
Sau đây là những bài viết hướng dẫn liên quan đến app. Bạn có thể follow các link liên quan để tìm hiểu thêm nhé!
### Clone project, cài đặt các service Heroku, Mongo Atlas và Cloudinary
Hướng dẫn clone repo này, thiết lập các dịch vụ liên quan để chạy Bán Lại mini app trên máy của bạn. Bài viết tiên quyết, các bạn rất nên đọc qua nhé.

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/setting-up-tutorial/)

### Tạo bài đăng và sửa bài đăng
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/create.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/create-post-tutorial/)

### Chi tiết bài đăng
Hiển thị chi tiết thông tin 1 bài đăng. Cho phép sửa, thích và nhắn tin với người bán.

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/post-details-tutorial/)

### Trang chủ
Hiển thị những bài viết mới nhất, những bài viết đã xem, hay sắp xếp, lọc theo nhiều tùy chọn tùy ý. 

![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/home.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/home-page-tutorial/)

### Trang quản lý tin nhắn
Trang này sẽ lưu lại những người mà bạn đã từng liên lạc sắp xếp theo thứ tự giảm dần theo thời gian được chia theo 2 phân tôi mua và tôi bán. Với 1 cái chạm bạn có thể tiếp tục trò chuyện với họ từ cửa sổ chat Zalo.

![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/messages.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/message-page-tutorial/)

### Trang tài khoản và trang danh sách quan tâm
Một app nào chắc hẳn đều có trang quản lý tài khoản, chứa những thông tin sơ bộ về người dùng như là tên, hình ảnh và các thông số liên quan.

![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/account.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/account-page-tutorial/)

### Trang quản lý bài viết
Giúp xem lại những bài viết mà bạn đã đăng

![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/manage-post.gif)

[Xem thêm](https://scintillating-haupia-01fe5d.netlify.app/post/manage-posts-page-tutorial/)

## Hỗ trợ kỹ thuật
Cách tốt nhất để được hỗ trợ là tạo 1 [Github Issue](https://github.com/quynhdinh/BanLai/issues). 
Còn không bạn có thể liên lạc qua các kênh liên lạc được cung cấp tại [đây](https://scintillating-haupia-01fe5d.netlify.app/contact/) 