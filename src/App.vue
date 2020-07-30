<template>
  <v-app dark>
<Header/>
    <v-content>
      <keep-alive :exclude="['movie', 'person']"> 
      <router-view/>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header
  },
  data: () => ({
  }),
};
</script>
