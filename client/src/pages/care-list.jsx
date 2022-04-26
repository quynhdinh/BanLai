import React from "react";
import { Page, useStore } from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { Category } from "../components/Categories";

const managePostPage = ({ zmproute }) => {
  const products = useStore("products");
  return (
    <Page className="page-box page-with-navbar">
      <NavbarBack title="Danh sách tin đã lưu" linkLeft={"/account/"} />
      {products.map((item, index) => (
        <Category key={index} product={item} border />
      ))}
    </Page>
  );
};
export default managePostPage;
