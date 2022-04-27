import React, {useEffect} from 'react';
import {Page, Box, Tabbar, Link, Tabs, Tab, useStore, SkeletonText, Row, Col, SkeletonBlock} from 'zmp-framework/react';
import NavbarBack from "../components/navbar-back";
import {Category} from "../components/Categories";
import store from "../store";

const managePostPage = ({zmproute}) => {
  const products = useStore('products')
  const careList = useStore('careList')
  const loading = useStore('loadingFlag')

  useEffect(() => {
    store.dispatch('fetchCareList')
    console.log("careList: " + JSON.stringify(careList))
  }, [])
  return (
    <Page className='page-box page-with-navbar'>
      <NavbarBack
        title="Danh sách tin đã lưu"
        linkLeft={'/account/'}
      />
      {loading ?
        <Box m={0} px={4} pb={2}>
          <Row gap="gap_4" className="mt-4">
            <Col><SkeletonBlock effect="wave" height="200px"/></Col>
            <Col><SkeletonBlock effect="wave" height="200px"/></Col>
          </Row>
        </Box> :
          products.map((item, index) => (
            <Category key={index} product={item} border/>
          ))
      }
    </Page>
  )
}
export default managePostPage