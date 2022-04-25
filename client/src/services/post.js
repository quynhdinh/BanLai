import {request} from "./auth";

export const getPostsByCategory = async (category) => {
    try {
        const url = 'api/posts/by-category/' + category
        const response = await (await request('GET', url)).json()
        console.log('response: ', response.data)
        return response.data
    } catch (error) {
        console.log("Error fetching posts:", error)
        return []
    }
}

