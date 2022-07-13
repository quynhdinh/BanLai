---
title: 'Tạo bài đăng và sửa chi tiết bài đăng'
date: 2022-07-12T15:04:10.000Z
description: >-
  Trong bài viết này chúng tôi sẽ hướng dẫn cho bạn tạo bài đăng và sửa chi tiết bài đăng
---

## Tạo bài đăng

- Chọn danh mục và danh mục phụ
- Điền thông tin chi tiết
  - Hình ảnh và mô tả (hình ảnh sản phẩm, tiêu đề và mô tả)
  - Thông tin chi tiết (hãng sản xuất, màu sắc, công suất,...)
  - Địa chỉ (tỉnh/thành phố và quận huyện)
- Đăng bài

Trong phần điền thông tin chi tiết, Bán Lại có sử dụng những component riêng với những tính năng đặc biệt như đưa ra gợi ý giúp người dùng có thể điền thông tin đúng hơn, từ đó giúp việc validate form dễ dàng hơn. Đây là một vài ví dụ:

- [Input](https://harmless-impatiens-74a.notion.site/Input-7f24603283804d4084ea20349cc02207)
- [Text area](https://harmless-impatiens-74a.notion.site/Textarea-2cef345cbd284066ace5dcb83769a353)
- [ImageUploder](https://harmless-impatiens-74a.notion.site/Image-Uploader-8042663e285148a3ba282ed76d02f2b4)
- [Select](https://harmless-impatiens-74a.notion.site/Select-ca7da06cbad2482a9d82abc83b57e085)


Chúng ta đều nhận thấy được sự phức tạp và khó khăn mà chúng ta có thể gặp phải khi làm việc với form. Chúng ta phải xử lý các form dài dòng, validate, quản lý state của form và các component bên trong nó. Trong mini program Bán Lại, `React-hook-form` được sử dụng để xác thực form. React-hook-form là một thư viện giúp bạn xác thực các form trong React, là một thư viện tối thiểu không có bất kỳ phụ thuộc nào khác. Nó rất tiện và dễ sử dụng, yêu cầu các developer code ít hơn các thư viện khác. Một tính năng tuyệt vời khác được cung cấp bởi React Hook Form là tích hợp dễ dàng với các thư viện UI, vì hầu hết các thư viện đều hỗ trợ **ref**.

Bạn có thể truy cập vào link [này](https://react-hook-form.com/get-started/) để tham khảo document về cách xác thực một form sử dụng React Form Hook.

# Sửa chi tiết bài đăng

Khi người đăng bài, họ có thể sẽ muốn thay đổi một vài chi tiết trong bài đăng đó. Để tiết kiệm thời gian lập trình, ta có thể tận dụng trang tạo bài đăng làm trang chỉnh sửa chi tiết bài đăng. Hai trang này có thể được phân biệt với nhau bằng một thuộc tính trong query của url trang.

Ở phần tạo bài đăng, Bán Lại đã sử dụng **React Hook Form** để xác thực form vì những sự tiện lợi của nó mang lại. Một tính năng tuyệt vời khác của React Hook Form là [reset](https://react-hook-form.com/api/useform/reset/), giúp fill data vào những component nhập thông tin.



Trong Bán Lại, đầu tiên khi người bán muốn sửa chi tiết một bài đăng nào đó, API lấy chi tiết bài đăng sẽ được gọi và lưu chi tiết đó vào một state trong `store`. form sẽ lấy data từ state này và fill vào các component dùng để nhập thông tin.

[Tham khảo](https://harmless-impatiens-74a.notion.site/T-o-b-i-ng-v-s-a-chi-ti-t-b-i-ng-ccea11e79dba4ff0811326f7113e3896)