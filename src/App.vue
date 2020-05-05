<template>
  <div id="app">
    <Header></Header>
    <transition name="fade">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";


export default {
  name: "app",
  components: {
    Header
  },
};
</script>

<style lang="scss">
@import "@/sass/_reset.scss";

.fade-enter-active {
  transition: opacity 1.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
