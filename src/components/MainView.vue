<template>
  <div class="main-view-container">
    <h1>{{categoryName | formattedText}}</h1>
    <ul class="movies-list">
      <li
        class="movies-list__item"
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
      >
        <router-link :to="{ name: 'movie', params: { id: movie.id } }">
          <img
            :src="`http://image.tmdb.org/t/p/w1280/${movie.poster_path}`"
            :alt="movie.title"
          />

        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
 
  computed: {
    categoryName() {
      return this.$store.state.categoryFetchedTitle
    }
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.main-view-container {
  max-width: 1530px;
  overflow: hidden;
  margin: 0 auto;

  h1 {
    font-size: 34px;
    margin: 15px 0;
    text-transform: capitalize;
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
</style>
