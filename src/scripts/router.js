import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Signup from "@/pages/Signup.vue";
import Signin from "@/pages/Signin.vue";
import NotFound from "@/pages/NotFound.vue";
import axios from "axios";
import MemberHome from "@/pages/MemberHome.vue";



const routes = [
    {path: '/', component: Home},
    {path: '/signup', component: Signup},
    {path: '/signin', component: Signin},
    {
        path: '/:nickname',
        component: MemberHome,
        name: 'MemberHome',
        beforeEnter: async (to, from, next) => {
            const { nickname } = to.params;
            try {
                const res = await axios.get(`/api/todos/${nickname}`);
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
            console.log(from.fullPath);
            window.history.pushState({}, '', to.fullPath);
            next();
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router;