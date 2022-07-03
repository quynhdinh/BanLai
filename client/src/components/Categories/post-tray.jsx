import React from "react";
import {Box, Title, zmp, Button, Row, Col} from "zmp-framework/react";
import Category from "./Category";

export default ({category, products, index, isShowHeart}) => {
  const zmproute = zmp.views.main.router;

  function viewAll() {
    zmproute.navigate({
      path: "/posts-list",
      query: {index: index}
    })
  }

  return (
    <Box m={0}>
      <Box m={0} style={{height: 4}} className="bg-color-lg700"/>
      <Box flex ml={4} flexDirection="column">
        <Box m={0} style={{flex: 1}}>
          {category === "" ? <></> : <Title bold>{category}</Title>}
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
                <Category product={product} isShowHeart={isShowHeart}/>
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
          className="border-color-lg700"
          style={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          {index === 0 || index === 1 ? <Button size="xsmall">Xem tất cả</Button> : <></>}
        </Box>
      </div>
    </Box>
  );
};
