---
title: 'Trang quản lý tin nhắn'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong hướng dẫn này chúng mình sẽ hướng dẫn cho các bạn làm trang tin nhắn
---

Bạn có thể tham khảo file **[messages.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/pages/messages.jsx)**.

## Server
Schema của message:
- **sender**: String(**zaloId** của người gửi)
- **receiver**: String(**zaloId** của người nhận)
- **postId**: String(post id của post mà họ đang bàn tới)
- **createdAt**: IsoDate(thời gian mà tin nhắn này được tạo lần đầu)

Những api liên quan bao gồm:
- Lấy danh sách tin nhắn của 1 user. Bạn sẽ phản lập trình cẩn thận 1 chút để mà lấy được cả tin nhắn cho cả phần Tôi mua và Tôi bán. Tham khảo code server [ở đây](https://github.com/quynhdinh/BanLai/blob/440894a9332f6ae27bd239803b7aa3286bf1fac3/server/routes/message.js#L8)
- Tạo 1 message để tracking mỗi khi người mua liên hệ với người bán. Code server [ở đây](https://github.com/quynhdinh/BanLai/blob/440894a9332f6ae27bd239803b7aa3286bf1fac3/server/routes/message.js#L39)
## Client code
Để phân chia ra làm 2 tab, _Tôi mua_ và _Tôi bán_, bạn có thể sử dụng [Tabbar](https://mini.zalo.me/docs/framework/components/layout-components/tabs/) hỗ trợ bởi ZMP.
Mỗi thành phần tin nhắn được cài đặt trong component **MessageItem** (tham khảo [message-item.jsx](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/message-item.jsx))
![Alt Text](https://scintillating-haupia-01fe5d.netlify.app/img/messages.jpg)

### Sự kiện người dùng bấm vào mỗi **MessageItem**
Zmp có hỗ trợ [openChat](https://mini.zalo.me/static/zmp-docs/v1.12.0/api/openChat/) cho phép ứng dụng mở cửa số chat với User hoặc Official Account. Để sử dụng api này, bạn cần xin cấp quyền tại trang Quản lý ứng dụng.
```javascript
const handleOpenChat = (p) => () => {
  api.openChat({
    type: 'user',
    id: p.receiver,
    message: ""
  });
};
```


Các bạn lưu ý, cho dù không muốn điền sẵn nội dung vào khung chat nhưng thuộc tính _message_ là bắt buộc, các bạn có thể truyền chuỗi rỗng.