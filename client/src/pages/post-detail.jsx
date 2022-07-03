import React, {useEffect, useState} from "react";
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
  Grid,
  zmp,
  Button,
} from "zmp-framework/react";
import "../css/swiper.css";
import store from "../store";
import {getReadableTimeGap, moneyFormat} from "../util/number";
import {getProductDetailTitle} from "../util/productDetail";
import UserCard from "../components/user-card";
import HeartIcon from "../components/heart-icon";
import {PostTray} from "../components/Categories";
import {LoadingHorizontal} from "../components/loading";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {BiHeart} from "react-icons/bi";
import ShareItem from "../components/share-item";
import MessageBox from "../components/message-box";


export default ({zmproute}) => {
  const [preTime, setPreTime] = useState(0);
  const postDetails = useStore("postDetails");
  const u = useStore("u");

  useEffect(() => {
    if (zmproute.query.id) {
      store.dispatch("fetchPostDetail", {id: zmproute.query.id});
      store.dispatch("updateViewCount", {postId: zmproute.query.id});
    }
  }, []);

  const handleViewSellerProfile = () => () => {
    const zmprouter = zmp.views.main.router;
    zmprouter.navigate(
      {path: "/seller-info", query: {zaloId: postDetails.zaloId}},
      {transition: "zmp-push"}
    );
  };

  const handleEditPost = () => {
    const zmprouter = zmp.views.main.router;
    zmprouter.navigate(
      {
        path: "/create-post",
        query: {
          category: postDetails.category,
          subcategory: postDetails.subCategory,
          mode: 1,
        },
      },
      {transition: "zmp-push"}
    );
  };

  const handleLikeUnlike = (details) => {
    const nowTime = Date.now();
    setPreTime(nowTime);
    if (nowTime - preTime < 250) {
      return;
    }
    store.dispatch(details.isLiked === 0 ? "likePost" : "unlikePost", {
      postId: details._id,
    });
    store.dispatch("fakeLikeUnlikePostList", {
      postId: details._id,
      isLiked: details.isLiked,
    });
  };

  const shareUrl = "http://github.com";
  const title = "GitHub";
  //zmproute.query.mode === 0 : xem bài viết bình thường
  //mode === 1 : xem bài viết chế độ chỉnh sửa
  //mode === 2 : xem bài viết sau khi tạo bài đăng
  return (
    <Page name="post-detail">
      <Navbar backLink="Back"/>
      <Box m={0} style={{position: "relative"}}/>
      {zmproute.query?.mode === "1" && (
        <Box flex>
          <Button
            typeName="primary"
            style={{flex: 1, margin: 8}}
            onClick={handleEditPost}
          >
            Sửa tin
          </Button>
          <Button typeName="secondary" style={{flex: 1, margin: 8}}>
            {postDetails.status === "active" ? "Đã bán/ẩn bài" : "Đăng lại"}
          </Button>
        </Box>
      )}

      {zmproute.query?.mode === "0" && (
        <MessageBox isTexted={postDetails.isContacted} partnerId={postDetails.zaloId} postId={postDetails._id}/>
      )}
      <Swiper pagination navigation loop>
        {postDetails.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.url}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box ml={5}>
        <Title className="item-name" size={"normal"} bold>
          {postDetails.title}
        </Title>
        <Box m={0} flex>
          <Title className="item-price" bold style={{flex: 1}}>
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

        <Box m={0} mb={2} flex style={{alignItems: "center"}}>
          <MdOutlineRemoveRedEye size={24} className="text-color-bl300"/>
          <Text style={{margin: "0px 24px 0px 4px"}} size="xsmall">
            {postDetails.viewCount}
          </Text>
          <BiHeart size={24} className="text-color-rl300"/>
          <Text style={{margin: "0px 8px 0px 4px"}} size="xsmall">
            {postDetails.likeCount}
          </Text>
        </Box>
        <Description
          title="Tình trạng sản phẩm"
          description={postDetails.condition}
        />
        {postDetails.productDetails && (
          <ProductDetails postDetails={postDetails}/>
        )}
        <Description
          title="Mô tả sản phẩm"
          description={postDetails.description}
        />
        {zmproute.query?.mode === "0" && <ShareItem url="https://www.facebook.com/"/>}
      </Box>

      {zmproute.query?.mode === "0" && (
        <>
          <SellerInfo
            postDetails={postDetails}
            onClick={handleViewSellerProfile()}
          />
          <Box ml={5}>
            <Title bold>Sản phẩm tương tự</Title>
            {postDetails.relatedPosts ? (
              <PostTray
                category=""
                products={postDetails.relatedPosts}
                index={-1}
                isShowHeart={0}
              />
            ) : (
              <LoadingHorizontal/>
            )}
          </Box>
        </>
      )}
    </Page>
  );
};

const Description = ({title, description}) => (
  <>
    <Title size="small" bold>
      {title}
    </Title>
    <Text size="xsmall" style={{whiteSpace: "break-spaces"}}>
      {description}
    </Text>
  </>
);

const PostTag = ({children}) => (
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

const ProductDetails = ({postDetails}) => (
  <>
    <Title size="small" bold>
      Thông tin chi tiết
    </Title>
    <Grid columns={2} noBorder>
      {Object.keys(postDetails.productDetails).map((item, index) => (
        <GridItem key={index} style={{padding: 0, alignItems: "flex-start"}}>
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

const SellerInfo = ({postDetails, onClick}) => (
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
