---
title: 'Hướng dẫn cài đặt Heroku Server, Mongo Atlas và Cloudinary'
date: 2017-01-04T15:04:10.000Z
description: >-
    Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách sao chép dự án của chúng tôi, thiết lập các dịch vụ liên quan để chạy ứng dụng nhỏ trên máy của bạn
---

Repo này gồm 3 folder:
- `client`: Bán Lại front-end, created by using the `zmp-cli`. Miniapp client can be written in any library and frameworks, we recommend using React.JS to get the most out of our ZaUI. Documentation on how to create a new zmp client here: (https://mini.zalo.me/docs/docs/getting-started/#tạo-mới-dự-án-sử-dụng-zmp-framework)
- `server`: Bán Lại back-end, sử dụng Node, Express, MongoDB. Không có giới hạn cho lựa chọn cho ngôn ngữ lập trình hay công nghệ cho Backend Node, Express and MongoDB.
- `website`: Code cho trang web này, bạn không cần quan tâm.

## Pre-requisites

1. [Install Node JS](https://nodejs.org/en/download/)
2. [Install Mini App DevTools CLI](https://mini.zalo.me/docs/dev-tools)
3. Clone repo này

### Client
1. Cd đến folder frontend của bạn:
   ```bash
   cd client
   ```
1. Install dependencies
   ```bash
   npm install
   ```
1. Open `.env.development` and `.env.production` to setup environments (OA ID for the Follow/Message button, API base for fetching products, orders,...)

1. Chạy client dùng zmp-cli
   ```bash
   zmp start

1. Mở `localhost:3000` bằng trình duyệt và bắt đầu code thôi🔥

### Server API
1. Cd đến folder backend của bạn:
   ```bash
   cd server-api
   ```
1. Install dependencies
   ```bash
   npm install
   ```
1. Create a new file `.env` and put these configurations:
   ```bash
   PORT=5000
   MONGODB_URL=mongodb+srv://YOUR_MONGODB_CONNECTION_STRING
   OA_TOKEN=YOUR_OA_TOKEN_STRING
   ```

  - You can change the PORT to anything you want, however remember to sync the `VITE_BASE_URL` in `client/.env.development` to match the PORT that you choose.

  - MONGODB_URL is required to connect to your MongoDB server.

  - OA_TOKEN is required to send message to your customer after they settled an order. How to get an OA_TOKEN here: (https://developers.zalo.me/docs/api/official-account-api/phu-luc/official-account-access-token-post-4307)

1. Start server using npm script
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

Remember to update VITE_BASE_URL in `client/.env.production` to point to your server API address, since you won't be able to call localhost API.

### Server API

The source code in this example can be hosted anywhere. Here is an instruction on how to deploy it to [Heroku](https://www.heroku.com/)

> Note: In order to test your application on Zalo by scanning QR code, you will need to host your backend in an external server.

1. Cd đến folder backend của bạn:
   ```bash
   cd server
   ```
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) và login
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

### Client

Client code nằm trong folder **`client/`**:
* **`src`**: Bao gồm toàn bộ những source code của mini app của bạn. Trong đó:

  * **`components`**: những component sẽ được tái sử dụng viết bằng React JS
  * **`css`**: Stylesheets, pre-processors also supported
  * **`pages`**: a Page is also a component but will act as an entire view and must be registered inside `app-config.json` (https://mini.zalo.me/docs/framework/getting-started/app-config#pages)
  * **`services`**: reuseable logic for complex tasks that should be separated from your component, such as fetching API, get access token from Zalo or caching stuff,...
  * **`static`**: contain binary assets of your Mini App, such as icon, background, etc,...
* **`.env.*`**: Các biến môi trường, zmp is using Vite build tools, read more about Vite env here (https://vitejs.dev/guide/env-and-mode.html#env-variables)
  * **`.env.development`**: Loaded when running project locally with `zmp start`.

    > If you're using `getAccessToken` API from zmp (https://mini.zalo.me/docs/api/getAccessToken) when running on browser, zmp will always return "DEFAULT ACCESS TOKEN" because there is no logged in Zalo user. Specify a `VITE_DEFAULT_ACCESS_TOKEN` to mock a real Zalo user for development purpose.

  * **`.env.production`**: Loaded when deploy project to Zalo with `zmp deploy`
  * **`app-config.json`**: Global configuration for your Mini App (https://mini.zalo.me/docs/framework/getting-started/app-config)
  
  Most of the time you won't need to touch these other files. `src` will be the busiest section of your development process.

### Backend code

* **`models`**: Mongoose Model, giúp bạn lưu dữ liệu và đọc dữ liệu lên bằng MongoDB
* **`lines`**: các trình xử lý tuyến đường có thể gắn kết, bạn có thể gọi nó là Controller nếu bạn biết về MVC
* **`services`**: một Trang cũng là một thành phần nhưng sẽ hoạt động như một chế độ xem toàn bộ và phải được đăng ký bên trong` app-config.json` (https://mini.zalo.me/docs/framework/getting -started / app-config # trang)
* **`services`**: logic có thể sử dụng lại cho các tác vụ phức tạp cần được tách biệt khỏi các tuyến của bạn, chẳng hạn như xử lý mã thông báo và tìm nạp API Zalo OA, ..
* **`app.js`**: điểm vào server của bạn, nơi kết nối tất cả các phần phụ trợ của bạn với nhau. Đây là nơi bạn đăng ký các tuyến đường mới hoặc phần mềm trung gian, xử lý các công cụ CORS, ...
* **`config.js`**: cấu hình máy chủ của bạn. Hầu hết thời gian bạn sẽ đọc cấu hình từ biến môi trường (chẳng hạn như tạo `.env` trên máy local của bạn hoặc` heroku config: set` trên các dịch vụ lưu trữ của bạn). Dưới đây là các cấu hình bắt buộc:
  * **`MONGODB_URL`**: Chuỗi kết nối với cơ sở dữ liệu MongoDB của bạn
  * **`ZALO_APP_ID`**: nếu bạn chưa có ID APP, hãy truy cập Zalo Developers để đăng ký và đặt tại đây
  * **`ZALO_APP_ID`**: ID của Ứng dụng nhỏ của bạn
