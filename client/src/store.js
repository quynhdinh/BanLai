
import { createStore } from 'zmp-core/lite';
const store = createStore({
  state: {
    loadingCategories: false,
    categories: [[1, 'Technology'],[2, 'Technology'],[3, 'Technology'],[4, 'Technology'],[5, 'Technology']],
    user: {
      displayName: 'Trần Anh Kiệt',
      email: 'takiet@apcs.vn',
      avatar: 'TAK',
      // online: true,
      // story: true
    }
  },
  getters: {
    categories({ state }) {
      return state.categories
    },
    loadingCategories({ state }) {
      return state.loadingCategories
    },
    user({ state }) {
      return state.user
    },
    products({ state }) {
      return state.products;
    }
  },
  actions: {
    setUser({ state }, data) {
      state.user = { ...state.user, ...data }
    },
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
    async login({ dispatch }) {
      const cachedUser = await loadUserFromCache()
      if (cachedUser) {
        dispatch('setUser', cachedUser)
      }
      const token = await getAccessToken()
      const success = await login(token)
      if (success) {
        const user = await getCurrentUser()
        if (user) {
          dispatch('setUser', user)
        }
      }
    }
  },
})

export default store;
