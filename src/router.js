import Homepage from '../src/pages/Homepage.vue';
import Movie from '../src/pages/Movie.vue';

export const routes = [
    {
        path: '/', 
        component: Homepage
    },
    {
        path: '/movies/:id', 
        name: 'movie',
        component: Movie
    }
]