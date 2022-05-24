import React, { useEffect } from "react";
import { Box, Page, useStore } from "zmp-framework/react";
import Category from "../components/Categories/Category";
import NavbarBack from "../components/navbar-back";
import UserCard from "../components/user-card";
import store from "../store";

export default () => {
  const sellerInfo = useStore("sellerInfo");
  const zaloId = useStore("viewingZaloId");
  useEffect(() => {
    store.dispatch("fetchSellerInfo", { zaloId: zaloId });
  }, []);
  return (
    <Page name="seller-info">
      <NavbarBack title="Thông tin người bán" />
      <Box
        m={0}
        px={5}
        py={2}
        mb={3}
        className="border-color-nl700"
        style={{ borderBottom: "1px solid" }}
      >
        <UserCard
          avatar={sellerInfo?.extra?.picture}
          displayName={sellerInfo?.extra?.name}
          postCount={sellerInfo?.extra?.postCount}
          title="tin đang rao"
        />
      </Box>
      <Box>
        {sellerInfo?.data?.map((item, index) => (
          <Category key={index} product={item} border />
        ))}
      </Box>
    </Page>
  );
};
