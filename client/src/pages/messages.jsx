import React, { useEffect } from "react";
import {Page, useStore, Tabbar, Link, Tabs, Tab, Box} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import store from "../store";
import Loading from "../components/Loading";
import MessageItem from "../components/MessageItem";

//Trang quản lý tin nhắn (Tôi mua/Tôi bán)
const messagePage = ({ zmproute }) => {
  const messages = useStore("messages");
  const loading = useStore("loadingFlag");

  useEffect(() => {
    store.dispatch("fetchMessages");
  }, []);

  return (
    <Page pageContent={false}>
      <NavigationBar active={zmproute.path} />
      <Tabbar top>
        <Link tabLink="#tab-1" tabLinkActive>
          Tôi mua
        </Link>
        <Link tabLink="#tab-2">Tôi bán</Link>
      </Tabbar>
      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
          {loading ? (
            <Loading />
          ) : (
            <Box style={{ marginBottom: "50px" }}>
              {messages
                .filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj));
                  return o.type === "0";
                })
                .map((item, index) => (
                  <MessageItem key={index} product={item} />
                ))}
            </Box>
          )}
        </Tab>
        <Tab id="tab-2" className="page-content">
          {loading ? (
            <Loading />
          ) : (
            <Box>
              {messages
                .filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj));
                  return o.type === "1";
                })
                .map((item, index) => (
                  <MessageItem key={index} product={item} />
                ))}
            </Box>
          )}
        </Tab>
      </Tabs>
    </Page>
  );
};

export default messagePage;
