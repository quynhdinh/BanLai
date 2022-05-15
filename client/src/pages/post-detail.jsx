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
  GridItem,
} from "zmp-framework/react";
import "../css/swiper.css";
import store from "../store";
import MessageBox from "../components/message-box";
import zalo from "../static/icons/Zalo.svg";
import facebook from "../static/icons/Facebook.svg";
import messenger from "../static/icons/Messenger.svg";
import link from "../static/icons/Link.svg";
import { getReadableTimeGap, moneyFormat } from "../util/number";
import { ViewedItem } from "../components/Categories/";
import UserCard from "../components/user-card";

const linkItems = [zalo, facebook, messenger, link];
export default () => {
  const postDetails = useStore("postDetails");
  const viewingPostId = useStore("viewingPostId");
  useEffect(() => {
    store.dispatch("fetchPostDetail", { id: viewingPostId });
  }, []);
  return (
    <Page name="post-detail">
      <Navbar backLink="Back" />
      <Box m={0} style={{ position: "relative" }} />
      <MessageBox isTexted={false} />
      <Swiper pagination navigation loop>
        {postDetails.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box ml={5}>
        <Title className="item-name" size={"normal"} bold>
          {postDetails.title}
        </Title>
        <Title className="item-price" bold>
          {moneyFormat(postDetails.price)}
        </Title>
        <Icon className="liked" zmp="zi-heart" colorTheme={"red"} />
        <Box flexDirection="row" m={0}>
          <PostTag>
            {postDetails.district}, {postDetails.city}
          </PostTag>
          <PostTag>
            Tin đăng {getReadableTimeGap(postDetails.createdAt)}
          </PostTag>
        </Box>
        <Description
          title="Tình trạng sản phẩm"
          description={postDetails.condition}
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
          description={postDetails.description}
        />
        <SharePost />
      </Box>
      <SellerInfo postDetails={postDetails} />
      <Box ml={5} style={{ paddingBottom: 200 }}>
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
    size="xxsmall"
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

const SellerInfo = ({ postDetails }) => (
  <div
    className="border-color-nl700"
    style={{
      borderTop: "1px solid",
      borderBottom: "1px solid",
      margin: "12px 0",
      padding: "8px 24px",
    }}
  >
    <Title bold>Thông tin người bán</Title>
    <UserCard
      avatar={postDetails.picture}
      displayName={postDetails.name}
      postCount={postDetails.postCount}
      title="tin đang rao"
    />
  </div>
);

const SharePost = ({}) => (
  <div>
    <Title size="small" bold>
      Chia sẻ bài đăng
    </Title>
    <Box ml={0} flexDirection="row" alignItems="left" inline>
      {linkItems.map((item, index) => (
        <img key={index} src={item} style={{ marginRight: 12 }} />
      ))}
    </Box>
  </div>
);
