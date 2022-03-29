import React from 'react';
import {Avatar, Title} from 'zmp-framework/react';

const MessageCard = ({user, product}) => {
    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Avatar story={user.story} online={user.online}>{user.avatar}</Avatar>
            <div style={{marginLeft: 16}}>
                <Title style={{marginBottom: 0}}>{user.displayName}</Title>
                <div>{product.title}</div>
            </div>
            <div style={{position: "absolute", right: 100, marginTop: 12}}>10 giờ trước</div>
        </div>
    )
};

MessageCard.displayName = 'zmp-message-card'

export default MessageCard;
