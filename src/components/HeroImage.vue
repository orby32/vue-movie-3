<template>
  <div
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
      required: true,
    },
  },
};
</script>

<style lang="scss">
.hero-image {
  background-size: 100%, cover;
  background-position: 50%, 50%;
  width: 100%;
  height: 70vh;
  position: relative;

  &__text {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    h1 {
      font-size: 48px;

      font-weight: normal;
    }
    p {
      max-width: 500px;
      font-size: 22px;
    }
  }
}
</style>
