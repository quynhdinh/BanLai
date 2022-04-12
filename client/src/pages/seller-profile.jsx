import React from "react";

import {
  Box,
  List,
  ListItem,
  Page,
  useStore,
} from "zmp-framework/react";
import Category from "../components/Categories/Category";
import NavbarBack from "../components/navbar-back";
import UserCard from "../components/user-card";

const SellerProfilePage = () => {
  const user = useStore("user");

  const _u = useStore("u");
  const u = _u ? _u : user[0];

  return (
    <Page name="seller-profile">
      <NavbarBack title="Thông tin người bán" />
      <Box>
        <List style={{ marginBottom: 0, marginTop: 0 }}>
          <ListItem>
            <UserCard user={u} />
          </ListItem>
        </List>
        <Category border/>
        <Category border/>
        <Category border/>
        <Category border/>
        <Category border/>
        <Category border/>

      </Box>
    </Page>
  );
};

export default SellerProfilePage;
