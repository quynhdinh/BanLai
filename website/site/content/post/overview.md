---
title: 'Tổng quan về Zalo Mini App và Bán Lại'
date: 2022-07-12T15:04:10.000Z
description: >-
  Bài viết dưới đây sẽ hướng dẫn bạn cài đặt những công cụ để chạy được app, cách chạy ứng dụng trên thiết bị của bạn và đi qua chi tiết kĩ thuật để bạn có thể áp dụng ngay vào ứng dụng mini app của bạn.
---
## Zalo Mini App(ZMA) là gì ?
ZMA là giải pháp tích hợp ứng dụng web của doanh nghiệp vào nền tảng mạng xã hội Zalo. Các mini app mang đến trải nghiệm mượt mà tương tự như app riêng biệt mà không cần download về điện thoại hay thoát khỏi ứng dụng Zalo. Tìm hiểu thêm về ZMA tại [đây](https://mini.zalo.me/)
## Bán Lại là gì ?
Dù phát triển app trên ZMA vốn đã rất dễ dàng. Bán Lại giúp bạn phát triển app của riêng bạn thậm chí còn nhanh chóng hơn. Bán lại là một mini app chợ đồ cũ kết nối người mua và người bán có thể trao đổi sản phẩm đã qua sử dụng.
Mục tiêu của project này đóng vai trò 1 **template app** giúp các nhà phát triển tham khảo và hiện thực hóa các ý tưởng kinh doanh của họ nhanh chóng hơn. Source code đầy đủ của Bán Lại ở [đây](https://github.com/quynhdinh/BanLai) và xem video demo ở [đây](https://www.youtube.com/watch?v=1IexwSMcoT0). Bạn có thể trải nghiệm Bán Lại bằng cách quét mã QR sau bằng app Zalo!

![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/qr.png)
## Trang web này nói về gì?
Trang web này sẽ hướng dẫn bạn phát triển riêng 1 ZMA của bạn. Với đây đủ các bài viết hướng dẫn, hình ảnh trực quan từ code những đoạn code tiêu biểu dễ tái sử dụng.  
## Các công nghệ đằng sau Bán Lại
Chúng mình sử dụng **MERN stack** (MongoDB, Express.js, React.JS, và Node.js) làm những công nghệ back-bone để xây dựng ứng dụng mini appp của mình. MERN rất [phổ biến và được ưa chuộng](https://www.google.com/search?q=why+mern+in+popular&oq=why+mern+in+popular&aqs=chrome..69i57j33i160l3.6235j0j7&sourceid=chrome&ie=UTF-8). Tuy bạn có thể dùng bất cứ công nghệ backend nào ở phía backend và có thể dùng Vue.js 
ở frontend. Chúng mình đề nghị sử dụng **Node.js** ở backend và dùng **React.js** làm framework frontend để tận dụng tốt nhất những bài viết hướng dẫn này.

Cụ thể các công nghệ sử dụng bao gồm:
* Backend được xây dựng trên [Node.jS](https://nodejs.org/) dùng cơ sở dữ liệu là [MongoDB](https://www.mongodb.com/atlas/database), lưu trữ hình ảnh bằng [Cloudinary](https://cloudinary.com/), server được host trên [Heroku](https://heroku.com/)
* Frontend được xây dựng trên [Zalo mini framework](https://mini.zalo.me/docs/ui), [React.js](https://reactjs.org/), và [React Icon](https://react-icons.github.io/react-icons/)

## Hướng dẫn
Các bạn vui lòng theo đường link [này](https://scintillating-haupia-01fe5d.netlify.app/post/post-summary/) để xem tổng hợp các bài viết nhé.
## Hỗ trợ kỹ thuật
Cách nhanh nhất để được nhận sự hỗ trợ từ chúng mình là hãy tạo 1 [issue](https://github.com/quynhdinh/BanLai/issues). Hoặc các bạn có thể liên lạc với chúng mình qua các kênh liên lạc được cung cấp tại [đây](https://scintillating-haupia-01fe5d.netlify.app/contact/) 