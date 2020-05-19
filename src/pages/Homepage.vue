<template>
  <div>
    <HeroImage :movie="getHeroDetails" v-if="getHeroDetails"></HeroImage>
    <SearchField></SearchField>
    <Tabs></Tabs>
    <MainView :movies="searchFilter" v-if="popularMovies"></MainView>
      
  </div>
</template>

<script>
import HeroImage from "../components/HeroImage.vue";
import SearchField from "../components/SearchField.vue";
import Tabs from "@/components/Tabs/Tabs";
import MainView from "../components/MainView.vue";
import { mapGetters } from 'vuex';

export default {
    name: 'homepage',
    components: {
        HeroImage,
        SearchField,
        Tabs,
        MainView
    },
    created() {
      // fetch movies and hero details
    this.$store.dispatch('fetchData');
  },
  computed: {
    ...mapGetters([
      'popularMovies',
      'getHeroDetails'
    ]),
    searchFilter() {
      return this.popularMovies.filter(movie => {
        return movie.title.toLowerCase().match(this.$store.state.searchTerm);
      });
    }
  }
};
</script>
