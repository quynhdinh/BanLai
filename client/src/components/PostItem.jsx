import React, { useRef } from "react";
import { Box, Button, Icon, Text, Title, Card, zmp } from "zmp-framework/react";
import { moneyFormat } from "../util/number";
import store from "../store";

const PostItem = ({ product, sold }) => {
  const toast = useRef(null);

  function onClickButton() {
    store.dispatch(sold ? "repostPost" : "closePost", product.id);
    if (!toast.current) {
      toast.current = zmp.toast.create({
        text: sold ? "Đăng lại bài viết thành công" : "Ẩn bài viết thành công",
        position: "bottom",
        closeTimeout: 1000,
      });
    }
    toast.current.open();
  }

  return (
    <div>
      <Card style={{ padding: 0 }}>
        <Box
          flex
          flexDirection="row"
          p={2}
          m={0}
          className="border-color-nl700"
          style={{ borderBottom: "0.5px solid" }}
        >
          <Box
            width={102}
            height={102}
            m={0}
            flex
            justifyContent="center"
            alignContent="center"
            style={{ position: "relative" }}
          >
            <img
              src={product.images[0]?.url}
              style={{
                objectFit: "cover",
                width: 102,
                height: 102,
                borderRadius: 4,
              }}
            />
            <ImageCount product={product} />
          </Box>
          <Box style={{ flex: 1 }} my={0}>
            <Title
              size="xsmall"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </Title>
            <Title size="xsmall" className="text-color-rl300" bold>
              {moneyFormat(product.price)}
            </Title>
            <Box m={0} flex alignItems="center" justifyContent="center">
              <Button
                className="filter-button"
                typeName={sold ? "secondary" : "primary"}
                responsive
                small
                onClick={() => onClickButton()}
                style={{ maxWidth: 512 }}
              >
                {sold ? "Đăng lại" : "Đã bán / Ẩn bài"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

const ImageCount = ({ product }) => (
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
    <Icon zmp="zi-photo" className="text-color-white demo-icon" size={16} />
    <Text
      size="xxxsmall"
      className="text-color-white"
      style={{ marginBottom: 0, marginLeft: 2 }}
    >
      {product.images.length}
    </Text>
  </Box>
);

PostItem.displayName = "zmp-post-card";

export default PostItem;
