import React, { useEffect, useRef, useState } from "react"
import {Box, useStore, Swiper, SwiperSlide, Text} from "zmp-framework/react"
// import "swiper/css"

import Category from "./Category"

const url = "https://tophinhanhdep.com/wp-content/uploads/2021/10/Beautiful-Scenery-Wallpapers.jpg"
const url2 = 'https://www.notebookcheck.net/uploads/tx_nbc2/4_to_3_Teaser_Apple_iPhone_13_Pro.jpg'
const Categories = () => {
  const loading = useStore("loadingCategories")
  const categories = useStore("categories")
  // if (true) {
  //   return (
  //     <Box m={0} className="categories">
  //       <Category loading />
  //     </Box>
  //   )
  // }
  return (

      <Swiper pagination navigation scrollbar>
        <SwiperSlide>
          <img src = {url}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={url2}/>
        </SwiperSlide>
        <SwiperSlide>
          <Text>fsdfd</Text>
        </SwiperSlide>
      </Swiper>
    // <Swiper slidesPerView="auto" className="categories">
    //   {categories.map((category, index) => (
    //     // <SwiperSlide key={category.id}>
    //       <Category categoryName={category.name} thumbnail={category.thumbnail} />
    //     // </SwiperSlide>
    //   ))}
    // </Swiper>
  )
}

export default Categories
