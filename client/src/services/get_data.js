import products from "../data/products.json";
import users from "../data/users.json";
import subCategories from "../data/subCategories.json";

export const getFakeProducts = () => {
  return products;
};

export const getFakeUsers = () => {
  return users;
};

export const getSubCategories = (category) => {
  return subCategories[category];
};