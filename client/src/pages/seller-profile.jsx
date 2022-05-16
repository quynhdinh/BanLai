import React from "react";
import {Box, ListItem, Page, List, useStore,} from "zmp-framework/react";
import Category from "../components/Categories/Category";
import NavbarBack from "../components/navbar-back";
import UserCard from "../components/user-card";

export default () => {
  const fakeUser = useStore("fakeUser");

  const _u = useStore("u");
  const u = _u ? _u : fakeUser[0];

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