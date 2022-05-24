import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Swiper,
  SwiperSlide,
  Text,
  Title,
  useStore,
  Box,
  GridItem,
  Row,
  Col,
  zmp,
  Grid,
} from "zmp-framework/react";
import "../css/swiper.css";
import store from "../store";
import MessageBox from "../components/message-box";
import zalo from "../static/icons/Zalo.svg";
import facebook from "../static/icons/Facebook.svg";
import messenger from "../static/icons/Messenger.svg";
import link from "../static/icons/Link.svg";
import { getReadableTimeGap, moneyFormat } from "../util/number";
import { getProductDetailTitle } from "../util/productDetail";
import UserCard from "../components/user-card";
import HeartIcon from "../components/heart-icon";
import Loading from "../components/Loading";
import Category from "../components/Categories/Category";

const linkItems = [zalo, facebook, messenger, link];
const visits = {
  "2017-05-05": 2,
  "2017-05-06": 8,
  "2017-05-07": 10,
  "2017-05-08": 1,
};
export default () => {
  const [preTime, setPreTime] = useState(0);
  const postDetails = useStore("postDetails");
  const viewingPostId = useStore("viewingPostId");
  useEffect(() => {
    store.dispatch("fetchPostDetail", { id: viewingPostId });
  }, []);

  const handleViewSellerProfile = ({ zaloId }) => {
    const zmprouter = zmp.views.main.router;
    zmprouter.navigate({ path: "/seller-profile" }, { transition: "zmp-push" });
    store.dispatch("setViewingZaloId", { zaloId: zaloId });
  };

  const handleLikeUnlike = (details) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    if (details.isLiked === 0) {
      store.dispatch("fakeLikeUnlikePostList", {
        postId: details._id,
        isLiked: details.isLiked,
      });
      store.dispatch("likePost", { postId: details._id });
    } else {
      store.dispatch("fakeLikeUnlikePostList", {
        postId: details._id,
        isLiked: details.isLiked,
      });
      store.dispatch("unlikePost", { postId: details._id });
    }
  };
  console.log(postDetails.productDetails);

  return (
    <Page name="post-detail">
      <Navbar backLink="Back" />
      <Box m={0} style={{ position: "relative" }} />
      <MessageBox isTexted={true} />
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
        <Box m={0} flex>
          <Title className="item-price" bold style={{ flex: 1 }}>
            {moneyFormat(postDetails.price)}
          </Title>
          <HeartIcon
            isLiked={postDetails.isLiked}
            handleLikeUnlike={(e) => {
              e.stopPropagation();
              return handleLikeUnlike(postDetails);
            }}
          />
        </Box>
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
        {postDetails.productDetails && (
          <ProductDetails postDetails={postDetails} />
        )}
        <Description
          title="Mô tả sản phẩm"
          description={postDetails.description}
        />
        <SharePost />
      </Box>
      <SellerInfo
        postDetails={postDetails}
        onClick={() => {
          handleViewSellerProfile({ zaloId: postDetails.zaloId });
        }}
      />
      <Box ml={5} style={{ paddingBottom: 200 }}>
        <Title bold>Sản phẩm tương tự</Title>
        {postDetails.relatedPosts ? (
          <RelatedPosts relatedPosts={postDetails.relatedPosts} />
        ) : (
          <Loading />
        )}
      </Box>
    </Page>
  );
};

const RelatedPosts = ({ relatedPosts }) => (
  <Box className="product-row" p={1}>
    <Row
      style={{
        width: `calc(${relatedPosts.length * 80}vw - ${
          relatedPosts.length * 20
        }px + ${(relatedPosts.length - 1) * 8}px)`,
      }}
    >
      {relatedPosts.map((post) => (
        <Col key={post._id} className="product-column">
          <Category product={post} />
        </Col>
      ))}
    </Row>
  </Box>
);

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

const ProductDetails = ({ postDetails }) => (
  <>
    <Title size="small" bold>
      Thông tin chi tiết
    </Title>
    <Grid columns={2} noBorder>
      {Object.keys(postDetails.productDetails).map((item, index) => (
        <GridItem key={index} style={{ padding: 0, alignItems: "flex-start" }}>
          <Text className="text-color-nl500">
            {getProductDetailTitle(item)}
          </Text>
          <Title size="xsmall" className="text-color-nl300">
            {postDetails.productDetails[item]}
          </Title>
        </GridItem>
      ))}
    </Grid>
  </>
);

const SellerInfo = ({ postDetails, onClick }) => (
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
    <div onClick={onClick}>
      <UserCard
        avatar={postDetails.picture}
        displayName={postDetails.name}
        postCount={postDetails.postCount}
        title="tin đang rao"
      />
    </div>
  </div>
);

const SharePost = () => (
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
