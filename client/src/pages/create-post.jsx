import React, { useState } from "react";
import {
  Box,
  Button,
  Page,
  Title,
  ToastPreloader,
  useStore,
  zmp,
} from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { useForm } from "react-hook-form";
import CustomInput, { Select } from "../components/Input";
import TextArea from "../components/Input/text-area";
import store from "../store";
import CategoryBox from "../components/category-box";
import {
  getCities,
  getDistricts,
  getHints,
  getSubCategoriesDetails,
  uploadImage,
} from "../services/data";
import { getProductDetailTitle } from "../util/productDetail";

export default () => {
  const loading = useStore("loadingFlag");
  const zmproute = zmp.views.main.router.currentRoute;
  const subCategoriesDetails = getSubCategoriesDetails(zmproute.query?.subcategory);

  const [districtOptions, setDistrictOptions] = useState(
    getDistricts("Hồ Chí Minh")
  );
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const zmprouter = zmp.views.main.router;
    const files = getValues("images");
    const images = [];
    for (const file of files) {
      const url = await uploadImage(file);
      images.push(url);
    }
    data = {
      ...data,
      images: images,
      category: zmproute.query?.category,
      subCategory: zmproute.query?.subcategory,
    };
    await store.dispatch("createPost", { data });
    zmprouter.navigate(
      {
        path: "/post-detail",
      },
      { transition: "zmp-push" }
    );
  };

  return (
    <Page name="create-post">
      <NavbarBack title="Tạo tin đăng" linkLeft={"/choose-subcategory/"} />
      <ToastPreloader visible={loading} text="Đăng bài viết" />
      <Box px={4}>
        <CategoryBox
          category={zmproute.query?.category}
          subcategory={zmproute.query?.subcategory}
        />

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Title bold>Hình ảnh và mô tả</Title>
          <input {...register("images")} type="file" multiple />
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
            hintMessage={getHints("title")}
            errorMessage={errors?.title && errors?.title.message}
          />
          <CustomInput
            {...register("price", { required: "Vui lòng nhập giá rao bán" })}
            placeholder="Nhập giá rao bán"
            label="Giá rao bán"
            compulsory
            hintMessage={getHints("price")}
            errorMessage={errors?.price && errors?.price.message}
            pattern="^-?[0-9]\d*\.?\d*$"
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
          {subCategoriesDetails && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              {Object.keys(subCategoriesDetails).map((item, index) => (
                <Select
                  key={index}
                  {...register(
                    "productDetails." + item,
                    item === "manufacturer" && {
                      required: "Vui lòng chọn hãng sản xuất",
                    }
                  )}
                  label={getProductDetailTitle(item)}
                  compulsory={item === "manufacturer" ? true : false}
                  option={subCategoriesDetails[item]}
                  errorMessage={
                    item === "manufacturer" &&
                    errors?.productDetails?.manufacturer &&
                    errors?.productDetails?.manufacturer.message
                  }
                />
              ))}
            </>
          )}

          <Title bold>Thông tin liên lạc</Title>
          <Select
            {...register("city")}
            label="Tỉnh/Thành phố"
            compulsory
            onChange={(e) => {
              setDistrictOptions(getDistricts(e.target.value));
            }}
            option={getCities()}
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
