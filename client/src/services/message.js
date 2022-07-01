import {request} from "./auth";

export const getMessages = async () => {
  try {
    return await (await request('GET', 'api/messages/')).json()
  } catch (error) {
    console.log('Error fetching products. Details: ', error)
    return []
  }
}

export const createMessage = async (data) => {
  try {
    const response = await (await request('POST', 'api/messages/', data)).json()
    return response.data
  } catch (error) {
    console.log('Error creating message. Details: ', error)
    return []
  }
}