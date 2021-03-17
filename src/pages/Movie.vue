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
    <a @click="$router.go(-1)" class="header-link">Back to all movies</a>
    <div class="movie-page">
      <ul class="actors-list">
        <Card v-for="person in movieCast" :key="person.cast_id">
          <router-link :to="{ name: 'person', params: { id: person.id } }">
            <img
              :src="`http://image.tmdb.org/t/p/w500/${person.profile_path}`"
              :alt="person.name"
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
      <div class="recommendations">
        <h1 class="recommendations__heading">You may also like</h1>
        <div class="recommendations__items">
          <div v-for="movie in recommendations" :key="movie.id">
            <router-link
              :to="{ name: 'movie', params: { id: movie.id } }"
              target="_blank"
            >
              <img
                :src="`http://image.tmdb.org/t/p/w300/${movie.poster_path}`"
                alt=""
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroImage from "@/components/HeroImage.vue";
const Card = () => import("@/components/Card.vue"); // lazy loading component

export default {
  name: "movie",
  components: {
    HeroImage,
    Card,
  },
  created() {
    this.$store.dispatch("fetchMovie", this.movieId);
    this.$store.dispatch("fetchMovieCast", this.movieId);
    this.$store.dispatch("fetchRecommendations", this.movieId);
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    movieHero() {
      return this.$store.getters.getHeroByMovieId;
    },
    movieDetails() {
      return this.$store.getters.getMovieDetailsById;
    },
    movieCast() {
      return this.$store.getters.getMovieCastById;
    },
    favorites() {
      return this.$store.getters.getUserFavorites;
    },
    recommendations() {
      return this.$store.getters.getRecommendations;
    },
  },
};
</script>

<style lang="scss">
.movie-page {
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  width: 100%;
}
.v-application ul,
.v-application ol {
  padding: 0;
}

.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 257px);
  grid-gap: 10px;
  // justify-content: center;

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
.recommendations {
  margin: 40px 0;

  &__heading {
    margin-bottom: 20px;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    grid-gap: 20px;
  }
}

a.header-link {
  text-decoration: underline;
  text-transform: capitalize;
  cursor: pointer;
  color: #000;
}
</style>
