import {createStore} from "zmp-core/lite";
import {getAccessToken} from "./services/zalo";
import {
  loadHottestPostsFromCache,
  loadPostsFromCache,
  loadUserFromCache,
  saveElectronicPostsToCache,
  saveHottestPostsToCache,
  saveHouseItemPostsToCache,
  saveUserToCache,
} from "./services/storage";
import {getCurrentUser, login} from "./services/auth";
import {createMessage, getMessages} from "./services/message";
import {
  closePost,
  createPost,
  editPost,
  getFilteredPosts,
  getHottestPosts,
  getPostDetails,
  getPostsByCategory,
  getSellerInfo,
  getUserPosts,
  repostPost,
} from "./services/post";
import {getCareList, likePost, unlikePost} from "./services/care-list";
import {updateViewCount} from "./services/viewed-post";
import {getUserStats} from "./services/user";
import {isValidCache} from "./util/number";

const store = createStore({
  state: {
    jwt: null,
    messages: [],
    loadingFlag: true,
    isHomeLoading: true,
    isMessageLoading: true,
    lastFetchPosts: 0, // unix time
    lastFetchHottestPosts: 0,
    u: null,
    userPosts: [],
    hottestItems: {
      electric: [],
      house: [],
      viewed: [],
    },
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
    userStats: null,
    viewingZaloId: null,
  },

  getters: {
    postDetails({ state }) {
      return state.postDetails;
    },
    lastFetchPosts({ state }) {
      return state.lastFetchPosts;
    },
    lastFetchHottestPosts({ state }) {
      return state.lastFetchHottestPosts;
    },
    hottestItems({ state }) {
      return state.hottestItems;
    },
    viewedItems({ state }) {
      return state.viewedItems;
    },
    viewingPostsList({ state }) {
      return state.viewingPostsList;
    },
    u({ state }) {
      return state.u;
    },
    loadingFlag({ state }) {
      return state.loadingFlag;
    },
    isHomeLoading({ state }) {
      return state.isHomeLoading;
    },
    isMessageLoading({ state }) {
      return state.isMessageLoading;
    },
    messages({ state }) {
      return state.messages;
    },
    careList({ state }) {
      return state.careList;
    },
    userPosts({ state }) {
      return state.userPosts;
    },
    viewingPostId({ state }) {
      return state.viewingPostId;
    },
    sellerInfo({ state }) {
      return state.sellerInfo;
    },
    userStats({ state }) {
      return state.userStats;
    },
    viewingZaloId({ state }) {
      return state.viewingZaloId;
    },
  },
  actions: {
    async setU({ state }, u) {
      state.u = {
        zaloId: u.zaloId,
        displayName: u.name,
        avatar: u.picture,
        online: true,
      };
      await saveUserToCache(u);
    },
    setLastFetchPosts({ state }, time) {
      state.lastFetchPosts = time;
    },
    setLastFetchHottestPosts({ state }, time) {
      state.lastFetchHottestPosts = time;
    },
    setJwt({ state }, jwt) {
      state.jwt = jwt;
    },
    setViewingPostId({ state }, postId) {
      state.viewingPostId = postId;
    },
    setViewingZaloId({ state }, _zaloId) {
      state.viewingZaloId = _zaloId;
    },
    async fetchAllItems({ state }, category) {
      state.loadingFlag = true;
      let cachedPosts = null;
      if (isValidCache(state.lastFetchPosts)) {
        cachedPosts = await loadPostsFromCache(category);
      }
      if (parseInt(category) === 0) {
        if (cachedPosts) {
          state.viewingPostsList = JSON.parse(cachedPosts);
        } else {
          console.log("fetch electronics");
          const response = await getPostsByCategory(0);
          await saveElectronicPostsToCache(response);
          state.viewingPostsList = response;
        }
      } else {
        if (cachedPosts) {
          state.viewingPostsList = cachedPosts;
        } else {
          console.log("fetch houses");
          const response = await getPostsByCategory(1);
          await saveHouseItemPostsToCache(response);
          state.viewingPostsList = response;
        }
      }
      state.loadingFlag = false;
    },
    async fetchHottestItems({ state }) {
      state.isHomeLoading = true;
      while (!state.jwt) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      let cachedHottestPosts = null;
      if (isValidCache(state.lastFetchHottestPosts)) {
        cachedHottestPosts = await loadHottestPostsFromCache();
        cachedHottestPosts = JSON.parse(cachedHottestPosts["posts"]);
      }
      if (cachedHottestPosts) {
        // console.log("posts " + JSON.stringify(cachedHottestPosts['hottestElectronic']))
        state.hottestItems.electric = cachedHottestPosts["hottestElectronic"];
        state.hottestItems.house = cachedHottestPosts["hottestHouseItems"];
        state.hottestItems.viewed = cachedHottestPosts["viewedItems"];
      } else {
        const response = await getHottestPosts();
        state.hottestItems.electric = response.data;
        state.hottestItems.house = response.data2;
        state.hottestItems.viewed = response.data3;
        await saveHottestPostsToCache(
          response.data,
          response.data2,
          response.data3
        );
      }
      state.isHomeLoading = false;
    },
    async fetchFilteredPosts({ state }, { condition }) {
      state.loadingFlag = true;
      state.filteredPosts = await getFilteredPosts(condition);
      state.viewingPostsList = state.filteredPosts;
      state.loadingFlag = false;
    },
    async fetchPostDetail({ state }, { id }) {
      state.loadingFlag = true;
      state.postDetails = await getPostDetails(id);
      state.loadingFlag = false;
    },
    async updateViewCount({ _state }, { postId }) {
      await updateViewCount(postId);
    },
    async createPost({ state }, { data }) {
      state.loadingFlag = true;
      await createPost(data);
      state.loadingFlag = false;
    },
    async editPost({ state }, { data }) {
      state.loadingFlag = true;
      await editPost(data);
      state.loadingFlag = false;
    },
    async login({ dispatch }) {
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
    async fetchMessages({ state }) {
      state.isMessageLoading = true;
      state.messages = await getMessages();
      state.isMessageLoading = false;
    },
    async createMessageTracking({ state }, data) {
      state.messages = await createMessage(data);
    },
    async fetchCareList({ state }) {
      state.loadingFlag = true;
      state.careList = await getCareList();
      state.loadingFlag = false;
    },
    async fetchUserPosts({ state }) {
      state.loadingFlag = true;
      state.userPosts = await getUserPosts();
      state.loadingFlag = false;
    },
    async closePost({ _state }, postId) {
      const errorCode = await closePost(postId);
      if (errorCode === 0) {
        store.dispatch("fetchUserPosts");
      }
    },
    async repostPost({ _state }, postId) {
      const errorCode = await repostPost(postId);
      if (errorCode === 0) {
        store.dispatch("fetchUserPosts");
      }
    },
    async likePost({ _state }, data) {
      await likePost(data);
    },
    async unlikePost({ _state }, data) {
      await unlikePost(data);
    },
    async fakeLikeUnlikePostList({ state }, data) {
      const processItem = (item) => {
        if (item._id === data.postId) {
          return {
            ...item,
            isLiked: data.isLiked === 1 ? 0 : 1,
          };
        }
        return item;
      };
      state.hottestItems.electric = state.hottestItems.electric.map((item) =>
        processItem(item)
      );
      state.hottestItems.house = state.hottestItems.house.map((item) =>
        processItem(item)
      );
      state.hottestItems.viewed = state.hottestItems.viewed.map((item) =>
        processItem(item)
      );
      state.viewedItems = state.viewedItems.map((item) => processItem(item));
      state.viewingPostsList = state.viewingPostsList.map((item) =>
        processItem(item)
      );
      state.sellerInfo.data = state.sellerInfo.data.map((item) =>
        processItem(item)
      );
      state.postDetail.relatedPosts = state.postDetails.relatedPosts.map(
        (item) => processItem(item)
      );
      const newPostDetails = state.postDetails;
      newPostDetails.isLiked = data.isLiked === 1 ? 0 : 1;
      state.postDetails = newPostDetails;
      state.careList = state.careList.filter((item) => {
        return item.postDetail._id !== data.postId;
      });
    },
    async fetchSellerInfo({ state }, zaloId) {
      state.loadingFlag = true;
      state.sellerInfo = await getSellerInfo(zaloId);
      state.loadingFlag = false;
    },
    async fetchUserStats({ state }, zaloId) {
      state.loadingFlag = true;
      state.userStats = await getUserStats(zaloId);
      state.loadingFlag = false;
    },
  },
});

export default store;
