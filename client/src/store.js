import {createStore} from "zmp-core/lite";
import {getAccessToken} from "./services/zalo";
import {loadUserFromCache} from "./services/storage";
import {getCurrentUser, login} from "./services/auth";
import {getFakeProducts, getFakeUsers} from "./services/get_data";
import {getMessages} from "./services/message";
import {closePost, createPost, getHottestPosts, getPostDetails, getPostsByCategory, getUserPosts, repostPost} from "./services/post";
import {getCareList} from "./services/care-list";

const store = createStore({
  state: {
    jwt: null,
    loadingCategories: false,
    messages: [],
    loadingFlag: true,
    u: null,
    user: getFakeUsers(),
    products: getFakeProducts(),
    posts: [],
    userPosts: [],
    electronicItems: [],
    houseItems: [],
    hottestElectronicItems: [],
    hottestHouseItems: [],
    careList: [],
    postDetails: {
      images: [],
      title: "",
      district: "",
      city: "",
      price: 0,
      createdAt: 0,
      condition: "",
      description: "",
    },
    viewingPostId: null,
  },

  getters: {
    categories({state}) {
      return state.categories;
    },
    loadingCategories({state}) {
      return state.loadingCategories;
    },
    posts({state}) {
      return state.posts;
    },
    postDetails({state}) {
      return state.postDetails;
    },
    electronicItems({state}) {
      return state.electronicItems;
    },
    hottestElectronicItems({state}) {
      return state.hottestElectronicItems;
    },
    hottestHouseItems({state}) {
      return state.hottestHouseItems;
    },
    u({state}) {
      return state.u;
    },
    loadingFlag({state}) {
      return state.loadingFlag;
    },
    messages({state}) {
      return state.messages;
    },
    houseItems({state}) {
      return state.houseItems;
    },
    user({state}) {
      return state.user;
    },
    products({state}) {
      return state.products;
    },
    careList({state}) {
      return state.careList;
    },
    userPosts({state}) {
      return state.userPosts;
    },
    viewingPostId({state}) {
      return state.viewingPostId;
    },
  },
  actions: {
    setUser({state}, data) {
      state.user = {...state.user, ...data};
    },
    setU({state}, u) {
      state.u = {
        displayName: u.name,
        avatar: u.picture,
        createdAt: u.createdAt,
        online: true,
      };
    },
    setJwt({state}, jwt) {
      state.jwt = jwt;
    },
    setViewingPostId({state}, postId) {
      state.viewingPostId = postId;
    },
    addProduct({state}, product) {
      state.products = [...state.products, product];
    },
    addCareItem({state}, careItem) {
      state.careList = [...state.careList, careItem];
    },
    async fetchPosts({state}, {category}) {
      state.posts = await getPostsByCategory(category);
    },
    async fetchElectronicItems({state}) {
      state.loadingFlag = true;
      state.electronicItems = await getPostsByCategory(0);
      state.loadingFlag = false;
    },
    async fetchHouseItems({state}) {
      state.loadingFlag = true;
      state.houseItems = await getPostsByCategory(1);
      state.loadingFlag = false;
    },
    async fetchHottestElectronicItems({state}) {
      state.loadingFlag = true;
      while (!state.jwt) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      state.hottestElectronicItems = await getHottestPosts(0);
      state.loadingFlag = false;
    },
    async fetchHottestHouseItems({state}) {
      state.loadingFlag = true;
      while (!state.jwt) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      state.hottestHouseItems = await getHottestPosts(1);
      state.loadingFlag = false;
    },
    async fetchPostDetail({state}, {id}) {
      state.loadingFlag = true;
      state.postDetails = await getPostDetails(id);
      state.loadingFlag = false;
    },
    async createPost({state}, {data}) {
      const response = await createPost(data);
      console.log("here", response);
    },
    async login({dispatch}) {
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
    async fetchMessages({state}) {
      state.loadingFlag = true;
      state.messages = await getMessages();
      state.loadingFlag = false;
    },
    async fetchCareList({state}) {
      state.loadingFlag = true;
      state.careList = await getCareList();
      state.loadingFlag = false;
    },
    async fetchUserPosts({state}) {
      state.loadingFlag = true;
      state.userPosts = await getUserPosts();
      state.loadingFlag = false;
    },
    async closePost({state, postId}) {
      const list = await closePost(postId);
    },
    async repostPost({state, postId}) {
      const list = await repostPost(postId);
    },
  },
});

export default store;
