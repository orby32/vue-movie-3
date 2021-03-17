import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    favorites: state.favorites,
  }),
});

export default new Vuex.Store({
  state: {
    key: "d1a4edd7c25b0afc72e1f8debe620e61",
    activeMovieId: "",
    popularMovies: "",
    hero: "",
    searchTerm: "",
    categoryFetchedTitle: "popular",
    favorites: [],
    personData: "",
    movieData: "",
    specificMovieHero: "",
    specificMovieDetails: "",
    specificMovieCast: "",
    searchResults: [],
    recommendations: "",
  },
  mutations: {
    SET_POPULAR(state, payload) {
      state.popularMovies = payload;
    },
    SET_HERO(state, payload) {
      state.hero = payload;
    },
    SET_RECOMMENDATIONS(state, payload) {
      state.recommendations = payload;
    },
    SET_MOVIE_DETAILS(state, payload) {
      state.specificMovieDetails = payload;
    },
    SET_MOVIE_PAGE_HERO(state, payload) {
      state.specificMovieHero = payload;
    },
    UPDATE_SEARCH_TERM(state, payload) {
      state.searchTerm = payload;
    },
    SET_MOVIE_CAST(state, payload) {
      state.specificMovieCast = payload;
    },
    SET_PERSON_DATA(state, payload) {
      state.personData = payload;
    },
    SET_SEARCH_RESULTS(state, payload) {
      state.searchResults = payload;
    },
    CHANGE_FETCHED_CATEGORY(state, payload) {
      state.categoryFetchedTitle = payload;
    },
    ADD_AS_FAVORITE(state, movie) {
      let index = state.favorites.indexOf(movie);
      if (state.favorites.find((el) => el.id === movie.id) !== undefined) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movie);
      }
    },
    DELETE_FROM_FAVORITES(state, movie) {
      let index = state.favorites.indexOf(movie);
      state.favorites.splice(index, 1);
    },
    RESET_FAVORITES(state) {
      state.favorites = [];
    },
  },
  actions: {
    fetchData({ commit }) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.state.categoryFetchedTitle}?api_key=${this.state.key}&language=en`
        )
        .then((res) => {
          // Set movies / commit mutation
          const movies = res.data.results.filter(
            (el) => el.poster_path !== null
          );
          commit("SET_POPULAR", movies);

          // Set hero details
          // destructuring the api object to what is needed for heroImage
          const { title, overview, backdrop_path, id } = res.data.results[0];
          // create a new object
          const heroObject = { title, overview, backdrop_path, id };
          // commit mutation with new object
          commit("SET_HERO", heroObject);
        })
        .catch((error) => console.log(error));
    },
    fetchMovie({ commit }, movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.state.key}`
        )
        .then((res) => {
          // Prepare the data for heroObject(HeroImage)
          const { title, overview, backdrop_path } = res.data;
          const heroObject = { title, overview, backdrop_path };
          commit("SET_MOVIE_PAGE_HERO", heroObject);

          // Prepare the data for movie details
          const {
            genres,
            release_date,
            runtime,
            budget,
            revenue,
            vote_average,
          } = res.data;
          const detailsObject = {
            genres,
            release_date,
            runtime,
            budget,
            revenue,
            vote_average,
          };
          this.state.activeMovieId = movieId;
          commit("SET_MOVIE_DETAILS", detailsObject);
        });
    },
    fetchMovieCast({ commit }, movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.state.key}`
        )
        .then((res) => {
          let sizeOfShown = 10;
          const castList = res.data.cast
            .slice(0, sizeOfShown)
            .filter((item) => item.profile_path !== null);
          commit("SET_MOVIE_CAST", castList);
        });
    },
    fetchPersonData({ commit }, personId) {
      axios
        .get(
          `https://api.themoviedb.org/3/person/${personId}?api_key=${this.state.key}&language=en-US`
        )
        .then((res) => {
          commit("SET_PERSON_DATA", res.data);
        });
    },
    fetchSearchResults({ commit }, URI) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=d1a4edd7c25b0afc72e1f8debe620e61&language=en-US&page=1+2&include_adult=false&query=${URI}`
        )
        .then((res) => {
          const searchResults = res.data.results.filter(
            (el) => el.backdrop_path !== null && el.poster_path !== null
          );
          commit("SET_SEARCH_RESULTS", searchResults);
        })
        .catch((e) => alert(e));
    },
    fetchRecommendations({ commit }, movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${this.state.key}&language=en-US&page=1`
        )
        .then((res) => {
          let sizeOfMovies = 5;
          const recommendations = res.data.results.slice(0, sizeOfMovies);
          commit("SET_RECOMMENDATIONS", recommendations);
        });
    },
    addToFavs({ commit }, movie) {
      commit("ADD_AS_FAVORITE", movie);
    },
    deleteFromFavs({ commit }, movie) {
      commit("DELETE_FROM_FAVORITES", movie);
    },
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
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getHeroByMovieId(state) {
      return state.specificMovieHero;
    },
    getMovieDetailsById(state) {
      return state.specificMovieDetails;
    },
    getMovieCastById(state) {
      return state.specificMovieCast;
    },
    getRecommendations(state) {
      return state.recommendations;
    },
    getActiveMovie(state) {
      return state.activeMovieId;
    },
  },
  plugins: [vuexLocal.plugin],
});
