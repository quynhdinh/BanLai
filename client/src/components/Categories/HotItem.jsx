import React, {useEffect, useRef, useState} from "react"
import {
    Box,
    useStore,
    Swiper,
    SwiperSlide,
    Title,
    Text, zmp, Button
} from "zmp-framework/react"

import Category from "./Category"

const HotItem = ({category, index, paddingBot}) => {
    const products = useStore('products')
    const zmproute = zmp.views.main.router

    function electronicSelect() {
        console.log("on click");
        switch (category) {
            case 'Đồ điện tử':
                console.log("on click");
                zmproute.navigate('/electronic-list');
                break;
            case 'Đồ gia dụng và nội thất':
                zmproute.navigate('/house-item-list');
                break;
        }
    }

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
            <Box ml={0}
                 mt={3}
                 pt={2}
                 flex
                 justifyContent='center'
                 style={{
                     borderTop: "1px #E4E8EC solid",
                     textAlign: 'center',
                 }}
            >
                <Button size='xsmall'
                        onClick={electronicSelect}
                        style={{
                            color: '#0068FF'
                        }}
                >
                    Xem tất cả
                </Button>
            </Box>
        </Box>
    )
}

export default HotItem;
