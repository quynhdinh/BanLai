import React, { useEffect } from "react";
import { Box, useStore } from "zmp-framework/react";
import PostTray from "./post-tray";
import store from "../../store";
import LoadingHorizontal from "../loading-horizontal";

const Categories = () => {
  const loading = useStore("loadingFlag");
  const electronicItems = useStore("hottestElectronicItems");
  const houseItems = useStore("hottestHouseItems");
  const viewedItems = useStore("viewedItems");
  useEffect(() => {
    store.dispatch("fetchHottestItems");
    store.dispatch("fetchViewedItems");
  }, []);
  return (
    <Box ml={0} mr={0} style={{ marginBottom: "50px" }}>
      {loading ? (
        <LoadingHorizontal />
      ) : (
        <PostTray
          category="Thiết bị điện tử"
          products={electronicItems}
          index={0}
        />
      )}
      {loading ? (
        <LoadingHorizontal />
      ) : (
        <PostTray
          category="Đồ gia dụng và nội thất"
          products={houseItems}
          index={1}
        />
      )}
      {loading ? (
        <LoadingHorizontal/>
      ) : (
        <PostTray
          category="Sản phẩm đã xem"
          products={viewedItems}
          index={2}
        />
      )}
    </Box>
  );
};

export default Categories;
