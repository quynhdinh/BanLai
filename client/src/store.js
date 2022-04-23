import { createStore } from "zmp-core/lite";
import { getAccessToken } from "./services/zalo";
import { loadUserFromCache } from "./services/storage";
import { getCurrentUser, login } from "./services/auth";
import { getFakeUsers, getFakeProducts } from "./services/fake_data";
import {getMessagesByType} from "./services/message";

const store = createStore({
  state: {
    jwt: null,
    loadingCategories: false,
    buyMessages: [],
    sellMessages: [],
    loadingProducts: true,
    loadingProducts1: true,
    categories: [
      [1, "Technology"],
      [2, "Technology"],
      [3, "Technology"],
      [4, "Technology"],
      [5, "Technology"],
    ],
    u: null,
    user: getFakeUsers(),
    products: getFakeProducts(),
  },
  getters: {
    categories({ state }) {
      return state.categories;
    },
    loadingCategories({ state }) {
      return state.loadingCategories;
    },
    loadingProducts({ state }) {
      return state.loadingProducts
    },
    loadingProducts1({ state }) {
      return state.loadingProducts1
    },
    sellMessages({ state }) {
      return state.sellMessages
    },
    buyMessages({ state }) {
      return state.buyMessages
    },
    u({ state }) {
      return state.u;
    },
    user({ state }) {
      return state.user;
    },
    products({ state }) {
      return state.products;
    },
  },
  actions: {
    setUser({ state }, data) {
      state.user = { ...state.user, ...data };
    },
    setU({ state }, u) {
      state.u = {
        displayName: u.name,
        avatar: u.picture,
        createdAt: u.createdAt,
        online: true,
      };
    },
    setJwt({ state }, jwt) {
      state.jwt = jwt;
    },
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
    async login({ dispatch }) {
      const cachedUser = await loadUserFromCache();
      if (cachedUser) {
        dispatch("setUser", cachedUser);
      }
      const token = await getAccessToken();
      const success = await login(token);
      if (success) {
        const user = await getCurrentUser();
        if (user) {
          dispatch("setUser", user);
        }
      }
    },
    async fetchMessagesByType({ state }) {
      state.loadingProducts = true
      const buyMessages = await getMessagesByType(0)
      if (buyMessages.length) {
        state.buyMessages = buyMessages
      }
      state.loadingProducts = false
      const sellMessages = await getMessagesByType(1)
      if (sellMessages.length) {
        state.sellMessages = sellMessages
      }
      state.loadingProducts1 = false
    },
  },
  addProduct({ state }, product) {
    state.products = [...state.products, product];
  },
});

export default store;
