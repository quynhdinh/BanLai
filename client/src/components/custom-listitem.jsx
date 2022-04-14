import React from "react";
import { Icon, Box, ListItem } from "zmp-framework/react";

const CustomListItem = ({ title, onClick }) => {
  return (
    <Box
      m={0}
      p={0}
      style={{
        background: "#FFFFFF",
        position: "relative",
        borderTop: "0.5px solid #BFC6CC",
      }}
    >
      <ListItem title={title} onClick={onClick} />
      <Box
        m={0}
        p={0}
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Icon zmp="zi-chevron-right" size={24}></Icon>
      </Box>
    </Box>
  );
};

CustomListItem.displayName = "zmp-listitem";

export default CustomListItem;
