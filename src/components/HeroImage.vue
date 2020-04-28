<template>
  <div
    class="hero-image"
    :style="{
<<<<<<< HEAD
      backgroundImage: `url(http://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
=======
      backgroundImage: `url(http://image.tmdb.org/t/p/w500/${movie.backdrop_path})`
>>>>>>> cc6594a9ce1c3037368640665e73f7b590a6f895
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
