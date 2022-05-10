import React, { useEffect, useState } from "react";
import { Page, List, Box, Title, zmp } from "zmp-framework/react";
import CustomListItem from "../components/custom-listitem";
import NavbarBack from "../components/navbar-back";
import { getSubCategories } from "../services/get_data";

const createPostPage = () => {
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const zmproute = zmp.views.main.router.currentRoute;
  useEffect(() => {
    if (zmproute.query?.category === "Thiết bị điện tử") {
      setSubCategoriesList(getSubCategories("Thiết bị điện tử"));
    } else setSubCategoriesList(getSubCategories("Đồ gia dụng, nội thất"));
  });
  const handleOnClick = ({ subcategory }) => {
    const zmprouter = zmp.views.main.router;
    zmprouter.navigate(
      {
        path: "/create-post",
        query: { category: zmproute.query?.category, subcategory: subcategory },
      },
      { transition: "zmp-push" }
    );
  };
  return (
    <Page name="choose-subcategory">
      <NavbarBack title="Tạo tin đăng" linkLeft={"/choose-category/"} />
      <Box px={4}>
        <Title size="large" bold>
          Chọn danh mục
        </Title>
      </Box>
      <List>
        {subCategoriesList.map((item, index) => (
          <CustomListItem
            key={index}
            title={item}
            onClick={() => {
              handleOnClick({ subcategory: item });
            }}
          />
        ))}
      </List>
    </Page>
  );
};
export default createPostPage;
