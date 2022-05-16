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
    messages: [],
    loadingFlag: true,
    u: null,
    fakeUser: getFakeUsers(),
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
    fakeUser({state}) {
      return state.fakeUser;
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
    setU({state}, u) {
      state.u = {
        zaloId: u.zaloId,
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
    async fetchHottestItems({state}) {
      state.loadingFlag = true;
      while (!state.jwt) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      state.hottestElectronicItems = await getHottestPosts(0);
      state.hottestHouseItems = await getHottestPosts(1);
      state.loadingFlag = false;
    },
    async fetchPostDetail({state}, {id}) {
      state.loadingFlag = true;
      state.postDetails = await getPostDetails(id);
      state.loadingFlag = false;
    },
    async createPost({_state}, {data}) {
      const response = await createPost(data);
      console.log("here", response);
    },
    async login({dispatch}) {
      const cachedUser = await loadUserFromCache();
      if (cachedUser) {
        dispatch("setU", cachedUser);
      }
      const token = await getAccessToken();
      const success = await login(token);
      if (success) {
        const user = await getCurrentUser();
        if (user) {
          dispatch("setU", user);
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
    async closePost({_state}, postId) {
      const errorCode = await closePost(postId);
      if (errorCode === 0) {
        store.dispatch('fetchUserPosts')
      }
    },
    async repostPost({_state}, postId) {
      const errorCode = await repostPost(postId);
      if (errorCode === 0) {
        store.dispatch('fetchUserPosts')
      }
    },
  },
});

export default store;
