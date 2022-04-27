import {request} from "./auth";

export const getCareList = async () => {
  try {
    const response = await (await request('GET', 'api/carelist/')).json()
    return response.data
  } catch (error) {
    console.log('Error fetching products. Details: ', error)
    return []
  }
}