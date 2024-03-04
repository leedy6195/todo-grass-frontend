import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            isSignedIn : false
        }
    },
    mutations: {
        setSignedIn(state, payload) {
            state.isSignedIn = payload.data;
        }
    }
})
export default store