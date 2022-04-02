import React from 'react';
import {
    Page, Card, Searchbar, Box, Tabbar, Link, Tabs, Tab, useStore
} from 'zmp-framework/react';
import NavigationBar from "../components/NavigationBar";
import PostItem from "../components/PostItem";

const managePostPage = ({zmproute}) => {
    const product = useStore('products')
    const spacing = '20px'
    return (
        <Page pageContent={false}>
            <NavigationBar active={zmproute.path}/>
            <Box mt='1'>
                <Searchbar
                    searchContainer='.virtual-list'
                    searchItem='li'
                    searchIn='.item-title'
                />
            </Box>
            <div>
                <Tabbar top>
                    <Link tabLink="#tab-1" tabLinkActive>
                        Đang rao
                    </Link>
                    <Link tabLink="#tab-2">Đã bán</Link>
                </Tabbar>
            </div>
            <Tabs>
                <Tab id="tab-1" className="page-content" tabActive>
                    <Box>
                        <Card inset>
                            {product.map((item, index) => (
                                <PostItem key={index} product={item} marginTop={index === 0 ? '0px' : spacing}/>
                            ))}
                        </Card>
                    </Box>
                </Tab>
                <Tab id="tab-2" className="page-content">
                    <Box>
                        <Card inset>
                            <PostItem product={product[2]} marginTop={'0px'}/>
                            <PostItem product={product[0]} marginTop={spacing}/>
                        </Card>
                    </Box>
                </Tab>
            </Tabs>
        </Page>
    )
}
export default managePostPage