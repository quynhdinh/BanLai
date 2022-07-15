---
title: 'Trang chủ'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong bài viết này chúng mình sẽ hướng dẫn các bạn về Trang chủ của app Bán Lại
---

## Trang chủ
Khi phát triển những sản phẩm, ứng dụng liên quan đến thương mại điện tử, phần trang chủ của website hay app là cực kì quan trọng. Ở phần trang chủ chúng ta cần gây ấn tượng với người dùng để từ đó người dùng “đi sâu” hơn vào các luồng khác trong ứng dụng.

Đối với Bán Lại, team bọn mình chủ đích thiết kế phần trang chủ đơn giản nhưng đầy đủ thông tin nổi bật về các hạng mục mà app hướng đến kèm với đó là thanh điều hướng để người dùng có thể khám phá những tính khác.

Về mặt product, **Bán Lại** chỉ tập trung vào 2 danh mục chính đó là **thiết bị điện tử** và **đồ gia dụng nội thất**. Vì vậy ở màn hình chính bọn mình chia thành bố cục gồm:

- 2 icon danh mục, đây cũng là đường dẫn tới trang danh sách sản phẩm của từng category
- Tiếp theo sẽ là 2 danh sách liên tiếp chứa những sản phẩm nổi bật (thiết bị điện tử nổi bật, đồ gia dụng và nội thất nổi bật). Mỗi thẻ ở đây sẽ có tiêu đề, 1 danh sách trượt ngang, và một nút để xem tất cả. Đối với danh sách trượt ngang, team thiết kế 1 component gọi là post-tray, đây là phần khung của danh sách và bên trong chứa component category là 1 thẻ bọn mình tự design để phù hợp với mục tiêu của app. Đây là hướng dẫn cài đặt component [post-tray](https://www.notion.so/post-tray-187dabb63cc0437f9529c05294d66cf3) và [category](https://www.notion.so/category-70512e2a8eb748b9aa181b0a4d5f7136)
- Cuối cùng là danh sách những bài đâng mà người dùng đã xem, ở đây bọn mình cũng dùng component post-tray và category như ở trên, chỉ khác là sẽ không có nút xem tất cả :D
- Bên cạnh đó thanh điều hướng được đặt cố định ở phía dưới cùng của trang chủ. Đây cũng là 1 component mà team dựa vào sample code và custom để phù hợp với các tính năng mà team phát triển cho app. Và [đây](https://harmless-impatiens-74a.notion.site/navigation-bar-8e315000ab5e4021a7facffac96e0013) là phần cài đặt của navigation bar
<img src="https://harmless-impatiens-74a.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F620ce8b9-7c13-4c78-9090-82ff6ce18c71%2F461ac251ac026e5c3713_(3).jpg?table=block&id=aaf1c539-3d20-4078-8861-d6856d1ad76e&spaceId=953fd093-e64f-412d-b536-080f5c74480a&width=860&userId=&cache=v2" alt="drawing" width="400"/>
![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/home-comps.jpg)

## Tham khảo
[Tham khảo](https://harmless-impatiens-74a.notion.site/Trang-ch-1fbbe0e8ea494901847429d6e7ea4fa4)