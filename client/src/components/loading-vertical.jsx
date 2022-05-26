import React from "react";
import {Box, Row, SkeletonBlock} from "zmp-framework/react";

// Thanh loading chờ load từ server hàng dọc
export default () => {
  return (
    <Box m={0} px={4} pb={2}>
      <Row gap="gap_4" className="mt-4">
          <SkeletonBlock effect="wave" height="120px"/>
      </Row>
      <Row gap="gap_4" className="mt-4">
        <SkeletonBlock effect="wave" height="120px"/>
      </Row>
      <Row gap="gap_4" className="mt-4">
        <SkeletonBlock effect="wave" height="120px"/>
      </Row>
    </Box>
  );
};
