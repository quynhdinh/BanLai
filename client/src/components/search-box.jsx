import React, { useEffect, useState } from "react";
import { Button, Searchbar, Title, zmp } from "zmp-framework/react";
import { Select } from "./Input";
import { getCities, getDistricts, getSubCategories } from "../services/data";
import { Controller, useForm } from "react-hook-form";
import store from "../store";

export default ({ categoryIndex, sheet }) => {
  const [districtOptions, setDistrictOptions] = useState(
    getDistricts("Hồ Chí Minh")
  );
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const handleChangeDistrictList = (e) => {
    setDistrictOptions(getDistricts(e.target.value));
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (parseInt(categoryIndex) === 0) {
      setSubCategoriesList(getSubCategories("Thiết bị điện tử"));
    } else setSubCategoriesList(getSubCategories("Đồ gia dụng, nội thất"));
  });

  const onSubmit = async (data) => {
    console.log("before search data:" + JSON.stringify(data));
    const condition = JSON.stringify(data);
    await store.dispatch("fetchFilteredPosts", { condition });
    if (sheet.current) {
      sheet.current.zmpSheet().close();
    }
    zmp.views.current.router.navigate({
      path: "/posts-list",
      query: { search: 1, index: categoryIndex },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="keyword"
        control={control}
        render={({ field }) => (
          <Searchbar
            {...field}
            disableButtonText="Cancel"
            placeholder="Từ khóa"
            clearButton={true}
          />
        )}
      />
      <Select
        {...register("subCategory")}
        label="Danh mục sản phẩm"
        option={subCategoriesList}
      />
      <Title>Khoảng Giá</Title>
      <Select
        {...register("condition")}
        label="Tình trạng sản phẩm"
        option={["Đã qua sử dụng", "Còn mới", "Còn bảo hành"]}
      />
      <Select
        {...register("city")}
        label="Tỉnh/Thành phố"
        onChange={handleChangeDistrictList}
        option={getCities()}
      />
      <Select
        {...register("district")}
        label="Quận/Huyện"
        option={districtOptions}
      />
      <Button type="submit" typeName="primary" large responsive>
        Tìm kiếm
      </Button>
    </form>
  );
};
