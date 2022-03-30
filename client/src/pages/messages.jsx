import React from "react"
import {
    Page,
    useStore,
    Navbar,
    Tabbar,
    Link,
    Tabs,
    Tab,
    Card
} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar"
import ComingSoon from "../components/ComingSoon"
import useScrollPosition from "../hooks/useScrollPosition"
import UserCard from "../components/MessageItem/message-item";
import MessageItem from "../components/MessageItem/message-item";

const articlePage = ({zmproute}) => {
    // useScrollPosition('/article')
    const user = useStore('user');
    const product = useStore('products')
    const spacing = '20px'
    return (
        <Page pageContent={false}>
            <NavigationBar active={zmproute.path}/>
            <Tabbar top>
                <Link tabLink="#tab-1" tabLinkActive>
                    Tôi mua
                </Link>
                <Link tabLink="#tab-2">Tôi bán</Link>
            </Tabbar>
            <Tabs>
                <Tab id="tab-1" className="page-content" tabActive>
                    <Card inset>
                        <MessageItem user={user[0]} product={product[0]} marginTop = {'0px'}/>
                        <MessageItem user={user[1]} product={product[1]} marginTop = {spacing}/>
                    </Card>
                </Tab>
                <Tab id="tab-2" className="page-content">
                    <Card inset>
                        <MessageItem user={user[1]} product={product[2]} marginTop = {'0px'}/>
                    </Card>
                </Tab>
            </Tabs>
        </Page>
    )
}
export default articlePage
