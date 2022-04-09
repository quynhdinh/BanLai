import React from 'react';
import {
    Page, Card, Searchbar, Box, Tabbar, Link, Tabs, Tab, useStore, SkeletonText
} from 'zmp-framework/react';
import NavigationBar from "../components/NavigationBar";
import PostItem from "../components/PostItem";
import NavbarBack from "../components/navbar-back";

const managePostPage = ({zmproute}) => {
    return (
        <Page className='page-box page-with-navbar'>
            <NavbarBack
                title="Danh sách tin đã lưu"
                linkLeft={'/account/'}
            />
        </Page>
    )
}
export default managePostPage