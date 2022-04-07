import React from 'react';
import {
    Page,
    Card,
    SkeletonImage,
    SkeletonText,
    Box
} from 'zmp-framework/react';

const Category = ({product, category}) => {

    return (
        <Card inset title={category}>
            <Box flex flexDirection='row'>
                <Box>
                    <SkeletonImage
                        tag='div'
                        src={product.image_url}
                        showIcon
                        width={100}
                        height={100}
                    />
                </Box>
                <Box style={{flex: 1, marginLeft: '8px'}}>
                    <SkeletonText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor
                    </SkeletonText>
                </Box>
            </Box>
        </Card>
    )
}
export default Category
