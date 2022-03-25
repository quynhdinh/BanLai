import React from "react"
import {Page, Card, Text, useStore, List, ListItem, Box, Title,} from "zmp-framework/react"
import NavigationBar from "../components/NavigationBar"
import UserCard from '../components/user-card';
import * as PropTypes from "prop-types";

const AccountPage = ({zmproute}) => {
    // useScrollPosition('/article')
    const user = useStore('user');
    return (
        <Page className='page-box page-with-navbar'>
            <NavigationBar active={zmproute.path}/>
            <NavigationBar/>
            <List>
                <ListItem link="/user/">
                    <UserCard user={user}/>
                </ListItem>
                <ListItem link="/saved-posts/">
                    <Text>Tin đăng đã lưu</Text>
                </ListItem>
            </List>
            <Card inset title='Bán Lại'>
                <Box key="normal">
                    <Title size="normal">
                        Email: banlai@gmail.com
                    </Title>
                    <Title size="normal">
                        Hotline: 1987654321
                    </Title>
                </Box>
            </Card>
        </Page>
    )
}
export default AccountPage