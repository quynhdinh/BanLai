import React from 'react';
import { Avatar, Title } from 'zmp-framework/react';

const UserCard = ({ user }) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
        {/*src={'https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg'}*/}
      <Avatar story={user.story} online={user.online} src={'https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg'}/>
      <div style={{ marginLeft: 16 }}>
        <Title style={{ marginBottom: 0 }}>{user.displayName}</Title>
        <div>{user.email}</div>
      </div>
    </div>
  )
};

UserCard.displayName = 'zmp-user-card'

export default UserCard;
