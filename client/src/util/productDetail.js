export const getProductDetailTitle = (title) => {
  if (title === "manufacturer") {
    return "Hãng";
  } else if (title === "color") {
    return "Màu sắc";
  } else if (title === "storage") {
    return "Dung lượng";
  } else if (title === "screen") {
    return "Màn hình";
  } else if (title === "volume") {
    return "Dung tích";
  } else if (title === "coolingCapacity") {
    return "Công suất";
  } else if (title === "door") {
    return "Loại cửa";
  } else if (title === "washingCapacity") {
    return "Khối lượng giặt";
  } else return title;
};
