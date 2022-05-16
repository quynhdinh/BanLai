import React from "react";
import { Page, List, Box, Title, zmp } from "zmp-framework/react";
import CustomListItem from "../components/custom-listitem";
import NavbarBack from "../components/navbar-back";

export default () => {
  const categoriesList = ["Thiết bị điện tử", "Đồ gia dụng, nội thất"];
  const handleChooseSubCategory = ({ category }) => {
    const zmprouter = zmp.views.main.router;
    zmprouter.navigate(
      {
        path: "/choose-subcategory",
        query: { category: category },
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
        {categoriesList.map((item, index) => (
          <CustomListItem
            key={index}
            title={item}
            onClick={() => {
              handleChooseSubCategory({ category: item });
            }}
          />
        ))}
      </List>
    </Page>
  );
};
