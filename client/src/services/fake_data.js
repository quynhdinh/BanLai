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

export const getFakeElectronicCategories = () => {
  return electronicCategories;
};

export const getFakeHouseholeCategories = () => {
  return householdCategories;
};
