import {request} from "./auth";

export const getMessagesByType = async (type) => {
  try {
    const response = await (await request('GET', 'api/messages/' + type)).json()
    return response.data
  } catch (error) {
    console.log('Error fetching products. Details: ', error)
    return []
  }
}