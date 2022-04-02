import React from 'react';
import {Avatar, Text, Title} from 'zmp-framework/react';

const MessageItem = ({user, product, marginTop}) => {
    return (
        <div style={{display: 'flex', width: '100%', marginTop: marginTop}}>
            <Avatar story={user.story} online={user.online} src={user.avatar}/>
            <div style={{marginLeft: 16}}>
                <Title size='small' style={{marginBottom: 0}} >{user.displayName}</Title>
                <Text size='xxsmall'>{product.title}</Text>
            </div>
            <Text style={{position: "absolute", right: "5%"}} size='xxxsmall' marginRight={10}>10 giờ trước</Text>
        </div>
    )
};

MessageItem.displayName = 'zmp-message-card'

export default MessageItem;
