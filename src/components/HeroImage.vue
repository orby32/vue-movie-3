<template>
  <div
    v-if="movie.backdrop_path"
    class="hero-image"
    :style="{
      backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
    }"
  >
    <div class="hero-image__text">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.hero-image {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 70vh;
  position: relative;

  @media (max-width: 769px) {
    background-position: center;
  }

  &__text {
    color: #fff;
    position: absolute;
    top: 0;
    left: 10%;
    
    h1 {
      font-size: 48px;

      font-weight: normal;
    }
    p {
    max-width: 500px;
    font-size: 19px;
    font-weight: 300;
    }
  }
}
</style>
