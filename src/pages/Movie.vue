<template>
  <div>
    <HeroImage :movie="movieHero" v-if="movieHero"></HeroImage>
    <div class="movie-details">
      <ul>
        Genres:
        <span
          v-for="genere in movieDetails.genres"
          :key="genere.id"
          class="genre-item"
          >{{ genere.name }}</span
        >
      </ul>

      <div class="vote-average">
        <span class="vote-average__label">Vote average:</span>
        <meter
          class="vote-average__meter"
          id="popularity"
          :value="movieDetails.vote_average"
          min="0"
          max="10"
        ></meter>
        <span class="vote-average__text">{{ movieDetails.vote_average }}</span>
      </div>
      <p>Budget: {{ movieDetails.budget | money }}</p>
      <p>Revenue: {{ movieDetails.revenue | money }}</p>
      <p>Running time: {{ movieDetails.runtime | hour }}</p>
    </div>

    <ul class="actors-list">
      <Card v-for="person in movieCast" :key="person.cast_id">
        <router-link :to="{ name: 'person', params: { id: person.id } }">
          <img
            :src="`http://image.tmdb.org/t/p/w500/${person.profile_path}`"
            alt=""
            class="actor-card__img"
            loading="lazy"
          />
          <div class="actor-card__meta">
            <p>{{ person.name }}</p>
            <p>{{ person.character }}</p>
          </div>
        </router-link>
      </Card>
    </ul>
  </div>
</template>

<script>
import HeroImage from "@/components/HeroImage.vue";
const Card = () => import("@/components/Card.vue"); // lazy loading component

export default {
  name: "Movie",
  components: {
    HeroImage,
    Card,
  },
  data() {
    return {
      movieId: this.$route.params.id,
    };
  },
  created() {
    this.$store.dispatch("fetchMovie", this.movieId);
    this.$store.dispatch("fetchMovieCast", this.movieId);
  },

  computed: {
    movieHero() {
      return this.$store.getters.getHeroByMovieId;
    },
    movieDetails() {
      return this.$store.getters.getMovieDetailsById;
    },
    movieCast() {
      return this.$store.getters.getMovieCastById;
    },
  },
};
</script>

<style lang="scss">
.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 10px;
  padding: 40px 0;
  width: 100%;
  justify-content: center;

  .actor-card {
    list-style: none;
    &__image {
      width: 250px;
    }
    &__meta {
      padding: 10px;

      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 200px);
  }
}
.movie-details {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  padding: 30px;
  background-color: #dcdcdc;
  color: #4a4a4a;

  p {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
  }

  .genre-item + .genre-item:before {
    content: ", ";
  }

  .vote-average {
    display: flex;
    align-items: center;

    &__meter {
      margin: 0 15px;
    }
  }
}
</style>
