import subCategories from "../data/subCategories.json";
import locations from "../data/locations.json";
import hints from "../data/input-hints.json";
import subCategoriesDetails from "../data/subCategoriesDetails.json";

export const getSubCategories = (category) => {
  return subCategories[category];
};

export const getCities = () => {
  return Object.keys(locations);
};

export const getDistricts = (city) => {
  return locations[city];
};

export const getLocation = (category) => {
  return subCategories[category];
};

export const getHints = (hint) => {
  return hints[hint];
};

export const getSubCategoriesDetails = (details) => {
  return subCategoriesDetails[details];
};

export const uploadImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "BanLai");
  data.append("cloud_name", "BanLai");
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/BanLai/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await response.json();
    return {
      url: json.secure_url,
    };
  } catch (error) {
    console.log("Error when upload file to Cloudinary: ", error);
  }
};
