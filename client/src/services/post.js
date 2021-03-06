import { request } from "./auth";
import store from "../store";
import {now} from "../util/number";

export const getPostsByCategory = async (category) => {
  try {
    const url = "api/posts/by-category/" + category;
    const response = await (await request("GET", url)).json();
    await store.dispatch("setLastFetchPosts", now());
    return response.data;
  } catch (error) {
    console.log("Error fetching posts by category:", error);
    return [];
  }
};

export const getHottestPosts = async () => {
  try {
    const url = "api/posts/hottest-posts";
    await store.dispatch("setLastFetchHottestPosts", now());
    return await (await request("GET", url)).json();
  } catch (error) {
    console.log("Error fetching hottest posts:", error);
    return [];
  }
};

export const getFilteredPosts = async (condition) => {
  try {
    condition = JSON.parse(condition);
    let query = "?";
    Object.keys(condition).forEach(key => {
      const value = condition[key];
      query += key + "=" + value + "&";
    });
    console.log("Query:" + query);
    const url = "api/posts/search" + query;
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error search posts:", error);
    return [];
  }
};

export const getUserPosts = async () => {
  try {
    const url = "api/posts/";
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching user posts:", error);
    return [];
  }
};

export const closePost = async (postId) => {
  try {
    const url = "api/posts/close-post/" + postId;
    const response = await (await request("PUT", url)).json();
    return response.error;
  } catch (error) {
    console.log("Error close post:", error);
    return [];
  }
};

export const repostPost = async (postId) => {
  try {
    const url = "api/posts/repost/" + postId;
    const response = await (await request("PUT", url)).json();
    return response.error;
  } catch (error) {
    console.log("Error repost post:", error);
    return [];
  }
};
export const getPostDetails = async (id) => {
  try {
    const url = "api/posts/" + id;
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error getting post detail:", error);
    return [];
  }
};

export const createPost = async (data) => {
  try {
    const url = "api/posts/";
    const response = await (await request("POST", url, data)).json();
    // await store.dispatch("setViewingPostId", response.data._id);
    return response.data;
  } catch (error) {
    console.log("Error creating post. Details: ", error);
    return false;
  }
};

export const getSellerInfo = async (zaloId) => {
  try {
    const url = "api/posts/by-user/" + zaloId;
    return await (await request("GET", url)).json();
  } catch (error) {
    console.log("Error fetching seller info:", error);
    return [];
  }
};

export const editPost = async (data) => {
  try {
    const url = "api/posts/" + data._id;
    const response = await (await request("PUT", url, data.data)).json();
    return response.data;
  } catch (error) {
    console.log("Error editing post. Details: ", error);
    return false;
  }
};
