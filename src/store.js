import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    favorites: state.favorites
  })
})

export default new Vuex.Store({
  state: {
    key: "d1a4edd7c25b0afc72e1f8debe620e61",
    popularMovies: "",
    hero: "",
    searchTerm: "",
    categoryFetchedTitle: 'popular',
    favorites: [],
    personData: ""
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
    SET_PERSON_DATA(state, payload) {
      state.personData = payload
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
    },
    DELETE_FROM_FAVORITES(state, movie) {
      let index = state.favorites.indexOf(movie)
      state.favorites.splice(index, 1);
    },
    RESET_FAVORITES(state) {
      state.favorites = [];
    }
  },
  actions: {
    fetchData({ commit }) {
      axios.get(
        `https://api.themoviedb.org/3/movie/${this.state.categoryFetchedTitle}?api_key=${this.state.key}&language=en`
      )
        .then(res => {
          // Set movies / commit mutation
          commit("SET_POPULAR", res.data.results);

          // Set hero details
          // destructuring the api object to what is needed for heroImage
          const { title, overview, backdrop_path, id } = res.data.results[0];
          // create a new object
          const heroObject = { title, overview, backdrop_path, id };
          // commit mutation with new object
          commit("SET_HERO", heroObject);
        })
        .catch(error => console.log(error));
    },
    fetchPersonData({commit}, personId) {
      axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${this.state.key}&language=en-US`)
      .then(res => {
        console.log(res.data)
        commit("SET_PERSON_DATA", res.data);
      })
    },

    addToFavs({commit}, movie) { 
      commit("ADD_AS_FAVORITE", movie)
    },
    deleteFromFavs({commit}, movie) {
      commit('DELETE_FROM_FAVORITES', movie);
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
    },
    getPersonData(state) {
      return state.personData;
    }
  },
  plugins: [vuexLocal.plugin]
});
