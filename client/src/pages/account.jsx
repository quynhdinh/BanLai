import React from "react"
import {Page, Card, useStore, List, ListItem, Box, Title, Icon, Link,} from "zmp-framework/react"
import NavigationBar from "../components/NavigationBar"
import UserCard from '../components/user-card';
import * as PropTypes from "prop-types";

const AccountPage = ({zmproute}) => {
    const user = useStore('user');
    const _u = useStore('u')
    const u = _u ? _u : user[0];

    return (
        <Page className='page-box page-with-navbar'>
            <NavigationBar active={zmproute.path}/>
            <List>
                <ListItem link='/user/'>
                    <UserCard user={u}/>
                </ListItem>
                <ListItem link='/saved-posts/' title='Tin đăng đã lưu'>
                    <Icon className='list-icon' slot='media' zmp='zi-heart-solid' color={'#ff3b30'} size={16}/>
                </ListItem>
            </List>
            <Card inset>
                <Title size='normal'>Bán Lại</Title>
                <Box key="normal" mb='4'>
                    <Title size="xsmall">
                        Email: banlai@gmail.com
                    </Title>
                    <Title size="xsmall">
                        Hotline: 1987654321
                    </Title>
                </Box>
            </Card>
            <Card inset>
                <Title size='normal'>Hướng dẫn đăng tin</Title>
                <Box key="normal" mb='4'>
                    <Title size="xsmall">
                        Quy định đăng tin
                    </Title>
                    <Title size="xsmall">
                        Hướng dẫn đăng tin
                    </Title>
                </Box>
            </Card>
        </Page>
    )
}
export default AccountPage