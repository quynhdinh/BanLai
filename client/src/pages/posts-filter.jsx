import React from 'react';
import {Page, Title, Box, Range} from 'zmp-framework/react';
import NavbarBack from '../components/navbar-back';
import {Select} from "../components/Input";

const PostsFilter = () => (
  <Page name="posts-filter">
    <NavbarBack title="Tìm kiếm" linkLeft={"/electronic-list"} />
    <Select
      label="Danh mục sản phẩm"
      compulsory
      option={["Tất cả"]}
    />

    <Title>
      Khoảng Giá
    </Title>
      <Box my='4'>
        <Range
          min={0}
          max={100}
          label={true}
          step={5}
          value={25}
          scale={true}
          scaleSteps={5}
          scaleSubSteps={4}
          onRangeChange={(value) => {
            console.log(value);
          }}
        />
      </Box>
  </Page>
);

export default PostsFilter;
