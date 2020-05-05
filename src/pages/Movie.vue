<template>
  <div>
    <HeroImage :movie="specificMovieHero" v-if="specificMovieHero"></HeroImage>
    <div class="movie-details">
      <ul>
        Genres: 
        <span v-for="genere in specificMovieDetails.genres" :key="genere.id" class="genre-item">{{
          genere.name
        }}</span>
      </ul>
      
      <div class="vote-average">
      <span class="vote-average__label">Vote average:</span>
      <meter class="vote-average__meter" id="popularity" :value="specificMovieDetails.vote_average" min="0" max="10"></meter>
      <span class="vote-average__text">{{specificMovieDetails.vote_average}}</span>

      </div>
      <p>
        Budget: {{ specificMovieDetails.budget | money}}
      </p>
      <p>Revenue: {{ specificMovieDetails.revenue | money}}</p>
      <p>Running time: {{ specificMovieDetails.runtime | hour}}</p>
    </div>

    <ul class="actors-list">
      <Card v-for="person in specificMovieCast" :key="person.cast_id">
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
      </Card>
    </ul>
  </div>
</template>

<script>
 // lazy loading components
import HeroImage from "@/components/HeroImage.vue";
const Card = () => import ('@/components/Card.vue');
import axios from 'axios';

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
    Promise.all(this.urls.map((url) => axios.get(url)))
      .then((res) => {
        // Prepare the data for heroObject(HeroImage)
        const { title, overview, backdrop_path } = res[1].data;
        const heroObject = { title, overview, backdrop_path };
        this.specificMovieHero = heroObject;

        // Prepare the data for movie details
          const { genres, release_date, runtime, budget, revenue, vote_average } = res[1].data;
          const detailsObject = {
          genres,
          release_date,
          runtime,
          budget,
          revenue,
          vote_average
        };
        this.specificMovieDetails = detailsObject;

        /* Prepare the data for list of cast (and filter out those without image)
        For performence reasons, slice the returned array and take only the first 10 - change the size variable for take another amount of items. 
        Show only actors that have an image 
        */
        let size = 10;
        const smallList = res[0].data.cast.slice(0, size);
        this.specificMovieCast = smallList.filter(item => item.profile_path != null);
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 200px);
  }
}
.movie-details {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    align-items: center;
    padding: 30px;
    background-color: #4a4a4a;
    color: #fff;

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
