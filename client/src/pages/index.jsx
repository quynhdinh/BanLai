import React, {useState} from 'react';
import {
    Page,
    useStore,
    SkeletonImage,
    SkeletonText,
    Searchbar, Box, Icon, Text, Card,
} from 'zmp-framework/react';
import NavigationBar from '../components/NavigationBar';
import Categories from "../components/Categories";
import PostFilter from "../components/HomeMisc/PostFilter";

const HomePage = () => {
    const [keyword, setKeyword] = useState('')

    return (
        <Page name="home" navbarLarge>
            <NavigationBar/>
            {/*<Box className="inquiry" mt ={1}>*/}
            {/*    <div className="flex-1 ">*/}
            {/*        /!*<Searchbar  className="discount-searchbar" value={keyword}*!/*/}
            {/*        /!*            onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"*!/*/}
            {/*        /!*            clearButton onSearchbarClear={() => setKeyword('')}/>*!/*/}
            {/*        /!*<PostFilter>{"Thiết bị điện tử"}</PostFilter>*!/*/}
            {/*        /!*<PostFilter>{"Đã qua sử dụng"}</PostFilter>*!/*/}
            {/*    </div>*/}
            {/*</Box>*/}
            <Box flex flexDirection="row" style={{justifyContent: "center"}}>
                <Box style={{position: "flex", right: "10%"}}>
                    <SkeletonImage
                        tag="div"
                        showIcon
                        iconColor="gray"
                        width={120}
                        height={90}
                    />
                </Box>

                <Box style={{position: "flex", left: "10%"}}>
                    <SkeletonImage
                        tag="div"
                        showIcon
                        iconColor="gray"
                        width={120}
                        height={90}
                    />
                </Box>
            </Box>

            <Box>
                <Categories/>
            </Box>
        </Page>
    );
}
export default HomePage;