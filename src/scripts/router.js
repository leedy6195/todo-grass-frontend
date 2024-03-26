import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Signup from "@/pages/Signup.vue";
import Signin from "@/pages/Signin.vue";
import NotFound from "@/pages/NotFound.vue";
import axios from "axios";
import MemberHome from "@/pages/MemberHome.vue";
import Profile from "@/pages/Profile.vue";
import store from "@/scripts/store";



const routes = [
    {path: '/', component: Home, meta: { requiresAuth: false }},
    {path: '/signup', component: Signup, meta: { requiresAuth: false }},
    {path: '/signin', component: Signin, meta: { requiresAuth: false }},
    {path: '/profile', component: Profile, meta: { requiresAuth: true }},
    {
        path: '/:nickname',
        component: MemberHome,
        name: 'MemberHome',
        meta: { requiresAuth: false },
        beforeEnter: async (to, from, next) => {
            const { nickname } = to.params;
            try {
                const res = await axios.get(`/api/todos/nicknames/${nickname}`);
                if (res.data.header.code === 200) {
                    next();
                } else {
                    next({ name: 'NotFound', params: {pathMatch: to.path.split('/').slice(1)}, query: to.query, hash: to.hash });
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
                next(error);
            }
        }
    },
    { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound',
        beforeEnter: (to, from, next) => {
            window.history.pushState({}, '', to.fullPath);
            next();
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.isSignedIn) {
        next('/signin')
    } else {
        next()
    }
})


export default router;