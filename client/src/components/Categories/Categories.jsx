import React, {useEffect, useRef, useState} from "react"
import {
    Box,
    useStore,
    Swiper,
    SwiperSlide,
    Title,
    Text
} from "zmp-framework/react"
// import "swiper/css"

import Category from "./Category"
import HotItem from "./HotItem"

const Categories = () => {
    const loading = useStore("loadingCategories")
    return (
        <Box ml={0} mr={0}>
            <HotItem category="Đồ điện tử" index={0} paddingBot={1}/>
            <HotItem category="Đồ gia dụng" index={1} paddingBot={1}/>
            <HotItem category="Đồ nội thất" index={2} paddingBot={10}/>
        </Box>
    )
}

export default Categories
