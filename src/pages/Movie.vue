<template>
  <div>
    <HeroImage :movie="specificMovieHero" v-if="specificMovieHero"></HeroImage>
    <div class="movie-details">
      <p>
        Genres:
        <span v-for="genere in specificMovieDetails.genres" :key="genere.id">{{
          genere.name
        }}</span>
      </p>
      <p v-if="specificMovieDetails.budget > 0">
        Budget: {{ specificMovieDetails.budget }}
      </p>
      <p>{{ specificMovieDetails.revenue }}</p>
      <p>Running time: {{ specificMovieDetails.runtime }}</p>
    </div>
    <ul class="actors-list">
      <Card v-for="person in specificMovieCast" :key="person.cast_id">
        <img
          :src="`http://image.tmdb.org/t/p/w1280/${person.profile_path}`"
          alt=""
          class="actor-card__img"
        />
        <div class="actor-card__meta">
          <p>{{ person.name }}</p>
          <p>{{ person.character }}</p>
        </div>
      </Card>
    </ul>
  </div>
</template>

<script>
import HeroImage from "@/components/HeroImage";
import Card from "@/components/Card";

export default {
  name: "Movie",
  components: {
    HeroImage,
    Card,
  },
  data() {
    return {
      specificMovieHero: "",
      specificMovieCast: "",
      specificMovieDetails: "",
      urls: [
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${this.$store.state.key}`,
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.$store.state.key}&language=en-US`,
      ],
    };
  },
  created() {
    // Fetch an array of endpoints and then continue normally
    Promise.all(this.urls.map((url) => fetch(url).then((resp) => resp.json())))
      .then((json) => {
        // Prepare the data for heroObject(HeroImage)
        const { title, overview, backdrop_path } = json[1];
        const heroObject = { title, overview, backdrop_path };
        this.specificMovieHero = heroObject;

        // Prepare the data for movie details
        const { genres, release_date, runtime, budget, revenue } = json[1];
        const detailsObject = {
          genres,
          release_date,
          runtime,
          budget,
          revenue,
        };
        this.specificMovieDetails = detailsObject;

        // Prepare the data for list of cast
        this.specificMovieCast = json[0].cast;
        console.log(json[1]);
      })
      .catch((error) => console.log(error));
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
}
.movie-details {
  display: flex;
  justify-content: space-around;
  padding: 50px 20px;
  background-color: #4a4a4a;
  color: #fff;
}
</style>
