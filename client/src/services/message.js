import {request} from "./auth";

export const getMessages = async () => {
  try {
    const response = await (await request('GET', 'api/messages/')).json()
    return response.data
  } catch (error) {
    console.log('Error fetching products. Details: ', error)
    return []
  }
}