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
    },
    {
        path: '/search',
        name: 'results',
        component: () => import(/* webpackPrefetch: true */ '../src/pages/Results.vue')
    },
    {
        path: '/details/:id',
        name: 'person',
        component: () => import(/* webpackPrefetch: true */ '../src/pages/Person.vue')
    }
]