import React, { useEffect, useState } from "react";
import {
  Page,
  useStore,
  Icon,
  List,
  ListItem,
  Button,
  Box,
  zmp,
  ListInput,
  Picker,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";

const createPostPage = ({ zmproute }) => {
  const [price, setprice] = useState("");
  useEffect(() => {
    const zmproute = zmp.views.main.router.currentRoute;
    console.log(zmproute);
  }, []);

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
      <NavbarBack title="Tạo tin đăng" />
      <Box px={4}>
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
            // multiple
            // errorMessage="Invalid"
            validate
          ></ListInput>
          <ListInput
            label="Tiêu đề rao bán *"
            type="text"
            placeholder="Nhập tiêu đề rao bán"
            clearButton
            name="title"
            required
            // errorMessage="Invalid"
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
