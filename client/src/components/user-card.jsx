import React from 'react';
import {Avatar, Text, Title} from 'zmp-framework/react';

const UserCard = ({ user }) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Avatar story={user.story} online={user.online} src={user.avatar}/>
      <div style={{ marginLeft: 16 }}>
        <Title style={{ marginBottom: 0 }}>{user.displayName}</Title>
          <Text className='mt-1' size='xxsmall'>Thành viên bán lại</Text>
      </div>
    </div>
  )
};

UserCard.displayName = 'zmp-user-card'

export default UserCard;
