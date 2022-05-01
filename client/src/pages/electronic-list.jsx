import React, {useEffect, useState} from "react";
import {
  Avatar,
  Box, Card, Col,
  List, ListItem,
  Page, Searchbar, Tab, Tabs,
  useStore,
  zmp,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import NavigationBar from "../components/NavigationBar";
import PostFilter from "../components/HomeMisc/PostFilter";
import PostItem from "../components/PostItem";
import store from "../store";
import Category from "../components/Categories/Category";

const electronicListPage = () => {
  const [keyword, setKeyword] = useState('')
  const electronicItems = useStore('electronicItems')
  useEffect(() => {
    store.dispatch('fetchElectronicItems')
  }, [])
  const spacing = '20px'
  return (
    <Page pageContent={false}
          name="electronic-list"
    >
      <NavigationBar/>
      <Box className="inquiry" mt={1}>
        <div className="flex-1 ">
          <Searchbar className="discount-searchbar" value={keyword}
                     onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                     clearButton onSearchbarClear={() => setKeyword('')}/>
          <PostFilter>{"Thiết bị điện tử"}</PostFilter>
          {/*<PostFilter>{"Đã qua sử dụng"}</PostFilter>*/}
        </div>
      </Box>
      <Tab className="page-content">
        <Box class-name="post-list">
          <div style={{
            marginBottom: "150px",
          }}>
            {electronicItems.map((item, index) => (
              <Category product={item}/>
            ))}
          </div>
        </Box>
      </Tab>
    </Page>
  )
}

export default electronicListPage;