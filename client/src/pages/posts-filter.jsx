import React, {useState} from 'react';
import {Page, Title, Box, Range, Searchbar, Button} from 'zmp-framework/react';
import NavbarBack from '../components/navbar-back';
import {Select} from "../components/Input";
import {getCities, getDistricts} from "../services/data";

export default () => {
  const [districtOptions, setDistrictOptions] = useState(getDistricts("Hồ Chí Minh"));
  const handleChangeDistrictList = (e) => {
    setDistrictOptions(getDistricts(e.target.value));
  };
  return (
    <Page name="posts-filter">
      <NavbarBack title="Tìm kiếm" linkLeft={"/electronic-list"}/>
      <Searchbar
        disableButtonText="Cancel"
        placeholder="Từ khóa"
        clearButton={true}
      />
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
      <Select
        label="Tình trạng sản phẩm"
        compulsory
        option={["Đã qua sử dụng", "Còn mới", "Còn bảo hành"]}
      />
      <Select
        label="Tỉnh/Thành phố"
        compulsory
        onChange={handleChangeDistrictList}
        option={getCities()}
      />
      <Select
        label="Quận/Huyện"
        compulsory
        option={districtOptions}
      />
      <Button onClick={handleSearchButton} type="submit" typeName="primary" large responsive>
        Tìm kiếm
      </Button>
    </Page>
  )
};
