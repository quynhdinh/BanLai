import React, {useEffect, useRef, useState} from "react"
import {Box, useStore, Swiper, SwiperSlide, Text} from "zmp-framework/react"
// import "swiper/css"

import Category from "./Category"

const Categories = () => {
    const loading = useStore("loadingCategories")
    const products = useStore('products')
    return (
        <Box ml={0} mr={0}>
            <Swiper>
                {products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        <Category product={product} category="Đồ điện tử"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper>
                {products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        <Category product={product} category="Đồ gia dụng"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper>
                {products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        <Category product={product} category="Đồ nội thất"/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
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
