import React from "react"
import {Box, Title, zmp, Button, Row, Col} from "zmp-framework/react"
import Category from "./Category"

const HotItem = ({category, products, index, paddingBot}) => {
    const zmproute = zmp.views.main.router

    function viewAll() {
        switch (index) {
            case 0:
                zmproute.navigate('/electronic-list');
                break;
            case 1:
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
                <Box className="product-row" >
                    <Row style={{ width: `calc(${products.length * 80}vw - ${products.length * 20}px + ${(products.length - 1) * 8}px)` }}>
                        {products.map(product => <Col key={product._id} className="product-column">
                            <Category product={product} />
                        </Col>)}
                    </Row>
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
                        onClick={viewAll}
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
