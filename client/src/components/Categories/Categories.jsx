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
            <HotItem category="Đồ điện tử" paddingBot={1}/>
            <HotItem category="Đồ gia dụng" paddingBot={1}/>
            <HotItem category="Đồ nội thất" paddingBot={10}/>
        </Box>
    )
}

export default Categories
