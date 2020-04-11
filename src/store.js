import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    key: "d1a4edd7c25b0afc72e1f8debe620e61",
    popularMovies: "",
    hero: "",
    searchTerm: ""
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
    }
  },
  actions: {
    getPopularMovies({ commit }) {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.key}&language=en`
      )
        .then(res => res.json())
        .then(json => {
          commit("SET_POPULAR", json.results);
        })
        .then(json => {
          // destructuring the api object to what is needed for heroImage
          const { title, overview, backdrop_path } = json.results[0];
          // create a new object
          const heroObject = { title, overview, backdrop_path };
          // commit mutation with new object
          commit("SET_HERO", heroObject);
        })
        .catch(error => console.log(error));
    },
    getHeroDetails({ commit }) {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.key}&language=en`
      )
        .then(res => res.json())
        .then(json => {
          // destructuring the api object to what is needed for heroImage
          const { title, overview, backdrop_path } = json.results[0];
          // create a new object
          const heroObject = { title, overview, backdrop_path };
          // commit mutation with new object
          commit("SET_HERO", heroObject);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    popularMovies(state) {
      return state.popularMovies;
    },
    getHeroDetails(state) {
      return state.hero;
    }
  }
});
