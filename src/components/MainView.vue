<template>
  <div class="main-view-container">
    <div class="page-header"> 
    <h1>{{isMainView ? categoryName : 'Your favorites' | formattedText }}</h1>
    
      <router-link :to="{ name: 'wishlist'}" class="header-link" v-if="isMainView">Your favorites</router-link>
      <a @click="$router.go(-1)" class="header-link" v-else>Back to all movies</a>
    </div>
    <ul class="movies-list">
      <li
        class="movies-list__item"
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
      >
        <router-link :to="{ name: 'movie', params: { id: movie.id } }">
          <img
            :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
            loading="lazy"
          />
        </router-link>
          <button class="delete-movie" @click="deleteMovie(movie)" v-if="isWishlistView">Remove from whishlist</button>
          <button class="add-to-favs" @click="toggleSelect(movie)" v-if="isMainView">
          {{
            favorites.includes(movie)
              ? "Added to favorites!"
              : "Add to favorites" 
          }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  computed: {
    categoryName() {
      return this.$store.state.categoryFetchedTitle;
    },
    favorites() {
      return this.$store.getters.getUserFavorites;
    },
    isMainView() {
      return this.$route.path === '/';
    },
    isWishlistView() {
      return this.$route.path === '/favorites';
    }
  },
  methods: {
    toggleSelect(movie) {
      this.$store.dispatch("addToFavs", movie);
    },
    deleteMovie(movie) {
      this.$store.dispatch('deleteFromFavs', movie);
    }
  }
};
</script>

<style lang="scss">
.main-view-container {
  max-width: 1530px;
  overflow: hidden;
  padding: 0 20px;
  margin: 0 auto;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 34px;
      margin: 15px 0;
      text-transform: capitalize;
    }
    .header-link {
      text-decoration: underline;
      text-transform: capitalize;
      cursor: pointer;
      color: #000;
    }
  }
}
.movies-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  &__item {
    list-style: none;

    img {
      width: 100%;
      height: auto;
      transition: opacity 0.3s;
      backface-visibility: hidden;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.add-to-favs {
  border-radius: 2px;
  border: 1px solid #000;
  background-color: #dcdcdc;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}
</style>
