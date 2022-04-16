import React, {useState} from 'react';
import {
    Page,
    useStore,
    SkeletonImage,
    SkeletonText,
    Searchbar, Box, Icon, Text, Card, Link, zmp, Button,
} from 'zmp-framework/react';
import NavigationBar from '../components/NavigationBar';
import Categories from "../components/Categories";
import PostFilter from "../components/HomeMisc/PostFilter";

const HomePage = () => {
    const zmproute = zmp.views.main.router

    function electronicSelect() {
        zmproute.navigate('/electronic-list')
    }

    function houseItemSelect() {
        zmproute.navigate('/house-item-list')
    }

    return (
        <Page name="home"
              navbarLarge
        >
            <NavigationBar/>
            <Box flex flexDirection="row" style={{justifyContent: "center"}}>
                <Box style={{position: "flex", right: "10%"}}>
                    <Button
                        onClick={electronicSelect}
                        style={{
                            backgroundColor: "grey",
                            color: "black",
                            width: "120px",
                            height: "100px"

                        }}
                    >
                        Đồ điện tử
                    </Button>
                </Box>

                <Box style={{position: "flex", left: "10%"}}>
                    <Button
                        onClick={houseItemSelect}
                        style={{
                            backgroundColor: "grey",
                            color: "black",
                            width: "120px",
                            height: "100px"
                        }}
                    >
                        Đồ gia dụng
                    </Button>
                </Box>
            </Box>

            <Categories/>
        </Page>
    );
}
export default HomePage;