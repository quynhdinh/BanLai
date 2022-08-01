---
title: 'Thanh điều hướng (Navigation bar)'
date: 2022-07-05T15:04:10.000Z
description: >-
  Trong bài viết này chúng mình sẽ hướng dẫn cho các bạn về thanh điều hướng hay còn gọi là navigation bar
---
![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/navigation-bar.jpg)

Thanh điều hướng là khu vực giúp bạn di chuyển giữa các màn hình trong Bán Lại. Thanh điều hướng sẽ gồm 5 mục đó là trang chủ, quản lý tin (là trang quản lý những bài viết mà bạn đã đăng), tạo bài đăng, tin nhắn ( trang quản lý lịch sử liên hệ với người mua/bán ), tài khoản( chứa thông tin của người dùng và danh sách những bài viết mà người dùng quan tâm)

Thanh điều hướng này sẽ được style cho fix ở ngay dưới cùng của trang, giúp người dùng dễ dàng nhìn thấy và thao tác nhanh hơn.
Bạn có thể sử dụng đoạn code sau để có 1 thanh điều hướng tương tự

```jsx
<Tabbar slot="fixed" bottom className="app-tabbar shadow-1" noHairline>
      <Link
        noLinkClass
        onClick={() => switchTab("/")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/"}
      >
        <AiFillHome size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label navbar-item-label text-gray-dark font-roboto"
        >
          Trang chủ
        </Text>
      </Link>
      <Link
        noLinkClass
        onClick={() => switchTab("/manage-post")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/manage-post/"}
      >
        <RiFileList2Line size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Quản lý tin
        </Text>
      </Link>
      <div>
        <Link
          noLinkClass
          onClick={() => switchTab("/choose-category/")}
          className="write-blog rounded-full border-white bg-blue border-4 items-center"
          tabLinkActive={activePath === "/choose-category/"}
        >
          <img src={CreatePostIcon} />
        </Link>
      </div>
      <Link
        noLinkClass
        onClick={() => switchTab("/messages/")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/messages/"}
      >
        <BiMessageDetail size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Tin nhắn
        </Text>
      </Link>
      <Link
        noLinkClass
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/account/"}
        onClick={() => switchTab("/account/")}
      >
        <FaRegUser size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Tài khoản
        </Text>
      </Link>
    </Tabbar>
```

Tham khảo source code đây đủ tại [đây](https://github.com/quynhdinh/BanLai/tree/master/client/src/components/NavigationBar)
