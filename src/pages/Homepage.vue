<template>
    <div>
        <HeroImage :movie="heroDetails" v-if="heroDetails"></HeroImage>
        <SearchField></SearchField>
        <Tabs></Tabs>
        <MainView :movies="searchFilter" v-if="popularMovies"></MainView>
    </div>
</template>

<script>
import HeroImage from '../components/HeroImage.vue';
import SearchField from '../components/SearchField.vue';
import Tabs from '@/components/Tabs/Tabs';
import MainView from '../components/MainView.vue';

export default {
    name: 'homepage',
    components: {
        HeroImage,
        SearchField,
        Tabs,
        MainView
    },
    created() {
    this.$store.dispatch('fetchMovies');
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