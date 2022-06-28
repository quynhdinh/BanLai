import React, {useEffect, useRef, useState} from "react";
import {Box, Page, Searchbar, Sheet, Tab, useStore, zmp} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import store from "../store";
import Category from "../components/Categories/Category";
import {LoadingVertical} from "../components/loading";
import SearchBox from "../components/search-box";

export default () => {
  const [customSheetOpened, setCustomSheetOpened] = useState(false);
  const sheet = useRef(null);

  const [keyword, setKeyword] = useState('')
  const loading = useStore("loadingFlag");
  const posts = useStore('viewingPostsList')
  let categoryIndex = zmp.views.main.router.currentRoute.query.index;

  useEffect(() => {
    const zmproute = zmp.views.main.router.currentRoute;
    categoryIndex = zmproute.query.index;
    if (parseInt(zmproute.query.search) !== 1) {
      store.dispatch("fetchAllItems", zmproute.query.index);
    }
  }, [])

  return (
    <Page pageContent={false}
          name="posts-list"
    >
      <NavigationBar/>
      <Box className="inquiry" mt={1}>

        <div className="flex-1" onClick={() => setCustomSheetOpened(true)}>
          <Searchbar className="discount-searchbar" value={keyword}
                     onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm sản phẩm"
                     clearButton onSearchbarClear={() => setKeyword('')}/>
        </div>

        <Sheet
          className="has-fixed-action product-order"
          ref={sheet}
          swipeToClose
          opened={customSheetOpened}
          backdrop
          onSheetClosed={() => setCustomSheetOpened(false)}
          closeButton
          title= "Tìm kiếm"
        >
          <SearchBox categoryIndex={categoryIndex} sheet={sheet}/>
        </Sheet>
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