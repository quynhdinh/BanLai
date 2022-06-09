import React, { useEffect } from "react";
import {Page, useStore, Tabbar, Link, Tabs, Tab, Box} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import store from "../store";
import MessageItem from "../components/message-item";
import {LoadingVertical} from "../components/loading";

//Trang quản lý tin nhắn (Tôi mua/Tôi bán)
export default ({ zmproute }) => {
  const messages = useStore("messages");
  const loading = useStore("isMessageLoading");

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
            <LoadingVertical />
          ) : (
            <Box style={{ marginBottom: "50px" }}>
              {messages
                .filter(function (obj) {
                  return obj.type === "0";
                })
                .map((item, index) => (
                  <MessageItem key={index} product={item} />
                ))}
            </Box>
          )}
        </Tab>
        <Tab id="tab-2" className="page-content">
          {loading ? (
            <LoadingVertical />
          ) : (
            <Box style={{ marginBottom: "50px" }}>
              {messages
                .filter(function (obj) {
                  return obj.type === "1";
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