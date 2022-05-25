import React, { useEffect } from "react";
import { Box, useStore } from "zmp-framework/react";
import HotItem from "./HotItem";
import store from "../../store";
import { ViewedItem } from ".";
import Loading from "../Loading";

const Categories = () => {
  const loading = useStore("loadingFlag");
  const electronicItems = useStore("hottestElectronicItems");
  const houseItems = useStore("hottestHouseItems");
  useEffect(() => {
    store.dispatch("fetchHottestItems");
  }, []);
  return (
    <Box ml={0} mr={0} style={{ marginBottom: "50px" }}>
      {loading ? (
        <Loading />
      ) : (
        <HotItem
          category="Thiết bị điện tử"
          products={electronicItems}
          index={0}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <HotItem
          category="Đồ gia dụng và nội thất"
          products={houseItems}
          index={1}
        />
      )}
      <ViewedItem />
    </Box>
  );
};

export default Categories;
