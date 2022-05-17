import React, {useRef} from 'react';
import {Box, Button, Icon, Text, Title, zmp} from 'zmp-framework/react';
import {moneyFormat} from "../util/number";
import store from "../store";

const PostItem = ({product, marginTop, sold}) => {
  const toast = useRef(null);

  function onClickButton() {
    store.dispatch(sold ? "repostPost" : "closePost", product.id)
    if (!toast.current) {
      toast.current = zmp.toast.create({
        text: sold ? "Đăng lại bài viết thành công" : "Ẩn bài viết thành công",
        position: 'bottom',
        closeTimeout: 1000
      });
    }
    toast.current.open();
  }

  return (
    <div style={{display: 'flex', width: '100%', marginTop: marginTop}}>
      <Box
        width={102}
        height={102}
        m={0}
        p={0}
        flex
        justifyContent="center"
        alignContent="center"
        style={{position: "relative"}}
      >
        <img
          src={product.images[0].url}
          style={{
            objectFit: "cover",
            width: 102,
            height: 102,
            borderRadius: 4,
          }}/>
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
          <Icon zmp="zi-photo" size={16} style={{color: "#ffffff"}}/>
          <Text
            size="xxxsmall"
            style={{color: "#ffffff", marginBottom: 0, marginLeft: 2}}
          >
            {product.images.length}
          </Text>
        </Box>
      </Box>
      <div style={{marginLeft: 16}}>
        <Title size='xsmall' style={{marginBottom: 0}}>{product.title}</Title>
        <Title size="xsmall" className="text-color-rl300" bold>
          {moneyFormat(product.price)}
        </Title>
        <Button
          className="filter-button"
          typeName={sold ? "secondary" : "primary"} small
          onClick={() => onClickButton()}>
          {sold ? "Đăng lại" : "Đã bán / Ẩn bài"}
        </Button>
      </div>
    </div>
  )
};

PostItem.displayName = 'zmp-post-card'

export default PostItem;
