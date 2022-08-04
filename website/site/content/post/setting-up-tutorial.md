---
title: 'Hướng dẫn clone project, chạy project và cài đặt Heroku Server, Mongo Atlas và Cloudinary'
date: 2022-07-05T15:04:10.000Z
description: >-
    Trong hướng dẫn này, chúng mình sẽ chỉ cho bạn cách clone repo này, thiết lập các dịch vụ liên quan để chạy Bán Lại mini app trên máy của bạn
---

Repo này gồm 3 folder:
- **client**: Bán Lại front-end, được tạo bởi **zmp-cli**. Tuy mini app có thể lập trình bằng framework nào cũng được, chúng mình đề nghị sử dụng React.JS để tận dụng đượch hết bộ ZAUI. Hướng dẫn để tạo 1 zmp client mới ở đây: (https://mini.zalo.me/docs/docs/getting-started/#tạo-mới-dự-án-sử-dụng-zmp-framework)
- **server**: Bán Lại back-end, sử dụng Node, Express, MongoDB. Không có giới hạn cho lựa chọn cho ngôn ngữ lập trình hay công nghệ cho Backend Node, Express and MongoDB.
- **website**: Source code cho trang web này, bạn không cần quan tâm.

## Yêu cầu

1. [Install Node JS](https://nodejs.org/en/download/)
2. [Install Mini App DevTools CLI](https://mini.zalo.me/docs/dev-tools)
3. Clone repo này

### Client
1. Cd đến folder frontend của bạn:
   ```bash
   cd client
   ```
1. Cài những dependencies
   ```bash
   npm install
   ```
1. Open **.env.development** and **.env.production** để cài đặt các biến môi trường

1. Chạy client dùng zmp-cli
   ```bash
   zmp start

1. Mở **localhost:3000** bằng trình duyệt và bắt đầu code thôi🔥

### Server API
1. Cd đến folder backend của bạn:
   ```bash
   cd server-api
   ```
1. Install dependencies
   ```bash
   npm install
   ```
1. Tạo 1 file `.env` chưa những configs sau:
   ```bash
   PORT=5000
   MONGODB_URL=mongodb+srv://YOUR_MONGODB_CONNECTION_STRING
   OA_TOKEN=YOUR_OA_TOKEN_STRING
   ```

  - Bạn có thể đổi **PORT** bằng cái gì cũng được nhưng nhớ hãy sync theo **VITE_BASE_URL** trong **client/.env.development** để ứng với PORT bạn đã chọn.

  - **MONGODB_URL**: link Mongo cluster để kết nối đến csdl của bạn.

  - **OA_TOKEN** sẽ cần nếu bạn muốn để gửi tin nhắn đến người dùng . Cách để lấy **OA_TOKEN** ở [đây](https://developers.zalo.me/docs/api/official-account-api/phu-luc/official-account-access-token-post-4307)

1. Start server bằng lệnh
   ```bash
   npm start
   ```

## Deployment

### Client
1. Cd đến folder front-end của bạn:
   ```bash
   cd client
   ```
1. Deploy bằng zmp-cli (https://mini.zalo.me/docs/dev-tools/cli/commands/deploy), Sẽ sinh ra 1 mã QR Code và có thể mở lên bằng App Zalo
   ```bash
   zmp deploy
   ```

Nhớ update file VITE_BASE_URL trong client/.env.production để point đến API server của ban, vì bạn sẽ không thể gọi server localhost từ thiết bị Zalo.

### Server API

Bạn có thể host source code này bằng các dịch vụ khác nhau. Bài viết này sẽ  deploy với [Heroku](https://www.heroku.com/)

**Lưu ý:** Để test được mini app của bạn trên Zalo(scan QR code), bạn phải host server backend dùng một service khác(ở đây là Heroku).

1. Cd đến folder backend của bạn:
   ```bash
   cd server
   ```
1. Cài [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) và login
   ```bash
   heroku login
   ```
1. Init 1 git repo strong code backend của bạn, add Heroku as a remote trong backend code của bạn
   ```bash
   git init
   heroku git:remote -a zmp-banlai-sẻver
   ```
1. Commit code của bạn và deploy bằng git.
   ```bash
   git add .
   git commit -am "first deployment with heroku"
   git push heroku master
   ```

Mở trình duyệt lên và đi đến server vừa host lên Heroku của bạn (https://app-name.herokuapp.com)

## Hướng dẫn sử dụng:

### Client code

Client code nằm trong folder **client/**:
* **src**: Bao gồm toàn bộ những source code của mini app của bạn. Trong đó:

  * **components**: những component sẽ được tái sử dụng viết bằng **React.js**
  * **css**: Stylesheets, pre-processors
  * **pages**: chứa những **Page** cũng có thể coi là một component những sẽ là toàn bộ view và phải được register trong [app-config.json](https://mini.zalo.me/docs/framework/getting-started/app-config#pages)
  * **services**: những logic có thể dùng lại có thể tách ra khỏi component của bạn, như là fetching API, get access token từ Zalo hoặc caching,...
  * **static**: bao gồi assets cho mini app của bạn, (icon, background, etc,...)
* **.env.**: Các biến môi trường, zma dùng Vite build tools, đọc thêm về Vite env [ở đây](https://vitejs.dev/guide/env-and-mode.html#env-variables)
  * **.env.development**: Load các biến local khi local khi bạn **zmp start**.
    
Nếu bạn đang dùng **getAccessToken** API  từ [zmp](https://mini.zalo.me/docs/api/getAccessToken) khi chạy trên trình duyệt, zmp luôn trả về **DEFAULT ACCESS TOKEN** bởi vì không có người dùng Zalo nào thật login cả. Hãy khai báo một biến tên **VITE_DEFAULT_ACCESS_TOKEN** để mock 1 người dùng Zalo thật để có thể dev trên máy local của bạn.

  * **.env.production**: Được tải lên khi bạn `zmp deploy`
  * **app-config.json**: Cấu hình global mini app của bạn (https://mini.zalo.me/docs/framework/getting-started/app-config)

### Backend code

* **models**: Mongoose Model, giúp bạn lưu dữ liệu và đọc dữ liệu lên từ MongoDB
* **routes**: chứa các routes, bạn có thể gọi nó là Controller nếu bạn biết về MVC
* **pages**: một Page cũng là một component nhưng sẽ hoạt động như view và phải được register trong [app-config.json](https://mini.zalo.me/docs/framework/getting -started / app-config # trang)
* **services**: chữa những logic có thể sử dụng lại cho các tác vụcần được tách biệt khỏi routes của bạn, chẳng hạn như token handling và tìm nạp API Zalo OA, ..
* **app.js**: nơi bắt đầu server của bạn, nơi kết nối tất cả các phần phụ trợ của bạn với nhau. Đây là nơi bạn đăng ký các tuyến đường mới hoặc phần mềm trung gian, xử lý các công cụ CORS, ...
* **config.js**: cấu hình server của bạn. Hầu hết thời gian bạn sẽ đọc cấu hình từ biến môi trường (chẳng hạn như tạo **.env** trên máy local của bạn hoặc **heroku config: set** trên các dịch vụ lưu trữ của bạn). Dưới đây là các cấu hình bắt buộc:
  * **MONGODB_URL**: Connection string với cơ sở dữ liệu MongoDB của bạn
  * **ZALO_APP_ID**: nếu bạn chưa có ID APP, hãy truy cập Zalo Developers để đăng ký và đặt tại đây
  * **ZALO_APP_ID**: ID của mini app của bạn
