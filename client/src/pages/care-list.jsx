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
              _id: item.postDetail._id,
              images: item.postDetail.images,
              price: item.postDetail.price,
              title: item.postDetail.title,
              district: item.postDetail.district,
              city: item.postDetail.city,
              isLiked: 1,
            }}
            border
          />
        ))
      )}
    </Page>
  );
};
