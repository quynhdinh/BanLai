import React, { useEffect } from "react";
import { Box, useStore } from "zmp-framework/react";
import PostTray from "./post-tray";
import store from "../../store";
import {LoadingHorizontal} from "../loading";

const Categories = () => {
  const loading = useStore("isHomeLoading");
  const hottestItems = useStore("hottestItems");
  const viewedItems = useStore("viewedItems");
  useEffect(() => {
    store.dispatch("fetchHottestItems");
  }, []);
  return (
    <Box ml={0} mr={0} style={{ marginBottom: "50px" }}>
      {loading ? (
        <LoadingHorizontal />
      ) : (
        <PostTray
          category="Thiết bị điện tử"
          products={hottestItems.electric}
          index={0}
        />
      )}
      {loading ? (
        <LoadingHorizontal />
      ) : (
        <PostTray
          category="Đồ gia dụng và nội thất"
          products={hottestItems.house}
          index={1}
        />
      )}
      {loading ? (
        <LoadingHorizontal/>
      ) : (
        <PostTray
          category="Sản phẩm đã xem"
          products={hottestItems.viewed}
          index={-1}
        />
      )}
    </Box>
  );
};

export default Categories;
