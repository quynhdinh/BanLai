import React from "react";
import {Box, Col, Row, SkeletonBlock} from "zmp-framework/react";

// Thanh loading chờ load từ server hàng ngang
const LoadingHorizontal = () => {
  return (
    <Box m={0} px={4} pb={2}>
      <Row gap="gap_4" className="mt-4">
        <Col>
          <SkeletonBlock effect="wave" height="200px"/>
        </Col>
        <Col>
          <SkeletonBlock effect="wave" height="200px"/>
        </Col>
      </Row>
    </Box>
  );
};

export default LoadingHorizontal;
