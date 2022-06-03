import React, {useEffect, useState} from "react";
import {Box, Page, Searchbar, Tab, useStore, zmp} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import store from "../store";
import Category from "../components/Categories/Category";
import {LoadingVertical} from "../components/loading";

export default () => {

  function postFilter() {
    zmp.views.current.router.navigate("/posts-filter");
  }

  const [keyword, setKeyword] = useState('')
  const loading = useStore("loadingFlag");
  const posts = useStore('viewingPostsList')
  useEffect(() => {
    const zmproute = zmp.views.main.router.currentRoute;
    if (zmproute.query.index === "0") {
      store.dispatch("fetchElectronicItems")
    }
    if (zmproute.query.index === "1") {
      store.dispatch("fetchHouseItems")
    }
  }, [])
  return (
    <Page pageContent={false}
          name="posts-list"
    >
      <NavigationBar/>
      <Box className="inquiry" mt={1}>
        <div className="flex-1" onClick={postFilter}>
          <Searchbar className="discount-searchbar" value={keyword}
                     onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                     clearButton onSearchbarClear={() => setKeyword('')}/>
        </div>
      </Box>
      <Tab className="page-content">
        {
          loading ? <LoadingVertical/> :
            <Box>
              <div style={{
                marginBottom: "150px",
              }}>
                {posts.map((item, index) => (
                  <Category key={index} product={item} border/>
                ))}
              </div>
            </Box>
        }
      </Tab>
    </Page>
  )
}