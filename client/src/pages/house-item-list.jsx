import React, {useEffect, useState} from "react";
import {Box, Searchbar, Page, Tab, useStore,} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import PostFilter from "../components/PostFilter";
import Category from "../components/Categories/Category";
import store from "../store";
import LoadingHorizontal from "../components/loading-horizontal";

export default () => {
  const [keyword, setKeyword] = useState('')
  const houseItems = useStore('houseItems')
  const loading = useStore("loadingFlag");

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
        </div>
      </Box>
      <Tab className="page-content">
        {
          loading ? <LoadingHorizontal/> :
            <Box>
              <div style={{
                marginBottom: "150px",
              }}>
                {houseItems.map((item, index) => (
                  <Category key={index} product={item} border/>
                ))}
              </div>
            </Box>
        }
      </Tab>
    </Page>
  )
}
