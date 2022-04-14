import React, { useEffect, useState } from "react";
import { Page, List, Box, Title, useStore, zmp } from "zmp-framework/react";
import CustomListItem from "../components/custom-listitem";
import NavbarBack from "../components/navbar-back";

const createPostPage = () => {
  var electronicCategories = useStore("electronicCategories");
  var householdCategories = useStore("householdCategories");
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const zmproute = zmp.views.main.router.currentRoute;
  useEffect(() => {
    if (zmproute.query?.category == "Thiết bị điện tử") {
      setSubCategoriesList(electronicCategories);
    } else setSubCategoriesList(householdCategories);
  }, [zmproute.query]);

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
            title={item.title}
            onClick={() => {
              handleOnClick({ subcategory: item.title });
            }}
          />
        ))}
      </List>
    </Page>
  );
};
export default createPostPage;
