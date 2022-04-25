import config from '../config'
import store from '../store'

const base = config.BASE_URL

export const request = async (method, url, data) => {
    const headers = {'Content-Type': 'application/json'}
    const token = store.state.jwt
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(`${base}/${url}`, {
        method: method,
        body: JSON.stringify(data),
        headers
    })
}

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

