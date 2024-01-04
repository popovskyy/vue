import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import Song from '@/views/Song.vue';
import useUserStore from '@/stores/user';
import MyAccount from '@/views/MyAccount.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'about',
        path: '/about',
        component: About,
    },
    {
        name: 'manage',
        path: '/manage',
        component: Manage,
        meta: {
            requiresAuth: 1
        }
    },
    {
        name: 'my_account',
        path: '/my-account',
        component: MyAccount,
        meta: {
            requiresAuth: 1
        }
    },
    {
        name: 'song',
        path: '/song/:id',
        component: Song
    },
    {
        path: '/:catchAll(.*)*', // Route for 404 page or to home page
        redirect: { name: 'home' }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkExactActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next();

        return;
    }

    const store = useUserStore();

    if (store.userLoggedIn) {
        next();
    } else {
        next({ name: 'home' });
    }
});

export default router;
