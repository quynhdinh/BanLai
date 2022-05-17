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

export const createMessage = async (data) => {
  try {
    const response = await (await request('POST', 'api/messages/', {
      partner: data.partner,
      type: data.type,
      postId: data.postId
    })).json()
    return response.data
  } catch (error) {
    console.log('Error creating message. Details: ', error)
    return []
  }
}