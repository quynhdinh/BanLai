import {createStore} from "zmp-core/lite";
import {getAccessToken} from "./services/zalo";
import {loadUserFromCache} from "./services/storage";
import {getCurrentUser, login} from "./services/auth";
import {getMessages} from "./services/message";
import {
  closePost,
  createPost,
  getFilteredPosts,
  getHottestPosts,
  getPostDetails,
  getPostsByCategory,
  getSellerInfo,
  getUserPosts,
  getViewedPosts,
  repostPost
} from "./services/post";
import {getCareList, likePost, unlikePost} from "./services/care-list";
import {updateViewCount} from "./services/viewed-post";

const store = createStore({
  state: {
    jwt: null,
    messages: [],
    loadingFlag: true,
    u: null,
    fakeUser: {
      displayName: "Thành viên bán lại",
      avatar: "https://i.imgur.com/aWdfgHg.jpeg",
      online: true,
    },
    posts: [],
    userPosts: [],
    electronicItems: [],
    houseItems: [],
    hottestElectronicItems: [],
    hottestHouseItems: [],
    viewedItems: [],
    careList: [],
    viewingPostsList: [],
    postDetails: {
      images: [],
      title: "",
      district: "",
      city: "",
      price: 0,
      createdAt: 0,
      condition: "",
      description: "",
      isLiked: 0,
      productDetails: "",
    },
    viewingPostId: null,
    sellerInfo: [],
    viewingZaloId: null,
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
    viewedItems({state}) {
      return state.viewedItems;
    },
    viewingPostsList({state}) {
      return state.viewingPostsList;
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
    careList({state}) {
      return state.careList;
    },
    userPosts({state}) {
      return state.userPosts;
    },
    viewingPostId({state}) {
      return state.viewingPostId;
    },
    sellerInfo({state}) {
      return state.sellerInfo;
    },
    viewingZaloId({state}) {
      return state.viewingZaloId;
    },
  },
  actions: {
    setU({state}, u) {
      state.u = {
        zaloId: u.zaloId,
        displayName: u.name,
        avatar: u.picture,
        online: true,
      };
    },
    setJwt({state}, jwt) {
      state.jwt = jwt;
    },
    setViewingPostId({state}, postId) {
      state.viewingPostId = postId;
    },
    setViewingZaloId({state}, _zaloId) {
      state.viewingZaloId = _zaloId;
    },
    async fetchElectronicItems({state}) {
      state.loadingFlag = true;
      state.viewingPostsList = await getPostsByCategory(0);
      state.loadingFlag = false;
    },
    async fetchHouseItems({state}) {
      state.loadingFlag = true;
      state.viewingPostsList = await getPostsByCategory(1);
      state.loadingFlag = false;
    },
    async fetchHottestItems({state}) {
      state.loadingFlag = true;
      while (!state.jwt) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      const response = await getHottestPosts();
      state.hottestElectronicItems = response.data
      state.hottestHouseItems = response.data2
      state.loadingFlag = false;
    },
    async fetchViewedItems({state}) {
      state.loadingFlag = true;
      while (!state.jwt) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      state.viewedItems = await getViewedPosts();
      state.loadingFlag = false;
    },
    async fetchFilteredPosts({state}, {condition}) {
      state.loadingFlag = true;
      state.filteredPosts = await getFilteredPosts(condition);
      state.loadingFlag = false;
    },
    async fetchPostDetail({state}, {id}) {
      state.loadingFlag = true;
      state.postDetails = await getPostDetails(id);
      state.loadingFlag = false;
    },
    async updateViewCount({state}, {postId}) {
      await updateViewCount(postId);
    },
    async createPost({state}, {data}) {
      state.loadingFlag = true;
      await createPost(data);
      state.loadingFlag = false;
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
        store.dispatch("fetchUserPosts");
      }
    },
    async repostPost({_state}, postId) {
      const errorCode = await repostPost(postId);
      if (errorCode === 0) {
        store.dispatch("fetchUserPosts");
      }
    },
    async likePost({_state}, data) {
      await likePost(data);
    },
    async unlikePost({_state}, data) {
      await unlikePost(data);
    },
    async fakeLikeUnlikePostList({state}, data) {
      const processItem = (item) => {
        if (item._id === data.postId) {
          return {
            ...item,
            isLiked: data.isLiked === 1 ? 0 : 1,
          };
        }
        return item;
      };
      state.hottestElectronicItems = state.hottestElectronicItems.map((item) => processItem(item));
      state.hottestHouseItems = state.hottestHouseItems.map((item) => processItem(item));
      state.electronicItems = state.electronicItems.map((item) => processItem(item));
      state.houseItems = state.houseItems.map((item) => processItem(item));
      state.viewedItems = state.viewedItems.map((item) => processItem(item));
      const newPostDetails = state.postDetails;
      newPostDetails.isLiked = data.isLiked === 1 ? 0 : 1;
      state.postDetails = newPostDetails;
      state.careList = state.careList.filter((item) => {
        return item.postDetail._id !== data.postId
      });
    },
    async fetchSellerInfo({state}, zaloId) {
      state.loadingFlag = true;
      state.sellerInfo = await getSellerInfo(zaloId);
      state.loadingFlag = false;
    },
  },
});

export default store;
