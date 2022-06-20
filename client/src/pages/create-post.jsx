import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Navbar,
  Page,
  Title,
  ToastPreloader,
  useStore,
  zmp,
} from "zmp-framework/react";
import { useForm } from "react-hook-form";
import CustomInput, { ImageUploader, Select } from "../components/Input";
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
  const postDetails = useStore("postDetails");
  const [displayImages, setDisplayImages] = useState([]);
  const [files, setUploadFile] = useState([]);

  const subCategoriesDetails = getSubCategoriesDetails(
    zmproute.query?.subcategory
  );
  const [districtOptions, setDistrictOptions] = useState(
    getDistricts("Hồ Chí Minh")
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const zmprouter = zmp.views.main.router;
    if (zmproute.query?.mode === "1") {
      data = {
        ...data,
        category: postDetails.category,
        subCategory: postDetails.subCategory,
        status: postDetails.status,
      };
      data = {
        data: data,
        _id: postDetails._id,
      };
      await store.dispatch("editPost", { data });
      zmprouter.navigate(
        {
          path: "/manage-post",
        },
        { transition: "zmp-push" }
      );
    } else {
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
    }
  };
  useEffect(() => {
    if (zmproute.query?.mode === "1") {
      setDistrictOptions(getDistricts(postDetails.city));
      setDisplayImages(postDetails.images);
      reset({
        images: postDetails.images,
        title: postDetails.title,
        price: postDetails.price,
        condition: postDetails.condition,
        description: postDetails.description,
        productDetails: postDetails.productDetails,
        city: postDetails.city,
        district: postDetails.district,
      });
    }
  }, [postDetails]);
  const imagesRegister = register("images", {
    // required: "Vui lòng chọn ảnh",
  });
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const displayArray = selectedFilesArray.map((file) => {
      return { url: URL.createObjectURL(file) };
    });
    setUploadFile((previousFiles) => previousFiles.concat(selectedFilesArray));
    setDisplayImages((previousImages) => previousImages.concat(displayArray));
  };

  //zmproute.query.mode === 1 : chế độ chỉnh sửa bài viết
  return (
    <Page name="create-post">
      <Navbar title="Tạo tin đăng" backLink="Back" />
      <ToastPreloader visible={loading} text="Đăng bài viết" />
      <Box px={4}>
        <CategoryBox
          category={zmproute.query?.category}
          subcategory={zmproute.query?.subcategory}
        />
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Title bold>Hình ảnh và mô tả</Title>
          <ImageUploader
            {...imagesRegister}
            displayImages={displayImages}
            setDisplayImages={setDisplayImages}
            setUploadFile={setUploadFile}
            label="Thêm ảnh rao bán (tối đa 10 ảnh)"
            compulsory
            errorMessage={errors?.images && errors?.images.message}
            onChange={(e) => {
              imagesRegister.onChange(e);
              onSelectFile(e);
            }}
          />

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
                  compulsory={item === "manufacturer"}
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
            {zmproute.query?.mode === "1"
              ? "Cập nhật tin đăng"
              : "Đăng tin rao bán"}
          </Button>
        </form>
      </Box>
    </Page>
  );
};
