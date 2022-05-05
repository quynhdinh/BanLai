import React from "react";
import { Card, Text, Box, Title } from "zmp-framework/react";
import { moneyFormat } from "../../util/number";
import HeartIcon from "../heart-icon";

const ViewedItem = ({ _product }) => {
  return (
    <Card style={{ padding: 0 }}>
      <Box style={{ width: "140px" }}>
        <img style={{ objectFit: "cover", borderRadius: 4, height: 140, width: 140 }}
        src="https://s36537.pcdn.co/wp-content/uploads/2017/11/Mackerel-Tabby-cat.jpg.optimal.jpg"/>
        <Box m={0} style={{ height: 48 }}>
          <Text
            size="xsmall"
            style={{overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",}}
          >
            iPhone 13 pro mã cũ mua tại điện máy xanh còn bảo hành
          </Text>
        </Box>
        <Box m={0} flex flexDirection="row">
          <Title className="text-color-rl300" bold size="small" style={{ flex: 1 }}>
            {moneyFormat(1000000)}
          </Title>
          <HeartIcon isLiked={true}/>
        </Box>
      </Box>
    </Card>
  );
};
export default ViewedItem;
