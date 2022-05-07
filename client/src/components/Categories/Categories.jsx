import React, {useEffect} from "react";
import {Box, useStore} from "zmp-framework/react";
import HotItem from "./HotItem";
import store from "../../store";
import {ViewedItem} from ".";
import Loading from "../loading";

const Categories = () => {
  const electronicItems = useStore("hottestElectronicItems");
  const loading = useStore("loadingFlag");
  useEffect(() => {
    store.dispatch("fetchHottestElectronicItems");
  }, []);
  const houseItems = useStore("hottestHouseItems");
  useEffect(() => {
    store.dispatch("fetchHottestHouseItems");
  }, []);
  return (
    <Box ml={0} mr={0}>
      {loading ? <Loading/> : (
        <HotItem
          category="Thiết bị điện tử"
          products={electronicItems}
          index={0}
          paddingBot={1}
        />)}
      {loading ?
        <Loading/> : (
        <HotItem
          category="Đồ gia dụng và nội thất"
          products={houseItems}
          index={1}
          paddingBot={1}
        />
      )}
      <ViewedItem/>
    </Box>
  );
};

export default Categories;
