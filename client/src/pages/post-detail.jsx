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
  Box,
  Grid,
  GridItem,
  zmp,
} from "zmp-framework/react";
import "../css/swiper.css";
import store from "../store";
import MessageBox from "../components/message-box";
import zalo from "../static/icons/Zalo.svg";
import facebook from "../static/icons/Facebook.svg";
import messeger from "../static/icons/Messenger.svg";
import link from "../static/icons/Link.svg";
import { getReadableTimeGap } from "../util/number";
import { ViewedItem } from "../components/Categories/";

const linkItems = [zalo, facebook, messeger, link];
export default () => {
  const zmproute = zmp.views.main.router.currentRoute;
  const postDetails = useStore("postDetails");
  useEffect(() => {
    store.dispatch("fetchPostDetail", { id: zmproute.query?.id });
  }, [zmproute.query?.id]);
  console.log(zmproute.query?.id);
  return (
    <Page name="post-detail">
      <Navbar backLink="Back" />
      <Box m={0} style={{ position: "relative" }}></Box>
      <MessageBox isTexted={false} />
      <Swiper pagination navigation loop>
        {postDetails?.[0]?.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box ml={5} style={{ paddingBottom: 200 }}>
        <Title className="item-name" size={"normal"} bold>
          {postDetails?.[0]?.title}
        </Title>
        <Title className="item-price" bold>
          {postDetails?.[0]?.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          đ
        </Title>
        <Icon className="liked" zmp="zi-heart" colorTheme={"red"} />
        <Box flexDirection="row" m={0}>
          <PostTag>
            {postDetails?.[0]?.district}, {postDetails?.[0]?.city}
          </PostTag>
          <PostTag>
            Tin đăng {getReadableTimeGap(postDetails?.[0]?.createdAt)}
          </PostTag>
        </Box>
        <Description
          title="Tình trạng sản phẩm"
          description={postDetails?.[0]?.condition}
        />
        {/* {postDetails?.[0]?.productDetails ? (
          <>
            <Title size="small" bold>
              Thông tin chi tiết
            </Title>
            <Grid columns={2} noBorder>
              {postDetails?.[0]?.productDetails.map((item, index) => (
                <DetailsDescription key={index} title="Màu sắc" description="Đỏ" />
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )} */}
        <Description
          title="Mô tả sản phẩm"
          description={postDetails?.[0]?.description}
        />
        <Title size="small" bold>
          Chia sẻ bài đăng
        </Title>
        <Box ml={0} flexDirection="row" alignItems="left" inline>
          {linkItems.map((item, index) => (
            <img key={index} src={item} style={{ marginRight: 12 }} />
          ))}
        </Box>
        <Title bold>Sản phẩm tương tự</Title>
        <ViewedItem />
      </Box>
    </Page>
  );
};

const Description = ({ title, description }) => (
  <>
    <Title size="small" bold>
      {title}
    </Title>
    <Text size="xsmall" style={{ whiteSpace: "break-spaces" }}>
      {description}
    </Text>
  </>
);

const PostTag = ({ children }) => (
  <Text
    size="xsmall"
    className="r-round bg-color-lg700 text-color-black"
    style={{
      padding: "4px",
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
