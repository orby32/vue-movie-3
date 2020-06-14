<template>
  <div>
    <div class="person-data" v-if="personData">
      <div>
        <h1>{{ personData.name }}</h1>
        <p v-if="personData">{{ personData.birthday | date }}</p>
        <p>{{ personData.biography }}</p>
        <keep-alive>
          <a @click="$router.go(-1)">Back to all cast</a>
        </keep-alive>
      </div>
      <img
        v-if="personData.profile_path !== null"
        :src="`http://image.tmdb.org/t/p/w500/${personData.profile_path}`"
        :alt="`${personData.name} profile`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'person',
  computed: {
    personData() {
      return this.$store.getters.getPersonData;
    },
  },
  created() {
    this.$store.dispatch("fetchPersonData", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.person-data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 40px;

  img {
    max-height: 500px;
  }
}
</style>
