import React from "react"
import {
    Page, useStore, Tabbar, Link, Tabs, Tab, Card, Box
} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar"
import MessageItem from "../components/MessageItem/message-item";

const messagePage = ({zmproute}) => {
    const user = useStore('user');
    const products = useStore('products')
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
                    <Box>
                        <Card inset>
                            {
                                user.map((u, i) => (
                                    <MessageItem key={i}
                                                 product={products[i % products.length]}
                                                 user={u}
                                                 marginTop={i === 0 ? '0px' : spacing}/>
                                ))
                            }
                        </Card>
                    </Box>
                </Tab>
                <Tab id="tab-2" className="page-content">
                    <Box>
                        <Card inset>
                            <MessageItem user={user[1]} product={products[2]} marginTop={'0px'}/>
                            <MessageItem user={user[2]} product={products[0]} marginTop={spacing}/>
                        </Card>
                    </Box>
                </Tab>
            </Tabs>
        </Page>
    )
}
export default messagePage
