import React from "react";
import {
  Page,
  List,
  ListItem,
  Box,
  Title,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";

const createPostPage = ({ zmproute }) => {
  return (
    <Page pageContent={false} name="choose-category">
      <NavbarBack title="Tạo tin đăng" linkLeft={'/'}/>
      <Box pt={10} mt={10} px={4}>
        <Title size="large" bold>
          Chọn danh mục
        </Title>
      </Box>
      <List>
        <ListItem
          link="/choose-subcategory"
          title="Thiết bị điện tử"
          transition="zmp-push"
        ></ListItem>
        <ListItem
          link="/choose-subcategory"
          title="Đồ gia dụng, nội thất"
          transition="zmp-push"
        ></ListItem>
      </List>
    </Page>
  );
};
export default createPostPage;
