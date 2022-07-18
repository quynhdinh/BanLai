/**
 * It takes a english word and return a corresponding word
 * @param title - The title of the product detail.
 * @returns A function that returns a string.
 */
export const getProductDetailTitle = (title) => {
  if (title === "manufacturer") {
    return "Hãng sản xuất";
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
