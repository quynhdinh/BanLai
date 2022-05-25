import React from "react";
import { Box, Title, zmp, Button, Row, Col } from "zmp-framework/react";
import Category from "./Category";

const HotItem = ({ category, products, index}) => {
  const zmproute = zmp.views.main.router;

  function viewAll() {
    switch (index) {
      case 0:
        zmproute.navigate("/electronic-list");
        break;
      case 1:
        zmproute.navigate("/house-item-list");
        break;
    }
  }

  return (
    <Box m={0}>
      <Box m={0} style={{height: 12}} className="bg-color-lg600"/>
      <Box flex ml={4} flexDirection="column">
        <Box m={0} style={{ flex: 1 }}>
          <Title bold>{category}</Title>
        </Box>
        <Box className="product-row" p={1}>
          <Row
            style={{
              width: `calc(${products.length * 80}vw - ${
                products.length * 20
              }px + ${(products.length - 1) * 8}px)`,
            }}
          >
            {products.map((product) => (
              <Col key={product._id} className="product-column">
                <Category product={product} />
              </Col>
            ))}
          </Row>
        </Box>
      </Box>
      <div onClick={viewAll}>
        <Box
          m={0}
          flex
          justifyContent="center"
          className="border-color-nl700"
          style={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          <Button size="xsmall">Xem tất cả</Button>
        </Box>
      </div>
    </Box>
  );
};

export default HotItem;
