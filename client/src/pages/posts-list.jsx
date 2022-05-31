import React, {useEffect, useState} from "react";
import {Box, Page, Searchbar, Tab, useStore, zmp} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import store from "../store";
import Category from "../components/Categories/Category";
import {LoadingVertical} from "../components/loading";

export default () => {
  const zmproute = zmp.views.main.router;

  function postFilter() {
    console.log("on click filter")
    zmproute.navigate("/posts-filter");
  }

  const [keyword, setKeyword] = useState('')
  const loading = useStore("loadingFlag");
  const posts1 = useStore('viewingPostsList')
  const posts = Object.entries(posts1)
  console.log("posts:"+ posts)
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