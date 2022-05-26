import React from "react";
import {Avatar, Text, Title} from "zmp-framework/react";
import { getReadableTimeGap } from "../util/number";
import api from "zmp-sdk";

const handleOpenChat = (p) => () => {
  api.openChat({
    type: 'user',
    id: p.partner,
  });
};

export default ({ product }) => {
  return (
    <div
      onClick={handleOpenChat(product)}
      className="border-color-nl700"
      style={{
        display: "flex",
        width: "100%",
        borderBottom: "1px solid",
        padding: "12px 0px",
      }}
    >
      <Avatar online={true} src={product.picture} />
      <div style={{ marginLeft: 16 }}>
        <Title size="small" style={{ marginBottom: 0 }}>
          {product.name}
        </Title>
        <Text size="xxsmall">{product.title}</Text>
      </div>
      <Text
        style={{ position: "absolute", right: "5%" }}
        size="xxxsmall"
        marginRight={10}
      >
        {getReadableTimeGap(product.createdAt)}
      </Text>
    </div>
  );
};
