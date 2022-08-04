---
title: 'Component PostTray'
date: 2022-07-05T15:04:10.000Z
description: >-
    Post tray là một thanh trượt chứa danh sách các sản phẩm.
---

![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/post-tray.jpg)

Đối với phần thanh trượt để hiển thị bài viết, ZMA có cung cấp một component là Swiper, bạn có thể tham khảo tại [đây](https://mini.zalo.me/docs/framework/components/basic-components/swiper/).

Post tray là một thanh trượt chứa danh sách các sản phẩm chứa các [Category](https://scintillating-haupia-01fe5d.netlify.app/post/category-tutorial/).

Nếu bạn muốn làm 1 làm 1 custom post tray để có thể linh hoạt trong việc chỉnh sửa phù hợp theo thiết kế của app, bạn có thể tham khảo cách làm của team bọn mình

```jsx
<Box m={0}>
      <Box m={0} style={{height: 4}} className="bg-color-lg700"/>
      <Box flex ml={4} flexDirection="column">
				// Tittle
        <Box m={0} style={{flex: 1}}>
          {category === "" ? <></> : <Title bold>{category}</Title>}
        </Box>
				// Thanh truot
        <Box className="product-row" p={1}>
          <Row
            style={{
              width: `calc(${products.length * 80}vw - ${
                products.length * 20
              }px + ${(products.length - 1) * 8}px)`,
            }}
          >
            {products.map((product) => (
              <Col key={product._id} className="product-column">
                <Category product={product} isShowHeart={isShowHeart}/>
              </Col>
            ))}
          </Row>
        </Box>
      </Box>
			// Nut xem tat ca
      <div onClick={viewAll}>
        <Box
          m={0}
          flex
          justifyContent="center"
          className="border-color-lg700"
          style={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          {index === 0 || index === 1 ? <Button size="xsmall">Xem tất cả</Button> : <></>}
        </Box>
      </div>
    </Box>
```

Bọn mình dùng 2 component phổ biến của ZMA là **<Box />** và **<Row />** và custom phần style để tạo ra post-tray theo design của team. Bạn hãy để ý đoạn code này

```jsx
          <Row
            style={{
              width: `calc(${products.length * 80}vw - ${
                products.length * 20
              }px + ${(products.length - 1) * 8}px)`,
            }}
          >
// Chỉnh sửa style này để có thanh trượt như bạn mong muốn nhé :)
```

Link tới file _post-tray.jsx_ ở [đây](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/Categories/post-tray.jsx)