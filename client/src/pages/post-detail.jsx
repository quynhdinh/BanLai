import React, { useEffect } from "react";
import {
  Page,
  Navbar,
  Swiper,
  SwiperSlide,
  Text,
  Title,
  Icon,
  useStore,
  Avatar,
  Box,
  Grid,
  GridItem,
  ListInput,
  List,
} from "zmp-framework/react";
import "../css/swiper.css";
import UserCard from "../components/user-card";
import store from "../store";
import MessageBox from "../components/message-box";
import zalo from "../static/icons/Zalo.svg";
import facebook from "../static/icons/Facebook.svg";
import messeger from "../static/icons/Messenger.svg";
import link from "../static/icons/Link.svg";

const linkItems = [zalo, facebook, messeger, link];
export default () => {
  const user = useStore("user");
  const postDetails = useStore("postDetails");
  useEffect(() => {
    store.dispatch("fetchPostDetail", { id: "626b8291669a242ed89e2ed0" });
  }, []);

  return (
    <Page name="post-detail">
      <Navbar backLink="Back" />
      <Box m={0} style={{ position: "relative" }}></Box>
      <MessageBox isTexted={false} />
      {/* <Swiper pagination navigation loop>
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

        
        <Title bold>Thông tin người bán</Title>
        <UserCard user={user}></UserCard>
        <Title bold>Sản phẩm tương tự</Title>
        
      </Box> */}
      <Box ml={0} flexDirection="row" alignItems="left" inline>
        {linkItems.map((item, index) => (
          <img key={index} src={item} style={{marginRight:8}}/>
        ))}
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
