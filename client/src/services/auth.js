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

export const login = async (accessToken) => {
  try {
    const response = await (await request('POST', 'users/login', {
      accessToken
    })).json()
    if (response.data.jwt) {
      store.dispatch('setJwt', response.data.jwt)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('Error logging in. Details: ', error)
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await (await request('GET', 'users/logged-in')).json()
    store.dispatch('setU', response.data)
    return response.data
  } catch (error) {
    console.log('Error get current user info. Details: ', error)
    return null
  }
}
