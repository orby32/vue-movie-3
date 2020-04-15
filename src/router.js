// import Homepage from '../src/pages/Homepage.vue';
// import Movie from '../src/pages/Movie.vue';

export const routes = [
    {
        path: '/', 
        component: () => import('../src/pages/Homepage.vue')
    },
    {
        path: '/movies/:id', 
        name: 'movie',
        component: () => import('../src/pages/Movie.vue')
    }
]