import {createStore} from 'zmp-core/lite';

const store = createStore({
    state: {
        loadingCategories: false,
        categories: [[1, 'Technology'], [2, 'Technology'], [3, 'Technology'], [4, 'Technology'], [5, 'Technology']],
        user: [
            {
                displayName: 'Trần Anh Kiệt',
                email: 'takiet@apcs.vn',
                online: true,
                story: true,
                avatar: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024',
            },
            {
                displayName: 'Thành Đạt',
                email: 'lttdat18@apcs.vn',
                avatar: 'https://i.pinimg.com/564x/b1/4d/6f/b14d6f0e90786fcc9b86da3d48ecfef1--comic-character-character-profile.jpg',
            },
        ],
        products: [
            {
                id: '1',
                title: 'Apple iPhone 8',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
            },
            {
                id: '2',
                title: 'Apple iPhone 8 Plus',
                description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
            },
            {
                id: '3',
                title: 'Apple iPhone X',
                description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
            },
        ]
    },
    getters: {
        categories({state}) {
            return state.categories
        },
        loadingCategories({state}) {
            return state.loadingCategories
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
        addProduct({state}, product) {
            state.products = [...state.products, product];
        },
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
})

export default store;
