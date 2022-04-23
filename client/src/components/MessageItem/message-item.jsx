import React from 'react';
import {Avatar, Text, Title} from 'zmp-framework/react';
import {getReadableTimeGap} from "../../util/number";

const MessageItem = ({product, marginTop}) => {
  return (
    <div style={{display: 'flex', width: '100%', marginTop: marginTop}}>
      <Avatar online={true} src={product.picture}/>
      <div style={{marginLeft: 16}}>
        <Title size='small' style={{marginBottom: 0}}>{product.name}</Title>
        <Text size='xxsmall'>{product.title}</Text>
      </div>
      <Text style={{position: "absolute", right: "5%"}} size='xxxsmall'
            marginRight={10}>{getReadableTimeGap(product.createdAt)}</Text>
    </div>
  )
};

MessageItem.displayName = 'zmp-message-card'

export default MessageItem;
