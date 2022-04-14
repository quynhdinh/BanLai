import products from "../data/products.json";
import users from "../data/users.json";
import electronicCategories from "../data/electronic-categories.json";
import householdCategories from "../data/household-categories.json";

export const getFakeProducts = () => {
  return products;
};

export const getFakeUsers = () => {
  return users;
};

export const getElectronicCategories = () => {
  return electronicCategories;
};

export const getHouseholeCategories = () => {
  return householdCategories;
};
