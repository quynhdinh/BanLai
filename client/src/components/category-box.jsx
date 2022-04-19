import React from "react";
import { Icon, Box, ListItem, Title } from "zmp-framework/react";

const CategoryBox = ({ category, subcategory }) => {
  return (
    <Box
      p={2}
      mx={0}
      my={4}
      flex
      flexDirection="row"
      textAlign="center"
      justifyContent="center"
      style={{
        border: "1px solid rgba(102, 118, 133, 1)",
        borderRadius: "4px",
      }}
    >
      <Title size="small" style={{ marginBottom: 0 }}>
        {category}/{subcategory}
      </Title>
    </Box>
  );
};

CategoryBox.displayName = "zmp-category-box";

export default CategoryBox;
