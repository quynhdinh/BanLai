import React, {useEffect} from 'react';
import {Page, Card, Searchbar, Box, Tabbar, Link, Tabs, Tab, useStore, Button, Row, Col, SkeletonBlock} from 'zmp-framework/react';
import NavigationBar from "../components/NavigationBar";
import PostItem from "../components/PostItem";
import store from "../store";

// Trang quản lý bài đăng
const managePostPage = ({zmproute}) => {
  const userPosts = useStore('userPosts')
  const loading = useStore('loadingFlag')
  const spacing = '20px'

  useEffect(() => {
    store.dispatch('fetchUserPosts')
  }, [])

  return (
    <Page pageContent={false}>
      <NavigationBar active={zmproute.path}/>
      <Box mt='1'>
        <Searchbar
          placeholder='Tìm sản phẩm'
          searchContainer='.virtual-list'
          searchItem='li'
          searchIn='.item-title'
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
          {loading ?
            <Box m={0} px={4} pb={2}>
              <Row gap="gap_4" className="mt-4">
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
              </Row>
            </Box> :
            <Box style={{marginBottom: "150px"}}>
              <Card inset>
                {userPosts.filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj))
                  return o.status === "active";
                }).map((item, index) => (
                  <PostItem key={index}
                            product={{
                              images: item.images,
                              price: item.price,
                              title: item.title,
                            }}
                            marginTop={index === 0 ? '0px' : spacing}/>
                ))}
              </Card>
            </Box>
          }
        </Tab>
        <Tab id="tab-2" className="page-content">
          {loading ?
            <Box m={0} px={4} pb={2}>
              <Row gap="gap_4" className="mt-4">
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
              </Row>
            </Box> :
            <Box style={{marginBottom: "150px"}}>
              <Card inset>
                {userPosts.filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj))
                  return o.status !== "active";
                }).map((item, index) => (
                  <PostItem key={index}
                            product={{
                              images: item.images,
                              price: item.price,
                              title: item.title,
                            }}
                            marginTop={index === 0 ? '0px' : spacing}
                            sold
                  />
                ))}
              </Card>
            </Box>
          }
        </Tab>
      </Tabs>
    </Page>
  )
}
export default managePostPage