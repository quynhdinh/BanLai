import { request, requestFormData } from "./auth";
import store from "../store";

export const getPostsByCategory = async (category) => {
  try {
    const url = "api/posts/by-category/" + category;
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching posts by category:", error);
    return [];
  }
};

export const getHottestPosts = async (category) => {
  try {
    const url = "api/posts/hottest-posts/" + category;
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching hottest posts:", error);
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
    console.log("data before request:", data)
    const url = "api/posts/";
    const response = await (await request("POST", url, data)).json();
    await store.dispatch('setViewingPostId', response.data._id );
    return response.data;
  } catch (error) {
    console.log("Error creating post. Details: ", error);
    return false;
  }
};
