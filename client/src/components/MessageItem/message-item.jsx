import React from 'react';
import {Avatar, Title} from 'zmp-framework/react';

const MessageItem = ({user, product, marginTop}) => {
    return (
        <div style={{display: 'flex', width: '100%', marginTop: marginTop}}>
            <Avatar story={user.story} online={user.online}>{user.avatar}</Avatar>
            <div style={{marginLeft: 16}}>
                <Title style={{marginBottom: 0}}>{user.displayName}</Title>
                <div>{product.title}</div>
            </div>
            <div style={{position: "absolute", right: "10%", marginTop: 12}}>10 giờ trước</div>
        </div>
    )
};

MessageItem.displayName = 'zmp-message-card'

export default MessageItem;
