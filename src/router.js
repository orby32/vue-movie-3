export const routes = [
    {
        path: '/', 
        component: () => import(/* webpackPrefetch: true */ '../src/pages/Homepage.vue')
    },
    {
        path: '/movies/:id', 
        name: 'movie',
        component: () => import(/* webpackPrefetch: true */ '../src/pages/Movie.vue')
    },
    {
        path: '/favorites',
        name: 'wishlist',
        component: () => import(/* webpackPrefetch: true */ '../src/pages/Wishlist.vue')
    }

]