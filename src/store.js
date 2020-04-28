import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    key: "d1a4edd7c25b0afc72e1f8debe620e61",
    popularMovies: "",
    hero: "",
    searchTerm: "",
    categoryFetchedTitle: 'popular',
    favorites: []
  },
  mutations: {
    SET_POPULAR(state, payload) {
      state.popularMovies = payload;
    },
    SET_HERO(state, payload) {
      state.hero = payload;
    },
    UPDATE_SEARCH_TERM(state, payload) {
      state.searchTerm = payload;
    },
    CHANGE_FETCHED_CATEGORY(state, payload) {
      state.categoryFetchedTitle = payload;
    },
    ADD_AS_FAVORITE(state, movie) {
      let index = state.favorites.indexOf(movie);
      if(index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(movie);
      }
    }
  },
  actions: {
    fetchMovies({ commit }) {
      axios.get(
        `https://api.themoviedb.org/3/movie/${this.state.categoryFetchedTitle}?api_key=${this.state.key}&language=en`
      )
        .then(res => {
          // Set movies / commit mutation
          commit("SET_POPULAR", res.data.results);

          // Set hero details
          // destructuring the api object to what is needed for heroImage
          const { title, overview, backdrop_path } = res.data.results[0];
          // create a new object
          const heroObject = { title, overview, backdrop_path };
          // commit mutation with new object
          commit("SET_HERO", heroObject);
        })
        .catch(error => console.log(error));
    },
    addToFavs({commit}, movie) { 
      commit("ADD_AS_FAVORITE", movie)
    }
  },
  getters: {
    popularMovies(state) {
      return state.popularMovies;
    },
    getHeroDetails(state) {
      return state.hero;
    },
    getUserFavorites(state) {
      return state.favorites;
    }
  },
  
});
