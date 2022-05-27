import React, { useEffect } from "react";
import {Page, Searchbar, Box, Tabbar, Link, Tabs, Tab, useStore} from "zmp-framework/react";
import store from "../store";
import NavigationBar from "../components/NavigationBar";
import PostItem from "../components/post-item";
import {LoadingVertical} from "../components/loading";

// Trang quản lý bài đăng
export default ({ zmproute }) => {
  const userPosts = useStore("userPosts");
  const loading = useStore("loadingFlag");

  useEffect(() => {
    store.dispatch("fetchUserPosts");
  }, []);

  return (
    <Page pageContent={false}>
      <NavigationBar active={zmproute.path} />
      <Box mt="1">
        <Searchbar
          placeholder="Tìm sản phẩm"
          searchContainer=".virtual-list"
          searchItem="li"
          searchIn=".item-title"
        />
      </Box>
      <div>
        <Tabbar top>
          <Link tabLink="#tab-1" tabLinkActive>
            Đang rao
          </Link>
          <Link tabLink="#tab-2">Đã bán</Link>
        </Tabbar>
      </div>
      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
          {loading ? (
            <LoadingVertical />
          ) : (
            <Box style={{ marginBottom: "150px" }}>
              {userPosts
                .filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj));
                  return o.status === "active";
                })
                .map((item, index) => (
                  <PostItem
                    key={index}
                    product={{
                      id: item._id,
                      images: item.images,
                      price: item.price,
                      title: item.title,
                    }}
                  />
                ))}
            </Box>
          )}
        </Tab>
        <Tab id="tab-2" className="page-content">
          {loading ? (
            <LoadingVertical />
          ) : (
            <Box style={{ marginBottom: "150px" }}>
              {userPosts
                .filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj));
                  return o.status !== "active"; // sold, closed
                })
                .map((item, index) => (
                  <PostItem
                    key={index}
                    product={{
                      id: item._id,
                      images: item.images,
                      price: item.price,
                      title: item.title,
                    }}
                    sold
                  />
                ))}
            </Box>
          )}
        </Tab>
      </Tabs>
    </Page>
  );
};
