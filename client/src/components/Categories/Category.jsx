import React, { useState } from "react";
import { Card, Text, Box, Title, zmp } from "zmp-framework/react";
import { moneyFormat } from "../../util/number";
import HeartIcon from "../heart-icon";
import store from "../../store";
import CustomImage from "../custom-image";
import { clearCache } from "../../services/storage";

const Category = ({ product, border }) => {
  const [preTime, setPreTime] = useState(0);
  const handleViewDetail = () => () => {
    const zmprouter = zmp.views.main.router;
    store.dispatch("setViewingPostId", product._id);
    zmprouter.navigate(
      {
        path: "/post-detail",
        query: { mode: 0 },
      },
      { transition: "zmp-push" }
    );
  };
  const handleLikeUnlike = async (post) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    await clearCache();
    if (post.isLiked === 0) {
      store.dispatch("fakeLikeUnlikePostList", {
        postId: post._id,
        isLiked: post.isLiked,
      });
      store.dispatch("likePost", { postId: post._id });
    } else {
      store.dispatch("fakeLikeUnlikePostList", {
        postId: post._id,
        isLiked: post.isLiked,
      });
      store.dispatch("unlikePost", { postId: post._id });
    }
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
            borderBottom: border ? "0.5px solid" : "",
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
            <CustomImage product={product} />
          </Box>
          <Box style={{ flex: 1 }} my={0}>
            <Box p={0} m={0} style={{ height: 48 }}>
              <Title
                size="xsmall"
                style={{
                  marginRight: 16,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-word",
                }}
              >
                {product.title}
              </Title>
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
            <HeartIcon
              isLiked={product.isLiked}
              handleLikeUnlike={(e) => {
                e.stopPropagation();
                return handleLikeUnlike(product);
              }}
            />
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default Category;
