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

export const getUserPosts = async () => {
    try {
        const url = 'api/posts/'
        const response = await (await request('GET', url)).json()
        return response.data
    } catch (error) {
        console.log("Error fetching posts:", error)
        return []
    }
}

export const closePost = async (postId) => {
    try {
        const url = 'api/posts/close-post/' + postId
        const response = await (await request('PUT', url)).json()
        return response.data
    } catch (error) {
        console.log("Error fetching posts:", error)
        return []
    }
}


export const repostPost = async (postId) => {
    try {
        const url = 'api/posts/repost/' + postId
        const response = await (await request('PUT', url)).json()
        return response.data
    } catch (error) {
        console.log("Error fetching posts:", error)
        return []
    }
}
