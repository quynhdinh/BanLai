import { request } from "./auth";

export const getCareList = async () => {
  try {
    const response = await (await request("GET", "api/carelist/")).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching products. Details: ", error);
    return [];
  }
};

export const likePost = async (data) => {
  try {
    const response = await (
      await request("POST", "api/carelist/", data)
    ).json();
    return response.data;
  } catch (error) {
    console.log("Error liking post. Details: ", error);
    return false;
  }
};

export const unlikePost = async (data) => {
  try {
    const url = "api/carelist/" + data.postId;
    const response = await (
      await request("DELETE", url , data)
    ).json();
    return response.data;
  } catch (error) {
    console.log("Error unliking post. Details: ", error);
    return false;
  }
};
