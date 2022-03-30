import React from "react";
import {
    Page,
    Navbar,
    Swiper,
    SwiperSlide, Text, Title, Icon, useStore, Avatar, AvatarGroup, Box, Card, Button
} from "zmp-framework/react";
import "../css/swiper.css";
import UserCard from "../components/user-card";
import form from "./form";
import Categories, {Category} from "../components/Categories";
const url = "https://tophinhanhdep.com/wp-content/uploads/2021/10/Beautiful-Scenery-Wallpapers.jpg"
const url2 = 'https://www.notebookcheck.net/uploads/tx_nbc2/4_to_3_Teaser_Apple_iPhone_13_Pro.jpg'
// const user = useStore('user');

const PostTag = ({children}) => (
    <a alt="" href="" className="block-icon">
        <Text
            className="r-round bg-color-nd300 text-color-black"
            class="filter-text"
            style={{
                padding: "4px 8px",
                marginBottom: "4px",
                marginTop: "3px",
                display: "inline-block",
            }}
        >
            {children}
        </Text>
    </a>
);

export default () => {
    const user = useStore('user');

    return (

        <Page name="home">

            <Navbar backLink="Back"/>
            <Swiper pagination navigation scrollbar>
                <SwiperSlide>
                    <img src = {url}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={url2}/>
                </SwiperSlide>
            </Swiper>
            <Box ml={5}>
                <Title className = 'item-name' size={'normal'}  bold>Điện thoại iPhone 13 còn bảo hành 9 tháng chưa qua sửa chữa</Title>
                {/*<Box flexDirection="row" m={0}>*/}
                    <div>
                        <Title className='item-price' bold>20.000.000 đ</Title>
                        <Icon className='liked' zmp="zi-heart"  colorTheme={'red'}/>
                    </div>
                {/*</Box>*/}
                <Box flexDirection="row" m={0}>
                    <PostTag>Tân Bình, Hồ Chí Minh</PostTag>
                    <PostTag>Tin đăng 1 giờ trước</PostTag>
                </Box>
                <Title bold >
                    Tình trạng sản phẩm
                </Title>
                <Text>
                    Đã sử dụng, còn bảo hành
                </Text>

                <Title bold >
                    Mô tả sản phẩm
                </Title>
                <Text >
                    Mình cần bán chiếc iPhone 13 pro gold bản 128gb VN/A
                    mua tại hoàng hà
                </Text>
                <Text >
                    Máy chưa vết xước pin 100% sạc khoảng 70 lần. Fullbox, đầy đủ phụ kiện như lúc mua, cả hóa đơn. Ngyên tem cả máy và cáp. Tất cả vẫn như mới
                </Text>
                <Text >
                    Tất cả ảnh mình đã chụp rất chi tiết. Mình người dùng vì có chút việc cần tiền nên bán ai có nhu cầu thực sự thì liên hệ mình
                </Text>

                <Box ml={0} flexDirection="row" alignItems="left" inline>
                    <Avatar size={56} src={'https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg'}/>
                    <Avatar style={{ marginLeft: 16 }} size={56} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/800px-Facebook_icon_2013.svg.png'}/>
                    <Avatar style={{ marginLeft: 16 }} size={56} src={'https://logos-world.net/wp-content/uploads/2021/02/Facebook-Messenger-Logo-2020-present.jpg'}/>
                    <Avatar style={{ marginLeft: 16 }} size={56} src={'https://cdn1.iconfinder.com/data/icons/web-design-and-development-50/64/110-512.png'}/>
                </Box>
                <Title bold>
                    Thông tin người bán
                </Title>
                <UserCard user={user}>
                </UserCard>
                <Title bold>
                    Sản phẩm tương tự
                </Title>
                {/*<Category></Category>*/}
                <Categories></Categories>
            </Box>
        </Page>
    );
};
