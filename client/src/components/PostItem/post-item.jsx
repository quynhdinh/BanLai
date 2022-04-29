import React from 'react';
import {Avatar, Box, Button, Icon, Text, Title} from 'zmp-framework/react';
import {moneyFormat} from "../../util/number";

const PostItem = ({product, marginTop}) => {
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
          <Icon zmp="zi-photo" size={16} style={{color: "#ffffff"}}/>
          <Text
            size="xxxsmall"
            style={{color: "#ffffff", marginBottom: 0, marginLeft: 2}}
          >
            4
          </Text>
        </Box>
      </Box>
      <div style={{marginLeft: 16}}>
        <Title size='xsmall' style={{marginBottom: 0}}>{product.title}</Title>
        <Text size='xsmall' style={{marginTop: 3, color: 'red'}}>{moneyFormat(product.price)}</Text>
        <Button
          className="filter-button"
          typeName="primary"
          small>Đã bán/Ẩn bài</Button>
      </div>
    </div>
  )
};

PostItem.displayName = 'zmp-post-card'

export default PostItem;
