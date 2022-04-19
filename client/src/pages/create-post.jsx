import React, { useState } from "react";
import { Page, Button, Box, zmp, Title } from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { useForm } from "react-hook-form";
import CustomInput, { Select } from "../components/Input";
import TextArea from "../components/Input/text-area";
import { city, HaNoi, HoChiMinh } from "../data/city-district";
import { titleHints, priceHints } from "../data/input-hint";
import CategoryBox from "../components/category-box";

const createPostPage = () => {
  const zmproute = zmp.views.main.router.currentRoute;
  const [districtOptions, setDistrictOptions] = useState(HoChiMinh);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChangeDistrictList = (e) => {
    if (e.target.value === "Hà Nội") setDistrictOptions(HaNoi);
    else setDistrictOptions(HoChiMinh);
  };

  return (
    <Page name="create-post">
      <NavbarBack title="Tạo tin đăng" linkLeft={"/choose-subcategory/"} />
      <Box px={4}>
        <CategoryBox
          category={zmproute.query?.category}
          subcategory={zmproute.query?.subcategory}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Title bold>Hình ảnh và mô tả</Title>
          <input {...register("photo")} type="file" multiple></input>
          <Title size="small" style={{}}>
            Thêm ảnh rao bán (tối đa 10 ảnh) *
          </Title>

          <CustomInput
            {...register("title", {
              required: "Vui lòng điền tiêu đề rao bán",
            })}
            placeholder="Nhập tiêu đề rao bán"
            label="Tiêu đề rao bán"
            compulsory
            hintMessage={titleHints}
            errorMessage={errors?.title && errors?.title.message}
          />
          <CustomInput
            {...register("price", { required: "Vui lòng nhập giá rao bán" })}
            placeholder="Nhập giá rao bán"
            label="Giá rao bán"
            compulsory
            hintMessage={priceHints}
            errorMessage={errors?.price && errors?.price.message}
          />
          <Select
            {...register("condition")}
            label="Tình trạng sản phẩm"
            compulsory
            option={["Đã qua sử dụng", "Còn mới", "Còn bảo hành"]}
          />
          <TextArea
            {...register("description")}
            placeholder="Mô tả"
            label="Mô tả sản phẩm"
          />
          <Title bold>Thông tin liên lạc</Title>
          <Select
            {...register("city")}
            label="Tỉnh/Thành phố"
            compulsory
            onChange={handleChangeDistrictList}
            option={city}
          />
          <Select
            {...register("district")}
            label="Quận/Huyện"
            compulsory
            option={districtOptions}
          />
          <Button type="submit" typeName="primary" large responsive>
            Đăng tin rao bán
          </Button>
        </form>
      </Box>
    </Page>
  );
};
export default createPostPage;
