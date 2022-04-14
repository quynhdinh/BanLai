import React from "react";
import {
  Page,
  List,
  Button,
  Box,
  zmp,
  ListInput,
  Title,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";

const createPostPage = () => {
  const zmproute = zmp.views.main.router.currentRoute;
  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    console.log(zmp.form.convertToData("#my-form"));
  };

  const handleFillForm = (e) => {
    e.preventDefault();
    zmp.form.fillFromData("#my-form", {
      city: 2,
    });
  };

  return (
    <Page name="create-post">
      <NavbarBack title="Tạo tin đăng" linkLeft={"/choose-subcategory/"} />
      <Box px={4}>
        <Box
          flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Title>
            {zmproute.query?.category}/{zmproute.query?.subcategory}
          </Title>
        </Box>
        <List
          style={{ listStyle: "none" }}
          form
          id="my-form"
          onSubmit={handleOnSubmitForm}
          noHairlines
        >
          <ListInput
            label="Thêm ảnh rao bán (tối đa 10 ảnh) *"
            type="file"
            placeholder="Nhập tiêu đề rao bán"
            name="photo"
            required
            validate
          ></ListInput>
          <ListInput
            label="Tiêu đề rao bán *"
            type="text"
            placeholder="Nhập tiêu đề rao bán"
            clearButton
            name="title"
            required
            validate
          ></ListInput>
          <ListInput
            label="Giá rao bán *"
            type="number"
            placeholder="Nhập giá rao bán"
            clearButton
            name="price"
            required
            validate
          ></ListInput>
          <ListInput
            label="Tình trạng sản phẩm"
            type="select"
            placeholder="Chọn tình trạng sản phẩm"
            name="condition"
            validate
          >
            <option value="1">Đã qua sử dụng</option>
            <option value="2">Hà Nội</option>
          </ListInput>
          <ListInput
            label="Mô tả"
            type="textarea"
            placeholder="Mô tả sản phẩm"
            clearButton
            name="description"
          ></ListInput>

          {zmproute.query?.subcategory === "Điện thoại" ? (
            <>
              <ListInput
                label="Màu sắc"
                type="select"
                // placeholder="Chọn tình trạng sản phẩm"
                name="condition"
                validate
              >
                <option value="1">Đỏ</option>
              </ListInput>
              <ListInput
                label="Dung lượng"
                type="select"
                // placeholder="Chọn tình trạng sản phẩm"
                name="condition"
                validate
              >
                <option value="1"> 128GB</option>
              </ListInput>
              <ListInput
                label="Bảo hành"
                type="select"
                // placeholder="Chọn tình trạng sản phẩm"
                name="condition"
                validate
              >
                <option value="1">Hết bảo hành</option>
              </ListInput>
            </>
          ) : (
            <></>
          )}

          {zmproute.query?.subcategory === "Karaoke" ? (
            <>
              <ListInput label="Hãng" type="select" name="condition" validate>
                <option value="1">Yamaha</option>
              </ListInput>
              <ListInput
                label="Xuất sứ"
                type="select"
                name="condition"
                validate
              >
                <option value="1"> Trung quốc</option>
              </ListInput>
            </>
          ) : (
            <></>
          )}
          <ListInput
            label="Tỉnh/Thành phố *"
            type="select"
            placeholder="Chọn tỉnh/thành phố"
            name="city"
            validate
          >
            <option value="1">Hồ Chí Minh</option>
            <option value="2">Hà Nội</option>
          </ListInput>
          <ListInput
            label="Quận/Huyện *"
            type="select"
            placeholder="Chọn quận/huyện"
            name="district"
            validate
          >
            <option value="1">Hồ Chí Minh</option>
            <option value="2">Hà Nội</option>
          </ListInput>

          <Box>
            <Button type="submit" typeName="secondary" responsive>
              Get Form Data
            </Button>
          </Box>
          <Box>
            <Button typeName="secondary" responsive onClick={handleFillForm}>
              Fill Form
            </Button>
          </Box>
        </List>
      </Box>
    </Page>
  );
};
export default createPostPage;
