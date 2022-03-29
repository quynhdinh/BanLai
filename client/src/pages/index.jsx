import React, {useState} from 'react';
import {
    Page,
    useStore,
    Searchbar, Box, Icon, Text, Card,
} from 'zmp-framework/react';
import NavigationBar from '../components/NavigationBar';
import PostFilter from "../components/HomeMisc/PostFilter";
import PostDetail from "./post-detail";

const HomePage = () => {
    const user = useStore('user');
    const [keyword, setKeyword] = useState('')

    return (
        <Page name="home" navbarLarge>
            <NavigationBar/>
            <Box className="inquiry" px="2">
                    <div className="flex-1 ">
                        <Searchbar  className="discount-searchbar" value={keyword}
                                    onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                                    clearButton onSearchbarClear={() => setKeyword('')}/>
                        <PostFilter>{"Thiết bị điện tử"}</PostFilter>
                        <PostFilter>{"Đã qua sử dụng"}</PostFilter>
                    </div>
                </Box>
            {/*</Card>*/}
            {/*<PostDetail style={{marginTop: 5}}l></PostDetail>*/}
        </Page>
    );
}
export default HomePage;