import React from "react";
import { Card, Icon, Text, Box, Title, zmp } from "zmp-framework/react";
import { moneyFormat } from "../../util/number";
import HeartIcon from "../heart-icon";
import store from "../../store";

const Category = ({ product, border }) => {
  const handleViewDetail = () => () => {
    const zmprouter = zmp.views.main.router;
    store.dispatch('setViewingPostId', product._id )
    zmprouter.navigate(
      {
        path: "/post-detail",
      },
      { transition: "zmp-push" }
    );
  };
  return (
    <div onClick={handleViewDetail()}>
      <Card style={{ padding: 0 }}>
        <Box
          flex
          flexDirection="row"
          p={2}
          m={0}
          className="border-color-nl700"
          style={{
            position: "relative",
            height: "120px",
            borderTop: border ? "0.5px solid" : "",
            borderRadius: border ? "" : "8px",
            boxShadow: border ? "" : "1px 0px 4px rgba(0, 0, 0, 0.25)",
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
              <Icon
                zmp=" zi-photo "
                className="text-color-white demo-icon"
                size={16}
              />
              <Text
                size="xxxsmall"
                className="text-color-white"
                style={{ marginBottom: 0, marginLeft: 2 }}
              >
                {product.images.length}
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
            <Title size="xsmall" className="text-color-rl300" bold>
              {moneyFormat(product.price)}
            </Title>
            <Box
              p={1}
              m={0}
              className="bg-color-lg700"
              style={{
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
            <HeartIcon isLiked={true} />
          </Box>
        </Box>
      </Card>
    </div>
  );
};
export default Category;
