import React from "react";
import { Page, List, ListItem, Box, Title, zmp } from "zmp-framework/react";
import CustomListItem from "../components/custom-listitem";
import NavbarBack from "../components/navbar-back";

const createPostPage = () => {
  const zmprouter = zmp.views.main.router;
  const handleChooseElectronic = () => {
    zmprouter.navigate(
      { path: "/choose-subcategory", query: { category: "Thiết bị điện tử" } },
      { transition: "zmp-push" }
    );
  };
  const handleChooseHouseHold = () => {
    zmprouter.navigate(
      {
        path: "/choose-subcategory",
        query: { category: "Đồ gia dụng, nội thất" },
      },
      { transition: "zmp-push" }
    );
  };
  return (
    <Page pageContent={false} name="choose-category">
      <NavbarBack title="Tạo tin đăng" linkLeft={"/"} />
      <Box pt={10} mt={10} px={4}>
        <Title size="large" bold>
          Chọn danh mục
        </Title>
      </Box>
      <List>
        <CustomListItem
          title="Thiết bị điện tử"
          onClick={handleChooseElectronic}
        />
        <CustomListItem
          title="Đồ gia dụng, nội thất"
          onClick={handleChooseHouseHold}
        />
      </List>
    </Page>
  );
};
export default createPostPage;
