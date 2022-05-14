import products from "../data/products.json";
import users from "../data/users.json";
import subCategories from "../data/subCategories.json";
import locations from "../data/locations.json";

export const getFakeProducts = () => {
  return products;
};

export const getFakeUsers = () => {
  return users;
};

export const getSubCategories = (category) => {
  return subCategories[category];
};

export const getCities = () => {
  return Object.keys(locations)
};

export const getDistricts = (city) => {
  return locations[city]
};

export const getLocation = (category) => {
  return subCategories[category];
};