import React, {useEffect} from "react"
import {
  Page, useStore, Tabbar, Link, Tabs, Tab, Card, Box, Row, Col, SkeletonBlock
} from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar"
import MessageItem from "../components/MessageItem/message-item";
import store from "../store";

const messagePage = ({zmproute}) => {
  const messages = useStore('messages')
  const loading = useStore('loadingFlag')
  const spacing = '20px'

  useEffect(() => {
    store.dispatch('fetchMessages')
  }, [])

  return (
    <Page pageContent={false}>
      <NavigationBar active={zmproute.path}/>
      <Tabbar top>
        <Link tabLink="#tab-1" tabLinkActive>
          Tôi mua
        </Link>
        <Link tabLink="#tab-2">Tôi bán</Link>
      </Tabbar>
      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
          {loading ?
            <Box m={0} px={4} pb={2}>
              <Row gap="gap_4" className="mt-4">
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
                <Col><SkeletonBlock effect="wave" height="200px"/></Col>
              </Row>
            </Box> :
            <Box style={{marginBottom: "50px"}}>
              <Card inset>
                {messages.filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj))
                  return o.type === "0";
                }).map((item, index) => (
                  <MessageItem key={index} product={item} marginTop={index === 0 ? '0px' : spacing}/>
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
            <Box>
              <Card inset>
                {messages.filter(function (obj) {
                  const o = JSON.parse(JSON.stringify(obj))
                  return o.type === "1";
                }).map((item, index) => (
                  <MessageItem key={index} product={item} marginTop={index === 0 ? '0px' : spacing}/>
                ))}
              </Card>
            </Box>
          }
        </Tab>
      </Tabs>
    </Page>
  )
}

export default messagePage
