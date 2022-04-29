import React from "react";
import { Card, Icon, Text, Box } from "zmp-framework/react";
import {moneyFormat} from "../../util/number";

const Category = ({ product, category, border }) => {
  return (
    <Card style={{ padding: 0 }}>
      <Box
        flex
        flexDirection="row"
        p={2}
        m={0}
        style={{
          position: "relative",
          height: "120px",
          border: border ? "" : "0.5px solid black",
          borderTop: border ? "0.5px solid #E4E8EC" : "0.5px solid black",
          borderBottom: border ? "0.5px solid #E4E8EC" : "0.5px solid black",
          borderRadius: border ? "" : "8px",
        }}
      >
        <Box
          width={102}
          height={102}
          m={0}
          p={0}
          flex
          justifyContent="center"
          alignContent="center"
          style={{ position: "relative" }}
        >
          <img
            src={product.images[0].url}
            style={{
              objectFit: "cover",
              width: 102,
              height: 102,
              borderRadius: 4,
            }}
          />
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
            <Icon zmp="zi-photo" size={16} style={{ color: "#ffffff" }} />
            <Text
              size="xxxsmall"
              style={{ color: "#ffffff", marginBottom: 0, marginLeft: 2 }}
            >
              4
            </Text>
          </Box>
        </Box>
        <Box style={{ flex: 1 }} my={0}>
          <Box p={0} m={0} style={{ height: 48 }}>
            <Text
              size="xsmall"
              style={{
                marginRight: 16,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
                {product.title}
            </Text>
          </Box>

          <Text style={{ color: "rgba(239, 78, 73, 1)", fontWeight: 700 }}>
              {moneyFormat(product.price)}
          </Text>
          <Box
            p={1}
            m={0}
            style={{
              background: "#E4E8EC",
              borderRadius: 2,
              width: "fit-content",
            }}
          >
            <Text size="xxxsmall" style={{ marginBottom: 0 }}>
                {product.district}, {product.city}
            </Text>
          </Box>
        </Box>
        <Box m={0} style={{ position: "absolute", right: 8, top: 8 }}>
          <Icon className="demo-icon " zmp="zi-heart-solid" size={20} />
        </Box>
      </Box>
    </Card>
  );
};
export default Category;
