import React from "react";
import {
  Page,
  useStore,
  List,
  ListItem,
  Box,
  Title,
  Icon,
} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import UserCard from "../components/user-card";

// Trang tài khoản
const account = ({ zmproute }) => {
  const fakeUser = useStore("fakeUser");
  const _u = useStore("u");
  const u = _u ? _u : fakeUser[0];

  return (
    <Page className="page-box page-with-navbar">
      <NavigationBar active={zmproute.path} />
      <List style={{ marginTop: 0 }}>
        <ListItem>
          <UserCard
            avatar={u.avatar}
            displayName={u.displayName}
            title="Thành viên Bán Lại"
          />
        </ListItem>
        <ListItem link="/care-list/" title="Tin đăng đã lưu">
          <Icon
            className="list-icon"
            slot="media"
            zmp="zi-heart-solid"
            color={"#ff3b30"}
            size={16}
          />
        </ListItem>
      </List>

      <Box mt={20} ml={10}>
        <Title size="normal">Liên hệ Bán Lại</Title>
        <Box key="normal" mb="4">
          <Title size="xsmall">Email: banlai@gmail.com</Title>
          <Title size="xsmall">Hotline: 1987654321</Title>
        </Box>
      </Box>
      <Box ml={10} mt={10}>
        <Title size="normal">Hướng dẫn đăng tin</Title>
        <Box key="normal" mb="4">
          <Title size="xsmall">Quy định đăng tin</Title>
          <Title size="xsmall">Hướng dẫn đăng tin</Title>
        </Box>
      </Box>
    </Page>
  );
};
export default account;
