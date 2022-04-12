import React from "react";

import { Box, Page } from "zmp-framework/react";
import Category from "../components/Categories/Category";
import NavbarBack from "../components/navbar-back";

const CareListPage = () => {
  return (
    <Page name="care-list">
      <NavbarBack title="Tin đã lưu" />
      <Box>
        <Category border />
        <Category border />
        <Category border />
        <Category border />
        <Category border />
        <Category border />
      </Box>
    </Page>
  );
};

export default CareListPage;
