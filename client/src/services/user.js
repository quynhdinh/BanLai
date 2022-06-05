import {request} from "./auth";

export const getUserStats = async (zaloId) => {
  try {
    const url = "users/stats/" + zaloId;
    const response = await (await request("GET", url)).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching user stats:", error);
    return [];
  }
};
