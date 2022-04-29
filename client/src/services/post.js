import {request, requestFormData} from "./auth";

export const getPostsByCategory = async (category) => {
  try {
    const url = "api/posts/by-category/" + category;
    const response = await (await request("GET", url)).json();
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    return [];
  }
};

export const getPostDetails = async (id) => {
  try {
    const url = "api/posts/" + id;
    const response = await (await request("GET", url)).json();
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    return [];
  }
};

export const createPost = async (data) => {
  try {
    const url = "api/posts/";
    const response = await (await requestFormData("POST", url, data)).json();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error creating post. Details: ", error);
    return false;
  }
};
