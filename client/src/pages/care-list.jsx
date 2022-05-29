import React, { useEffect } from "react";
import { Page, useStore } from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { Category } from "../components/Categories";
import store from "../store";
import {LoadingVertical} from "../components/loading";

export default () => {
  const careList = useStore("careList");
  const loading = useStore("loadingFlag");

  useEffect(() => {
    store.dispatch("fetchCareList");
  }, []);

  return (
    <Page className="page-box page-with-navbar">
      <NavbarBack title="Danh sách tin đã lưu" linkLeft={"/account/"} />
      {loading ? (
        <LoadingVertical />
      ) : (
        careList.map((item, index) => (
          <Category
            key={index}
            product={{
              _id: item.postDetail[0]._id,
              images: item.postDetail[0].images,
              price: item.postDetail[0].price,
              title: item.postDetail[0].title,
              district: item.postDetail[0].district,
              city: item.postDetail[0].city,
              isLiked: 1,
            }}
            border
          />
        ))
      )}
    </Page>
  );
};
