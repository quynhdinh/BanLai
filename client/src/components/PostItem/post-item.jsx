import React from 'react';
import {Avatar, Button, Text, Title} from 'zmp-framework/react';
import {moneyFormat} from "../../util/number";
const PostItem = ({product, marginTop}) => {
    return (
        <div style={{display: 'flex', width: '100%', marginTop: marginTop}}>
            <Avatar src={product.images[0]}/>
            <div style={{marginLeft: 16}}>
                <Title size='xsmall' style={{marginBottom: 0}}>{product.title}</Title>
                <Text size = 'xsmall' style={{marginTop:3, color: 'red'}}>{moneyFormat(product.price)}</Text>
                <Button
                    className="filter-button"
                    typeName="primary"
                    small>Đã bán/Ẩn bài</Button>
            </div>
        </div>
    )
};

PostItem.displayName = 'zmp-post-card'

export default PostItem;
