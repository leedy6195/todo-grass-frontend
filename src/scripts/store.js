import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";



const store = createStore({
    state() {
        return {
            isSignedIn : false,
            memberInfo: {
                email: '',
                nickname: ''
            }
        }
    },
    mutations: {
        setSignedIn(state, payload) {
            state.isSignedIn = payload;
        },
        setMemberInfo(state, payload) {
            state.memberInfo = payload;
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})


export default store