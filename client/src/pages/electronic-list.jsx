import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box, Card,
    List, ListItem,
    Page, Searchbar,
    useStore,
    zmp,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import NavigationBar from "../components/NavigationBar";
import PostFilter from "../components/HomeMisc/PostFilter";

const electronicListPage = () => {
    const [keyword, setKeyword] = useState('')
    return (
        <Page pageContent={false}
              name="electronic-list"
        >
            <NavigationBar/>
            <Box className="inquiry" mt={1}>
                <div className="flex-1 ">
                    <Searchbar className="discount-searchbar" value={keyword}
                               onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                               clearButton onSearchbarClear={() => setKeyword('')}/>
                    <PostFilter>{"Thiết bị điện tử"}</PostFilter>
                    {/*<PostFilter>{"Đã qua sử dụng"}</PostFilter>*/}
                </div>
            </Box>
        </Page>
    )
}

export default electronicListPage;