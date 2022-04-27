import {createStore} from "zmp-core/lite";
import {getAccessToken} from "./services/zalo";
import {loadUserFromCache} from "./services/storage";
import {getCurrentUser, login} from "./services/auth";
import {getFakeProducts, getFakeUsers} from "./services/fake_data";
// import {getMessages} from "./services/message";
import { getPostsByCategory, getPostDetails, createPost } from "./services/post";

const store = createStore({
  state: {
    jwt: null,
    loadingCategories: false,
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
    posts: [],
    electronicItems: [],
    houseItems: [],
    postDetails: [],
  },
  getters: {
    categories({ state }) {
      return state.categories;
    },
    loadingCategories({ state }) {
      return state.loadingCategories;
    },
    posts({ state }) {
      return state.posts;
    },
    postDetails({ state }) {
      return state.postDetails;
    },
    electronicItems({ state }) {
      return state.electronicItems;
    },
    houseItems({ state }) {
      return state.houseItems;
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
    async fetchPosts({ state }, { category }) {
      const posts = await getPostsByCategory(category);
      state.posts = posts;
    },
    async fetchElectronicItems({ state }) {
      const posts = await getPostsByCategory(0);
      state.electronicItems = posts;
    },
    async fetchHouseItems({ state }) {
      const posts = await getPostsByCategory(1);
      state.houseItems = posts;
    },
    async fetchPostDetail({ state }, { id }) {
      const postDetails = await getPostDetails(id);
      state.postDetails = postDetails;
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
    async createPost({ state }, { data }) {
      const response = await createPost(data)
      console.log("here", response);
    },
  },
});

export default store;
