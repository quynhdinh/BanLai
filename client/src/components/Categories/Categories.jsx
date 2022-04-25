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
import HotItem from "./HotItem"
import store from "../../store";

const Categories = () => {
    const electronicItems = useStore('electronicItems')
    useEffect(() => {
        store.dispatch('fetchElectronicItems')
    }, [])
    const houseItems = useStore('houseItems')
    useEffect(() => {
        store.dispatch('fetchHouseItems')
    }, [])
    return (
        <Box ml={0} mr={0}>
            <HotItem category="Thiết bị điện tử" products={electronicItems} index={0} paddingBot={1}/>
            <HotItem category="Đồ gia dụng và nội thất" products={houseItems} index={1} paddingBot={1}/>
        </Box>
    )
}

export default Categories
