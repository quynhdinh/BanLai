import React, { useEffect } from "react";
import { Box, useStore } from "zmp-framework/react";
import HotItem from "./HotItem";
import store from "../../store";
import { ViewedItem } from ".";

const Categories = () => {
  const electronicItems = useStore("hottestElectronicItems");
  useEffect(() => {
    store.dispatch("fetchHottestElectronicItems");
  }, []);
  console.log("electronic", electronicItems);
  const houseItems = useStore("hottestHouseItems");
  useEffect(() => {
    store.dispatch("fetchHottestHouseItems");
  }, []);
  console.log("house: ", houseItems);
  return (
    <Box ml={0} mr={0}>
      <HotItem
        category="Thiết bị điện tử"
        products={electronicItems}
        index={0}
      />
      <HotItem
        category="Đồ gia dụng và nội thất"
        products={houseItems}
        index={1}
      />
      <ViewedItem />
    </Box>
  );
};

export default Categories;
