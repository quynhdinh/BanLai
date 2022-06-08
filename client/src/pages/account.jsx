import React, {useEffect} from "react";
import NavigationBar from "../components/NavigationBar";
import {Page, useStore, List, ListItem, Box, Title, Icon, Text} from "zmp-framework/react";
import UserCard from "../components/user-card";
import ZMPLogo from "../static/icons/ZMPLogo.svg";
import BanLaiLogo from "../static/icons/BanLai.svg";
import store from "../store";

// Trang tài khoản
const account = ({ zmproute }) => {
  const loading = useStore("loadingFlag");
  const fakeUser = useStore("fakeUser");
  const stats = useStore("userStats");
  const _u = useStore("u");
  const u = _u ? _u : fakeUser;

  useEffect(() => {
    store.dispatch("fetchUserStats", u.zaloId);
  }, []);

  return (
    <Page className="page-box page-with-navbar">
      <Text>
        {loading ? "none" : stats?.likeCount + ", " +stats?.viewCount}
      </Text>
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
            className="color-rl300"
            size={16}
          />
        </ListItem>
      </List>
      <Box m={10}>
        <img src={BanLaiLogo} style={{ height: 32, marginBottom: 4 }} />
        <img src={ZMPLogo} style={{ height: 28 }} />
      </Box>

      <Box mt={20} ml={10}>
        <Title bold>Liên hệ Bán Lại</Title>
        <Box key="normal" mb="4">
          <Title size="xsmall">
            Email: <span className="text-color-bl300">banlai@gmail.com</span>
          </Title>
          <Title size="xsmall">Hotline: 1987654321</Title>
        </Box>
      </Box>

      <Box ml={10} mt={5}>
        <Title bold>Hướng dẫn đăng tin</Title>

        <Box key="normal" mb="4">
          <Title size="xsmall">Quy định đăng tin</Title>
          <Title size="xsmall">Hướng dẫn đăng tin</Title>
        </Box>
      </Box>
    </Page>
  );
};
export default account;
