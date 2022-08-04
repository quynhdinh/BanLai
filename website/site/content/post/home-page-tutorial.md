---
title: 'Trang chủ'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong bài viết này chúng mình sẽ hướng dẫn các bạn về những thành phần cấu tạo nên Trang chủ của app Bán Lại
---

## Trang chủ
Khi phát triển những sản phẩm, ứng dụng liên quan đến thương mại điện tử, phần trang chủ của website hay app là cực kì quan trọng. Ở phần trang chủ chúng ta cần gây ấn tượng với người dùng để từ đó người dùng “đi sâu” hơn vào các luồng khác trong ứng dụng.

Đối với Bán Lại, team bọn mình chủ đích thiết kế phần trang chủ đơn giản nhưng đầy đủ thông tin nổi bật về các hạng mục mà app hướng đến kèm với đó là thanh điều hướng để người dùng có thể khám phá những tính khác.

Về mặt product, Bán Lại chỉ tập trung vào 2 danh mục chính đó là **thiết bị điện tử** và **đồ gia dụng nội thất**. Vì vậy ở màn hình chính bọn mình chia thành bố cục gồm:

- 2 icon danh mục, đây cũng là đường dẫn tới trang danh sách sản phẩm của từng category. Bạn có thể xem toàn bộ sản phẩm theo 1 danh mục bằng cách bấm vào 1 trong 2 biểu tương icon ở trên cùng. Từ đó sẽ đi tới 1 trang mới. Hướng dẫn cài đặt ở [đây](https://scintillating-haupia-01fe5d.netlify.app/post/category-list/)
- Tiếp theo sẽ là 2 danh sách liên tiếp chứa những sản phẩm nổi bật (thiết bị điện tử nổi bật, đồ gia dụng và nội thất nổi bật). Mỗi thẻ ở đây sẽ có tiêu đề, 1 danh sách trượt ngang, và một nút để xem tất cả. Đối với danh sách trượt ngang, team thiết kế 1 component gọi là _post-tray,_ đây là phần khung của danh sách và bên trong chứa component category là 1 thẻ bọn mình tự design để phù hợp với mục tiêu của app. Đây là hướng dẫn cài đặt component [post-tray](https://scintillating-haupia-01fe5d.netlify.app/post/post-tray-tutorial/) và [category](https://scintillating-haupia-01fe5d.netlify.app/post/category-tutorial/)
- Cuối cùng là danh sách những bài đâng mà người dùng đã xem, ở đây bọn mình cũng dùng component post-tray và category như ở trên, chỉ khác là sẽ không có nút xem tất cả :D
- Bên cạnh đó thanh điều hướng được đặt cố định ở phía dưới cùng của trang chủ. Đây cũng là 1 component mà team dựa vào sample code và custom để phù hợp với các tính năng mà team phát triển cho app. Và [đây](https://scintillating-haupia-01fe5d.netlify.app/post/navigation-bar/) là bài viết hướng dẫn chi tiết của _navigation bar_
![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/home-comps.jpg)

## Tham khảo
[Tham khảo](https://scintillating-haupia-01fe5d.netlify.app/post/navigation-bar/)