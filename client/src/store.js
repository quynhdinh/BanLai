import {createStore} from 'zmp-core/lite';
import {getAccessToken} from "./services/zalo";
import {loadUserFromCache} from "./services/storage";
import {getCurrentUser, login} from "./services/auth";
import {getFakeUsers, getFakeProducts} from "./services/fake_data";

const store = createStore({
    state: {
        jwt: null,
        loadingCategories: false,
        categories: [[1, 'Technology'], [2, 'Technology'], [3, 'Technology'], [4, 'Technology'], [5, 'Technology']],
        u: null,
        user: getFakeUsers(),
        products: getFakeProducts()
    },
    getters: {
        categories({state}) {
            return state.categories
        },
        loadingCategories({state}) {
            return state.loadingCategories
        },
        u({state}) {
            return state.u
        },
        user({state}) {
            return state.user
        },
        products({state}) {
            return state.products;
        }
    },
    actions: {
        setUser({state}, data) {
            state.user = {...state.user, ...data}
        },
        setU({ state }, u) {
            state.u = {
                displayName: u.name,
                avatar: u.picture,
                createdAt: u.createdAt,
                online: true
            }
        },
        setJwt({ state }, jwt) {
            state.jwt = jwt
        },
        addProduct({state}, product) {
            state.products = [...state.products, product];
        },
        async login({dispatch}) {
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
    addProduct({state}, product) {
        state.products = [...state.products, product];
    },
})

export default store;
