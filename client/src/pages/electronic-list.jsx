import React, {useEffect, useState} from "react";
import {Box, Page, Searchbar, Tab, useStore,} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import PostFilter from "../components/HomeMisc/PostFilter";
import store from "../store";
import Category from "../components/Categories/Category";
import Loading from "../components/Loading";

const electronicListPage = () => {
  const [keyword, setKeyword] = useState('')
  const loading = useStore("loadingFlag");
  const electronicItems = useStore('electronicItems')
  useEffect(() => {
    store.dispatch('fetchElectronicItems')
  }, [])
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
        </div>
      </Box>
      <Tab className="page-content">
        {
          loading ? <Loading/> :
            <Box>
              <div style={{
                marginBottom: "150px",
              }}>
                {electronicItems.map((item, index) => (
                  <Category key={index} product={item} border/>
                ))}
              </div>
            </Box>
        }
      </Tab>
    </Page>
  )
}

export default electronicListPage;