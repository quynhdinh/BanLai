import React from 'react';
import {
    Page, Card, Searchbar, Box, Tabbar, Link, Tabs, Tab, useStore, SkeletonText
} from 'zmp-framework/react';
import NavigationBar from "../components/NavigationBar";
import PostItem from "../components/PostItem";
import NavbarBack from "../components/navbar-back";
import {Category} from "../components/Categories";

const managePostPage = ({zmproute}) => {
    const products = useStore('products')
    return (
        <Page className='page-box page-with-navbar'>
            <NavbarBack
                title="Danh sách tin đã lưu"
                linkLeft={'/account/'}
            />
            {
                products.map((item, index) => (
                <Category key={index} product={item}/>
                ))
            }
        </Page>
    )
}
export default managePostPage