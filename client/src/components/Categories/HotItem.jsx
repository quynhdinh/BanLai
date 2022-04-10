import React, {useEffect, useRef, useState} from "react"
import {
    Box,
    useStore,
    Swiper,
    SwiperSlide,
    Title,
    Text
} from "zmp-framework/react"

import Category from "./Category"

const HotItem = ({category, paddingBot}) => {
    const products = useStore('products')
    return (
        <Box m={0}
             pb={paddingBot}
        >
            <Box flex
                 ml={4}
                 flexDirection='column'
            >
                <Box m={0} style={{flex: 1}}>
                    <Title
                        bold
                    >
                        {category}
                    </Title>
                </Box>
                <Box m={0} style={{flex: 2}}>
                    <Swiper
                        spaceBetween={7}
                        slidesPerView={1.2}>
                        {products.map((product, index) => (
                            <SwiperSlide key={product.id}>
                                <Category product={product}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Box>
        </Box>
    )
}

export default HotItem;
