import React, { useEffect } from "react";
import {Page, Navbar, Swiper, SwiperSlide, Text, Title, Icon, useStore, Avatar, Box, Grid, GridItem,} from "zmp-framework/react";
import "../css/swiper.css";
import UserCard from "../components/user-card";
import store from "../store";

export default () => {
  const user = useStore("user");
  const postDetails = useStore("postDetails");
  useEffect(() => {
    store.dispatch("fetchPostDetail", { id: "625fbb1e802e34fc55a25343" });
  }, []);
  return (
    <Page name="post-detail">
      <Navbar backLink="Back" />
      <Swiper pagination navigation loop>
        {postDetails[0]?.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box ml={5}>
        <Title className="item-name" size={"normal"} bold>
          {postDetails[0]?.title}
        </Title>
        <div>
          <Title className="item-price" bold>
            {postDetails[0]?.price}
          </Title>
          <Icon className="liked" zmp="zi-heart" colorTheme={"red"} />
        </div>
        <Box flexDirection="row" m={0}>
          <PostTag>
            {postDetails[0]?.district}, {postDetails[0]?.city}
          </PostTag>
          <PostTag>Tin đăng 1 giờ trước</PostTag>
        </Box>
        <Title size="small" bold>
          Tình trạng sản phẩm
        </Title>
        <Text size="xsmall"> {postDetails[0]?.condition}</Text>
        <Title size="small" bold>
          Thông tin chi tiết
        </Title>
        <Grid columns={2} noBorder>
          <DetailsDescription title="Màu sắc" description="Đỏ" />
        </Grid>
        <Title size="small" bold>
          Mô tả sản phẩm
        </Title>
        <Text size="xsmall">{postDetails[0]?.description}</Text>

        <Box ml={0} flexDirection="row" alignItems="left" inline>
          <Avatar
            size={56}
            src={
              "https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg"
            }
          />
          <Avatar
            style={{ marginLeft: 16 }}
            size={56}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/800px-Facebook_icon_2013.svg.png"
            }
          />
          <Avatar
            style={{ marginLeft: 16 }}
            size={56}
            src={
              "https://logos-world.net/wp-content/uploads/2021/02/Facebook-Messenger-Logo-2020-present.jpg"
            }
          />
          <Avatar
            style={{ marginLeft: 16 }}
            size={56}
            src={
              "https://cdn1.iconfinder.com/data/icons/web-design-and-development-50/64/110-512.png"
            }
          />
        </Box>
        <Title bold>Thông tin người bán</Title>
        <UserCard user={user}></UserCard>
        <Title bold>Sản phẩm tương tự</Title>
      </Box>
    </Page>
  );
};

const PostTag = ({ children }) => (
  <Text
    size="xsmall"
    className="r-round bg-color-nd300 text-color-black"
    style={{
      padding: "2px",
      marginBottom: "16px",
      marginRight: "4px",
      display: "inline-block",
      borderRadius: "4px",
    }}
  >
    {children}
  </Text>
);
const DetailsDescription = ({ title, description }) => (
  <GridItem style={{ padding: 0, alignItems: "flex-start" }}>
    <Text className="text-color-nl500">{title}</Text>
    <Title className="text-color-nl300">{description}</Title>
  </GridItem>
);
