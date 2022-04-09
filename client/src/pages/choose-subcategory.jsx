import React from "react";
import {
  Page,
  List,
  ListItem,
  Box,
  Title,
  useStore,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";

const createPostPage = ({ zmproute }) => {
  const category = useStore("householdCategories");
  return (
    <Page name="choose-subcategory">
      <NavbarBack title="Tạo tin đăng" linkLeft={'/choose-category/'} />
      <Box px={4}>
        <Title size="large" bold>
          Chọn danh mục
        </Title>
      </Box>
      <List>
        {category.map((item, index) => (
          <ListItem
            key={index}
            link="/create-post"
            title={item.title}
            transition="zmp-push"
          />
        ))}
      </List>
    </Page>
  );
};
export default createPostPage;
