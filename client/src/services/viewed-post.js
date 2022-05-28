import {request} from "./auth";

export const updateViewCount = async (data) => {
  try {
    const url = "api/viewedposts/";
    const response = await (await request("POST", url, {postId: data})).json();
    return response.data;
  } catch (error) {
    console.log("Error update view count. Details: ", error);
    return false;
  }
};