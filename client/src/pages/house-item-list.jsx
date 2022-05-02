import React, {useEffect, useState} from "react";
import {
  Box,
  List, ListItem,
  Page, Searchbar, Tab,
  useStore,
  zmp,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import NavigationBar from "../components/NavigationBar";
import PostFilter from "../components/HomeMisc/PostFilter";
import Category from "../components/Categories/Category";
import store from "../store";

const houseItemListPage = () => {
  const [keyword, setKeyword] = useState('')
    const houseItems = useStore('houseItems')
    useEffect(() => {
        store.dispatch('fetchHouseItems')
    }, [])
  return (
    <Page pageContent={false}
          name="house-item-list"
    >
      <NavigationBar/>
      <Box className="inquiry" mt={1}>
        <div className="flex-1 ">
          <Searchbar className="discount-searchbar" value={keyword}
                     onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                     clearButton onSearchbarClear={() => setKeyword('')}/>
          <PostFilter>{"Đồ gia dụng"}</PostFilter>
          {/*<PostFilter>{"Đã qua sử dụng"}</PostFilter>*/}
        </div>
      </Box>
      <Tab className="page-content">
        <Box>
          <div style={{
            marginBottom: "150px",
          }}>
            {houseItems.map((item, index) => (
              <Category product={item}/>
            ))}
          </div>
        </Box>
      </Tab>
    </Page>
  )
}

export default houseItemListPage;