import React from "react";
import {
    Page,
    Navbar,
    Swiper,
    SwiperSlide, Text, Title, Icon, useStore
} from "zmp-framework/react";
import "../css/swiper.css";
import UserCard from "../components/user-card";
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
                marginLeft: "2px",
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
                <SwiperSlide>
                    <Text>fsdfd</Text>
                </SwiperSlide>
            </Swiper>
            <Title className = 'item-name' size={'normal'}  bold>Điện thoại iPhone 13 còn bảo hành 9 tháng chưa qua sửa chữa</Title>
            <Title className='item-price' bold>20.000.000 đ</Title>
            <PostTag>Tân Bình, Hồ Chí Minh</PostTag>
            <PostTag>Tin đăng 1 giờ trước</PostTag>

            <Title bold className='text'>
                Tình trạng sản phẩm
            </Title>
            <Text className='text'>
                Đã sử dụng, còn bảo hành
            </Text>
            <Title bold className='text'>
                Mô tả sản phẩm
            </Title>
            <Text className='text'>
                Mình cần bán chiếc iPhone 13 pro gold bản 128gb VN/A
                mua tại hoàng hà
            </Text>
            <Text className='text'>
                Máy chưa vết xước pin 100% sạc khoảng 70 lần. Fullbox, đầy đủ phụ kiện như lúc mua, cả hóa đơn. Ngyên tem cả máy và cáp. Tất cả vẫn như mới
            </Text>
            <Text className='text'>
                Tất cả ảnh mình đã chụp rất chi tiết. Mình người dùng vì có chút việc cần tiền nên bán ai có nhu cầu thực sự thì liên hệ mình
            </Text>

            <div>
                <Title className='text' bold>Thông tin người bán</Title>
                <UserCard user={user}/>
            </div>
            <div style={{marginTop: 10}}>
                <Title className='text' bold>Các sản phẩm tương tự</Title>
                <UserCard user={user}/>
            </div>
        </Page>
    );
};
