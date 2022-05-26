import React from "react";
import { Avatar, Box, Text, Title } from "zmp-framework/react";

export default ({ avatar, displayName, title, postCount }) => {
  return (
    <Box flex m={0}>
      <Avatar src={avatar} />
      <Box m={0} ml={4}>
        <Title size="small" style={{ marginBottom: 0 }}>
          {displayName}
        </Title>
        <Text className="mt-1" size="xxsmall">
          <span className="text-color-bl300">{postCount}</span> {title}
        </Text>
      </Box>
    </Box>
  );
};