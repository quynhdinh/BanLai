import React, { useState } from "react";
import { Page, Button, Box, zmp, Title, useStore } from "zmp-framework/react";
import NavbarBack from "../components/navbar-back";
import { useForm } from "react-hook-form";
import CustomInput, { Select } from "../components/Input";
import TextArea from "../components/Input/text-area";
import { city, HaNoi, HoChiMinh } from "../data/city-district";
import { titleHints, priceHints } from "../data/input-hint";
import {
  airConditionerCoolingCapacity,
  airConditionerManufacturer,
  fridgeManufacturer,
  fridgeVolume,
  laptopCPU,
  laptopGPU,
  laptopHHD,
  laptopManufacturer,
  laptopRAM,
  laptopScreen,
  phoneColor,
  phoneManufacturer,
  phoneStorage,
  tabletManufacturer,
  tabletScreen,
  tabletSIM,
  tabletStorage,
  televisionManufacturer,
  washingMachineCapacity,
  washingMachineDoor,
  washingMachineManufacturer,
} from "../data/subcategory-details";
// import { serialize } from "object-to-formdata";

import CategoryBox from "../components/category-box";
function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isObject(value) {
  return value === Object(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isDate(value) {
  return value instanceof Date;
}

function isBlob(value, isReactNative) {
  return isReactNative
    ? isObject(value) && !isUndefined(value.uri)
    : isObject(value) &&
        typeof value.size === "number" &&
        typeof value.type === "string" &&
        typeof value.slice === "function";
}

function isFile(value, isReactNative) {
  return (
    isBlob(value, isReactNative) &&
    typeof value.name === "string" &&
    (isObject(value.lastModifiedDate) || typeof value.lastModified === "number")
  );
}

function initCfg(value) {
  return isUndefined(value) ? false : value;
}

function serialize(obj, cfg, fd, pre) {
  cfg = cfg || {};
  fd = fd || new FormData();

  cfg.indices = initCfg(cfg.indices);
  cfg.nullsAsUndefineds = initCfg(cfg.nullsAsUndefineds);
  cfg.booleansAsIntegers = initCfg(cfg.booleansAsIntegers);
  cfg.allowEmptyArrays = initCfg(cfg.allowEmptyArrays);
  cfg.noFilesWithArrayNotation = initCfg(cfg.noFilesWithArrayNotation);
  cfg.dotsForObjectNotation = initCfg(cfg.dotsForObjectNotation);

  const isReactNative = typeof fd.getParts === "function";

  if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    if (!cfg.nullsAsUndefineds) {
      fd.append(pre, "");
    }
  } else if (isBoolean(obj)) {
    if (cfg.booleansAsIntegers) {
      fd.append(pre, obj ? 1 : 0);
    } else {
      fd.append(pre, obj);
    }
  } else if (isArray(obj)) {
    if (obj.length) {
      obj.forEach((value, index) => {
        let key = pre + "[" + (cfg.indices ? index : "") + "]";

        if (cfg.noFilesWithArrayNotation && isFile(value, isReactNative)) {
          key = pre;
        }

        serialize(value, cfg, fd, key);
      });
    } else if (cfg.allowEmptyArrays) {
      fd.append(pre + "[]", "");
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isBlob(obj, isReactNative)) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf("[]") === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? pre : prop;
      console.log("pre", pre);
      console.log("prop", prop);

      serialize(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, obj);
  }

  return fd;
}

const createPostPage = () => {
  const user = useStore("u");
  const zmproute = zmp.views.main.router.currentRoute;
  const [districtOptions, setDistrictOptions] = useState(HoChiMinh);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data = {
      ...data,
      category: zmproute.query?.category,
      subCategory: zmproute.query?.subcategory,
      zaloId: "aaaaaaaaaaaaa",
    };
    var formData = serialize(data);
  
    // store.dispatch("createPost", { formData });
    fetch("http://zmp-banlai.herokuapp.com/api/posts/", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
    }).then((res) => {
      console.log(res);
    });
  };

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
          <input {...register("images")} type="file" multiple></input>
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
          {zmproute.query?.subcategory === "Điện thoại" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={phoneManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.color")}
                label="Màu sắc"
                option={phoneColor}
              />
              <Select
                {...register("productDetails.storage")}
                label="Dung lượng"
                option={phoneStorage}
              />
            </>
          )}

          {zmproute.query?.subcategory === "Máy tính bảng" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={tabletManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.SIM")}
                label="Hỗ trợ thẻ sim"
                option={tabletSIM}
              />
              <Select
                {...register("productDetails.storage")}
                label="Dung lượng"
                option={tabletStorage}
              />
              <Select
                {...register("productDetails.screen")}
                label="Kích thước màn hình"
                option={tabletScreen}
              />
            </>
          )}
          {zmproute.query?.subcategory === "Laptop" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={laptopManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.CPU")}
                label="CPU"
                option={laptopCPU}
              />
              <Select
                {...register("productDetails.RAM")}
                label="Dung lượng RAM"
                option={laptopRAM}
              />
              <Select
                {...register("productDetails.HHD")}
                label="Ổ cứng"
                option={laptopHHD}
              />
              <Select
                {...register("productDetails.GPU")}
                label="Card đồ họa"
                option={laptopGPU}
              />
              <Select
                {...register("productDetails.screen")}
                label="Kích thước màn hình"
                option={laptopScreen}
              />
            </>
          )}
          {zmproute.query?.subcategory === "Tivi" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={televisionManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
            </>
          )}

          {zmproute.query?.subcategory === "Tủ lạnh" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={fridgeManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.volume")}
                label="Dung tích"
                option={fridgeVolume}
              />
            </>
          )}
          {zmproute.query?.subcategory === "Điều hòa" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={airConditionerManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.coolingCapacity")}
                label="Công suất làm lạnh"
                option={airConditionerCoolingCapacity}
              />
            </>
          )}
          {zmproute.query?.subcategory === "Máy giặt" && (
            <>
              <Title bold>Thông tin chi tiết</Title>
              <Select
                {...register("productDetails.manufacturer", {
                  required: "Vui lòng chọn hãng sản xuất",
                })}
                label="Hãng sản xuất"
                compulsory
                option={washingMachineManufacturer}
                errorMessage={
                  errors?.productDetails?.manufacturer &&
                  errors?.productDetails?.manufacturer.message
                }
              />
              <Select
                {...register("productDetails.coolingCapacity")}
                label="Khối lượng giặt"
                option={washingMachineCapacity}
              />
              <Select
                {...register("productDetails.coolingCapacity")}
                label="Loại cửa"
                option={washingMachineDoor}
              />
            </>
          )}
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
