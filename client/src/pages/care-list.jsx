import React, { useEffect } from "react";
import {Page, Box, useStore, Row, Col, SkeletonBlock} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { Category } from "../components/Categories";
import store from "../store";

const managePostPage = ({ zmproute }) => {
  const careList = useStore("careList");
  const loading = useStore("loadingFlag");

  useEffect(() => {
    store.dispatch("fetchCareList");
  }, []);

  return (
    <Page className="page-box page-with-navbar">
      <NavbarBack title="Danh sách tin đã lưu" linkLeft={"/account/"} />
      {loading ? (
        <Box m={0} px={4} pb={2}>
          <Row gap="gap_4" className="mt-4">
            <Col>
              <SkeletonBlock effect="wave" height="200px" />
            </Col>
            <Col>
              <SkeletonBlock effect="wave" height="200px" />
            </Col>
          </Row>
        </Box>
      ) : (
        careList.map((item, index) => (
          <Category
            key={index}
            product={{
              images: item.postDetail[0].images,
              price: item.postDetail[0].price,
              title: item.postDetail[0].title,
              district: item.postDetail[0].district,
              city: item.postDetail[0].city,
            }}
            border
          />
        ))
      )}
    </Page>
  );
};
export default managePostPage;
