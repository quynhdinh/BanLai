import React from "react";
import {Box, Icon, Text} from "zmp-framework/react";

export default ({ product }) => (
  <Box
    px={1}
    m={0}
    flex
    alignItems="center"
    style={{
      position: "absolute",
      background: "rgba(0, 0, 0, 0.5)",
      width: "fit-content",
      height: 20,
      top: 4,
      left: 4,
      borderRadius: 2,
    }}
  >
    <Icon zmp=" zi-photo " className="text-color-white demo-icon" size={16} />
    <Text
      size="xxxsmall"
      className="text-color-white"
      style={{ marginBottom: 0, marginLeft: 2 }}
    >
      {product.images.length}
    </Text>
  </Box>
);
