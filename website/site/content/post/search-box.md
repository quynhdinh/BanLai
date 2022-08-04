---
title: 'SearchBox Component'
date: 2022-07-31T15:04:10.000Z
description: >-
    Bài viết này chia sẻ về cách làm khung search danh sách sản phẩm.
---
![Alt Text](https://raw.githubusercontent.com/quynhdinh/BanLai/master/website/site/static/img/search-box.jpg)

Khi hiển thị search box ở màn hình category list, bọn mình sử dụng component SearchBar có sẵn trong ZMA để hiển thị :v, tuy nhiên bọn minh sẽ tự cài đặt phần xử lý event khi click vào thanh search này. Bạn cũng có thể sự dụng luôn phần handle event mà ZMA support cho component này. Chi tiết tham khảo ở link [này](https://mini.zalo.me/docs/framework/components/data-entry/searchbar/):

Về phần bọn mình, khi click vào thanh search, app sẽ mở một _sheet modal_ dưới dạng 1 trang để người dùng có thể thay đổi search filter. Sheet Modal cũng là 1 component được ZMA support mà bạn có thể tham khảo chi tiết những properties của nó ở [đây](https://mini.zalo.me/docs/framework/components/feedback/sheet-modal/)

Đối với component **search-box**, sẽ được cài đặt ở dạng _form_, và sử dụng _react-hook-form_ để bắt những dữ liệu ở các ô filter. Bạn có thể tham khảo đoạn mã sau:

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="keyword"
        control={control}
        render={({ field }) => (
          <Searchbar
            {...field}
            disableButtonText="Cancel"
            placeholder="Từ khóa"
            clearButton={true}
          />
        )}
      />
      <Select
        {...register("subCategory")}
        label="Danh mục sản phẩm"
        option={subCategoriesList}
      />
      <Title>Khoảng Giá</Title>
      <Select
        {...register("condition")}
        label="Tình trạng sản phẩm"
        option={["Đã qua sử dụng", "Còn mới", "Còn bảo hành"]}
      />
      <Select
        {...register("city")}
        label="Tỉnh/Thành phố"
        onChange={handleChangeDistrictList}
        option={getCities()}
      />
      <Select
        {...register("district")}
        label="Quận/Huyện"
        option={districtOptions}
      />
      <Button type="submit" typeName="primary" large responsive>
        Tìm kiếm
      </Button>
    </form>
```

Sau khi người dùng thay đổi những filter để tìm kiêm bài đăng theo mong muốn và nhân vào nút tìm kiếm, sheet modal sẽ được đóng và trở lại trang category list với danh sách các bài đăng được thay đổi tương ứng vói danh sách mà api search trả về.

Phần cài đặt đầy đủ của component _search-box_ có thể xem tại [đây](https://github.com/quynhdinh/BanLai/blob/master/client/src/components/search-box.jsx).

[Tham khảo](https://harmless-impatiens-74a.notion.site/search-box-e5b66c2716b64f5a8293bde702269c13)