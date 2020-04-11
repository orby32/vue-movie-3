<template>
    <div>
        <HeroImage :movie="heroDetails" v-if="heroDetails"></HeroImage>
        <SearchField></SearchField>
        <MainView :movies="searchFilter" v-if="popularMovies"></MainView>
    </div>
</template>

<script>
import HeroImage from '../components/HeroImage.vue';
import SearchField from '../components/SearchField.vue';
import MainView from '../components/MainView.vue';

export default {
    name: 'homepage',
    components: {
        HeroImage,
        SearchField,
        MainView
    },
    created() {
    this.$store.dispatch('getPopularMovies');
    this.$store.dispatch('getHeroDetails');
  },
    computed: { 
    popularMovies() {
      return this.$store.getters.popularMovies;
    },
    heroDetails() {
      return this.$store.getters.getHeroDetails;
    },
    searchFilter(){
      return this.popularMovies.filter(movie => {
          return movie.title.toLowerCase().match(this.$store.state.searchTerm)
      }) 
      }
  },
}
</script>

<style lang="scss">

</style>